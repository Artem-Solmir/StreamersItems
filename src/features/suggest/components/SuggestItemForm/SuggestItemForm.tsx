import { useMemo, useState, type FormEvent } from 'react'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import {
  createSuggestFormSchema,
  normalizeSourceUrl,
  validateSuggestFieldSync,
  validateSuggestFormSync,
  type SuggestFormField,
  type SuggestFormValues,
} from '@/features/suggest/suggestFormSchema'
import styles from '@/features/suggest/components/SuggestItemForm/SuggestItemForm.module.css'

type SubmitState = 'idle' | 'loading' | 'success' | 'error'

const GAME_OPTIONS = [
  'cs2',
  'tarkov',
  'rust',
  'dbd',
  'fortnite',
  'other',
] as const

const GAME_LABEL: Record<(typeof GAME_OPTIONS)[number], string> = {
  cs2: 'Counter-Strike 2',
  tarkov: 'Escape from Tarkov',
  rust: 'Rust',
  dbd: 'Dead by Daylight',
  fortnite: 'Fortnite',
  other: 'Other',
}

const INITIAL_VALUES: SuggestFormValues = {
  gameChoice: GAME_OPTIONS[0],
  gameOther: '',
  itemName: '',
  streamer: '',
  description: '',
  funFact: '',
  sourceUrl: '',
  email: '',
}

const mapApiInvalidFields = (
  fields: string[] | undefined,
  translate: (key: string) => string,
): Partial<Record<SuggestFormField, string>> => {
  if (!fields?.length) {
    return {}
  }
  const errors: Partial<Record<SuggestFormField, string>> = {}
  for (const field of fields) {
    if (field in INITIAL_VALUES) {
      errors[field as SuggestFormField] = translate(
        `suggest.validation.${field}`,
      )
    }
  }
  return errors
}

const FieldError = ({
  id,
  message,
}: {
  id: string
  message: string | undefined
}) =>
  message ? (
    <p id={id} className={styles.fieldError} role="alert">
      {message}
    </p>
  ) : null

