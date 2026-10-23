import { useState, type FormEvent } from 'react'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import styles from '@/features/suggest/components/SuggestItemForm/SuggestItemForm.module.css'

type SubmitState = 'idle' | 'loading' | 'success' | 'error'

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

export const SuggestItemForm = () => {
  const { t, i18n } = useTranslation()
  const [submitState, setSubmitState] = useState<SubmitState>('idle')
  const [gameChoice, setGameChoice] = useState<string>(GAME_OPTIONS[0])
  const [gameOther, setGameOther] = useState('')

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitState('loading')

    const form = event.currentTarget
    const data = new FormData(form)
    const game =
      gameChoice === 'other'
        ? String(data.get('gameOther') ?? '').trim()
        : GAME_LABEL[gameChoice as (typeof GAME_OPTIONS)[number]]

    const payload = {
      game,
      itemName: String(data.get('itemName') ?? '').trim(),
      streamer: String(data.get('streamer') ?? '').trim(),
      description: String(data.get('description') ?? '').trim(),
      funFact: String(data.get('funFact') ?? '').trim(),
      sourceUrl: String(data.get('sourceUrl') ?? '').trim(),
      email: String(data.get('email') ?? '').trim(),
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
        setSubmitState('error')
        return
      }

      setSubmitState('success')
      form.reset()
      setGameChoice(GAME_OPTIONS[0])
      setGameOther('')
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
            onChange={(event) => setGameChoice(event.target.value)}
            required
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
              {t('suggest.fields.gameOther')}
            </label>
            <input
              id="suggest-game-other"
              name="gameOther"
              className={styles.input}
              type="text"
              value={gameOther}
              onChange={(event) => setGameOther(event.target.value)}
              required
              maxLength={120}
              autoComplete="off"
            />
          </div>
        ) : null}

        <div className={styles.field}>
          <label className={styles.label} htmlFor="suggest-item-name">
            {t('suggest.fields.itemName')}
          </label>
          <input
            id="suggest-item-name"
            name="itemName"
            className={styles.input}
            type="text"
            required
            maxLength={200}
            autoComplete="off"
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
            className={styles.input}
            type="url"
            inputMode="url"
            placeholder="https://"
            maxLength={500}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="suggest-email">
            {t('suggest.fields.email')}
          </label>
          <span className={styles.hint}>{t('suggest.fields.emailHint')}</span>
          <input
            id="suggest-email"
            name="email"
            className={styles.input}
            type="email"
            autoComplete="email"
            maxLength={254}
          />
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
