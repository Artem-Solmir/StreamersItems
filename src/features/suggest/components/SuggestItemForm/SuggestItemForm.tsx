import { useState, type FormEvent } from 'react'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import {
  issuesToFieldErrors,
  validateSuggestForm,
  type SuggestValidationField,
} from '@/features/suggest/validateSuggestForm'
import styles from '@/features/suggest/components/SuggestItemForm/SuggestItemForm.module.css'

type SubmitState = 'idle' | 'loading' | 'success' | 'error' | 'validation'

const GAME_OPTIONS = [
  'cs2',
  'tarkov',
  'rust',
  'dbd',
  'other',
] as const

const GAME_LABEL: Record<(typeof GAME_OPTIONS)[number], string> = {
  cs2: 'Counter-Strike 2',
  tarkov: 'Escape from Tarkov',
  rust: 'Rust',
  dbd: 'Dead by Daylight',
  other: 'Other',
}

const normalizeSourceUrl = (url: string): string => {
  if (url === '') {
    return ''
  }
  if (/^https?:\/\//i.test(url)) {
    return url
  }
  return `https://${url}`
}

const mapApiInvalidFields = (
  fields: string[] | undefined,
  translate: (key: string) => string,
): Partial<Record<SuggestValidationField, string>> => {
  if (!fields?.length) {
    return {}
  }
  const errors: Partial<Record<SuggestValidationField, string>> = {}
  for (const field of fields) {
    if (
      field === 'gameOther' ||
      field === 'itemName' ||
      field === 'email' ||
      field === 'sourceUrl'
    ) {
      errors[field] = translate(`suggest.validation.${field}`)
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
  const [gameChoice, setGameChoice] = useState<string>(GAME_OPTIONS[0])
  const [gameOther, setGameOther] = useState('')
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<SuggestValidationField, string>>
  >({})

  const clearFieldError = (field: SuggestValidationField) => {
    setFieldErrors((prev) => {
      if (!prev[field]) {
        return prev
      }
      const next = { ...prev }
      delete next[field]
      return next
    })
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitState('idle')

    const form = event.currentTarget
    const data = new FormData(form)
    const gameFromSelect = GAME_LABEL[gameChoice as (typeof GAME_OPTIONS)[number]]
    const game =
      gameChoice === 'other'
        ? String(data.get('gameOther') ?? '').trim()
        : (gameFromSelect ?? String(data.get('gameOther') ?? '').trim())

    const itemName = String(data.get('itemName') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const sourceUrl = normalizeSourceUrl(String(data.get('sourceUrl') ?? '').trim())

    const issues = validateSuggestForm({
      gameChoice,
      game,
      itemName,
      email,
      sourceUrl,
    })

    if (issues.length > 0) {
      setFieldErrors(issuesToFieldErrors(issues, t))
      setSubmitState('validation')
      return
    }

    setFieldErrors({})
    setSubmitState('loading')

    const payload = {
      game,
      itemName,
      streamer: String(data.get('streamer') ?? '').trim(),
      description: String(data.get('description') ?? '').trim(),
      funFact: String(data.get('funFact') ?? '').trim(),
      sourceUrl,
      email,
      website: String(data.get('website') ?? '').trim(),
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
              setSubmitState('validation')
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
      form.reset()
      setGameChoice(GAME_OPTIONS[0])
      setGameOther('')
      setFieldErrors({})
    } catch {
      setSubmitState('error')
    }
  }

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
            value={gameChoice}
            onChange={(event) => {
              setGameChoice(event.target.value)
              clearFieldError('gameOther')
            }}
          >
            {GAME_OPTIONS.map((game) => (
              <option key={game} value={game}>
                {t(`suggest.games.${game}`)}
              </option>
            ))}
          </select>
        </div>

        {gameChoice === 'other' ? (
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
              value={gameOther}
              onChange={(event) => {
                setGameOther(event.target.value)
                clearFieldError('gameOther')
              }}
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
            maxLength={200}
            autoComplete="off"
            onChange={() => clearFieldError('itemName')}
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
            maxLength={500}
            onChange={() => clearFieldError('sourceUrl')}
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
            autoComplete="email"
            maxLength={254}
            onChange={() => clearFieldError('email')}
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
          {submitState === 'validation' ? (
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