export const SuggestItemForm = () => {
  const { t, i18n } = useTranslation()
  const [submitState, setSubmitState] = useState<SubmitState>('idle')
  const [values, setValues] = useState<SuggestFormValues>(INITIAL_VALUES)
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<SuggestFormField, string>>
  >({})
  const [website, setWebsite] = useState('')

  const schema = useMemo(
    () =>
      createSuggestFormSchema({
        gameOther: t('suggest.validation.gameOther'),
        itemName: t('suggest.validation.itemName'),
        email: t('suggest.validation.email'),
        sourceUrl: t('suggest.validation.sourceUrl'),
      }),
    [t, i18n.language],
  )

  const runFieldValidation = (
    field: SuggestFormField,
    nextValues: SuggestFormValues,
  ) => {
    const message = validateSuggestFieldSync(schema, field, nextValues)
    setFieldErrors((prev) => {
      const next = { ...prev }
      if (message) {
        next[field] = message
      } else {
        delete next[field]
      }
      return next
    })
  }

  const setFieldValue = <K extends SuggestFormField>(
    field: K,
    value: SuggestFormValues[K],
  ) => {
    const nextValues = { ...values, [field]: value }
    setValues(nextValues)
    runFieldValidation(field, nextValues)
    if (field === 'gameChoice') {
      runFieldValidation('gameOther', nextValues)
    }
  }

  const resolveGame = (formValues: SuggestFormValues): string => {
    if (formValues.gameChoice === 'other') {
      return formValues.gameOther.trim()
    }
    return (
      GAME_LABEL[formValues.gameChoice as (typeof GAME_OPTIONS)[number]] ?? ''
    )
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitState('idle')

    const errors = validateSuggestFormSync(schema, values)
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      return
    }

    setFieldErrors({})
    setSubmitState('loading')

    const game = resolveGame(values)
    const payload = {
      game,
      itemName: values.itemName.trim(),
      streamer: values.streamer.trim(),
      description: values.description.trim(),
      funFact: values.funFact.trim(),
      sourceUrl: normalizeSourceUrl(values.sourceUrl.trim()),
      email: values.email.trim(),
      website: website.trim(),
      locale: i18n.language,
    }

    try {
      const response = await fetch('/api/suggest-item', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        if (response.status === 400) {
          try {
            const body = (await response.json()) as {
              invalidFields?: string[]
            }
            const fromApi = mapApiInvalidFields(body.invalidFields, t)
            if (Object.keys(fromApi).length > 0) {
              setFieldErrors(fromApi)
              setSubmitState('idle')
              return
            }
          } catch {
            /* fall through */
          }
        }
        setSubmitState('error')
        return
      }

      setSubmitState('success')
      setValues(INITIAL_VALUES)
      setWebsite('')
      setFieldErrors({})
    } catch {
      setSubmitState('error')
    }
  }

  const hasVisibleErrors = Object.keys(fieldErrors).length > 0

  return (
    <section className={styles.section} aria-labelledby="suggest-title">
      <header className={styles.header}>
        <h1 id="suggest-title" className={styles.title}>
          {t('suggest.title')}
        </h1>
        <p className={styles.subtitle}>{t('suggest.subtitle')}</p>
      </header>

      <form className={styles.form} onSubmit={onSubmit} noValidate>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="suggest-game">
            {t('suggest.fields.game')}
          </label>
          <select
            id="suggest-game"
            name="gameChoice"
            className={styles.select}
            value={values.gameChoice}
            onChange={(event) => setFieldValue('gameChoice', event.target.value)}
          >
            {GAME_OPTIONS.map((game) => (
              <option key={game} value={game}>
                {t(`suggest.games.${game}`)}
              </option>
            ))}
          </select>
        </div>

        {values.gameChoice === 'other' ? (
          <div className={styles.field}>
            <label className={styles.label} htmlFor="suggest-game-other">
              {t('suggest.fields.gameOther')}{' '}
              <span className={styles.requiredMark}>
                ({t('suggest.requiredMark')})
              </span>
            </label>
            <input
              id="suggest-game-other"
              name="gameOther"
              className={clsx(
                styles.input,
                fieldErrors.gameOther && styles.inputInvalid,
              )}
              type="text"
              value={values.gameOther}
              onChange={(event) =>
                setFieldValue('gameOther', event.target.value)
              }
              maxLength={120}
              autoComplete="off"
              aria-invalid={fieldErrors.gameOther ? true : undefined}
              aria-describedby={
                fieldErrors.gameOther ? 'suggest-game-other-error' : undefined
              }
            />
            <FieldError
              id="suggest-game-other-error"
              message={fieldErrors.gameOther}
            />
          </div>
        ) : null}

        <div className={styles.field}>
          <label className={styles.label} htmlFor="suggest-item-name">
            {t('suggest.fields.itemName')}{' '}
            <span className={styles.requiredMark}>
              ({t('suggest.requiredMark')})
            </span>
          </label>
          <input
            id="suggest-item-name"
            name="itemName"
            className={clsx(
              styles.input,
              fieldErrors.itemName && styles.inputInvalid,
            )}
            type="text"
            value={values.itemName}
            onChange={(event) => setFieldValue('itemName', event.target.value)}
            maxLength={200}
            autoComplete="off"
            aria-invalid={fieldErrors.itemName ? true : undefined}
            aria-describedby={
              fieldErrors.itemName ? 'suggest-item-name-error' : undefined
            }
          />
          <FieldError
            id="suggest-item-name-error"
            message={fieldErrors.itemName}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="suggest-streamer">
            {t('suggest.fields.streamer')}
          </label>
          <span className={styles.hint}>{t('suggest.fields.streamerHint')}</span>
          <input
            id="suggest-streamer"
            name="streamer"
            className={styles.input}
            type="text"
            value={values.streamer}
            onChange={(event) => setFieldValue('streamer', event.target.value)}
            maxLength={120}
            autoComplete="off"
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="suggest-description">
            {t('suggest.fields.description')}
          </label>
          <textarea
            id="suggest-description"
            name="description"
            className={styles.textarea}
            rows={4}
            value={values.description}
            onChange={(event) =>
              setFieldValue('description', event.target.value)
            }
            maxLength={2000}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="suggest-fun-fact">
            {t('suggest.fields.funFact')}
          </label>
          <textarea
            id="suggest-fun-fact"
            name="funFact"
            className={styles.textarea}
            rows={3}
            value={values.funFact}
            onChange={(event) => setFieldValue('funFact', event.target.value)}
            maxLength={2000}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="suggest-source">
            {t('suggest.fields.sourceUrl')}
          </label>
          <input
            id="suggest-source"
            name="sourceUrl"
            className={clsx(
              styles.input,
              fieldErrors.sourceUrl && styles.inputInvalid,
            )}
            type="text"
            inputMode="url"
            placeholder="https://..."
            value={values.sourceUrl}
            onChange={(event) =>
              setFieldValue('sourceUrl', event.target.value)
            }
            maxLength={500}
            aria-invalid={fieldErrors.sourceUrl ? true : undefined}
            aria-describedby={
              fieldErrors.sourceUrl ? 'suggest-source-error' : undefined
            }
          />
          <FieldError id="suggest-source-error" message={fieldErrors.sourceUrl} />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="suggest-email">
            {t('suggest.fields.email')}
          </label>
          <span className={styles.hint}>{t('suggest.fields.emailHint')}</span>
          <input
            id="suggest-email"
            name="email"
            className={clsx(styles.input, fieldErrors.email && styles.inputInvalid)}
            type="email"
            value={values.email}
            onChange={(event) => setFieldValue('email', event.target.value)}
            autoComplete="email"
            maxLength={254}
            aria-invalid={fieldErrors.email ? true : undefined}
            aria-describedby={
              fieldErrors.email ? 'suggest-email-error' : undefined
            }
          />
          <FieldError id="suggest-email-error" message={fieldErrors.email} />
        </div>

        <div className={styles.honeypot} aria-hidden>
          <label htmlFor="suggest-website">Website</label>
          <input
            id="suggest-website"
            name="website"
            type="text"
            value={website}
            onChange={(event) => setWebsite(event.target.value)}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className={styles.actions}>
          <button
            type="submit"
            className={styles.submit}
            disabled={submitState === 'loading'}
          >
            {submitState === 'loading'
              ? t('suggest.submitting')
              : t('suggest.submit')}
          </button>
          {submitState === 'success' ? (
            <p className={clsx(styles.message, styles.messageSuccess)}>
              {t('suggest.success')}
            </p>
          ) : null}
          {hasVisibleErrors ? (
            <p className={clsx(styles.message, styles.messageError)}>
              {t('suggest.validationSummary')}
            </p>
          ) : null}
          {submitState === 'error' ? (
            <p className={clsx(styles.message, styles.messageError)}>
              {t('suggest.error')}
            </p>
          ) : null}
        </div>
      </form>
    </section>
  )
}
