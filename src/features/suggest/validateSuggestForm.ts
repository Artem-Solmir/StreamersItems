const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export type SuggestValidationField =
  | 'gameOther'
  | 'itemName'
  | 'email'
  | 'sourceUrl'

export type SuggestFormValues = {
  gameChoice: string
  game: string
  itemName: string
  email: string
  sourceUrl: string
}

const isValidUrl = (url: string): boolean => {
  try {
    const parsed = new URL(url)
    return parsed.protocol === 'https:' || parsed.protocol === 'http:'
  } catch {
    return false
  }
}

export const validateSuggestForm = (
  values: SuggestFormValues,
): SuggestValidationField[] => {
  const issues: SuggestValidationField[] = []

  if (values.gameChoice === 'other' && values.game === '') {
    issues.push('gameOther')
  }

  if (values.itemName === '') {
    issues.push('itemName')
  }

  if (values.email !== '' && !EMAIL_RE.test(values.email)) {
    issues.push('email')
  }

  if (values.sourceUrl !== '' && !isValidUrl(values.sourceUrl)) {
    issues.push('sourceUrl')
  }

  return issues
}

export const issuesToFieldErrors = (
  issues: SuggestValidationField[],
  translate: (key: string) => string,
): Partial<Record<SuggestValidationField, string>> => {
  const errors: Partial<Record<SuggestValidationField, string>> = {}
  for (const field of issues) {
    errors[field] = translate(`suggest.validation.${field}`)
  }
  return errors
}
