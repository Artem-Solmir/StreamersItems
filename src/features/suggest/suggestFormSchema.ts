import * as yup from 'yup'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const normalizeSourceUrl = (url: string): string => {
  const trimmed = url.trim()
  if (trimmed === '') {
    return ''
  }
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed
  }
  return `https://${trimmed}`
}

const isValidSourceUrl = (value: string): boolean => {
  if (value.trim() === '') {
    return true
  }
  try {
    const parsed = new URL(normalizeSourceUrl(value))
    return parsed.protocol === 'https:' || parsed.protocol === 'http:'
  } catch {
    return false
  }
}

export type SuggestFormSchemaMessages = {
  gameOther: string
  itemName: string
  email: string
  sourceUrl: string
}

export type SuggestFormValues = {
  gameChoice: string
  gameOther: string
  itemName: string
  streamer: string
  description: string
  funFact: string
  sourceUrl: string
  email: string
}

export const createSuggestFormSchema = (messages: SuggestFormSchemaMessages) =>
  yup.object({
    gameChoice: yup.string().required(),
    gameOther: yup.string().max(120).when('gameChoice', {
      is: 'other',
      then: (schema) => schema.trim().required(messages.gameOther),
      otherwise: (schema) => schema.optional(),
    }),
    itemName: yup.string().trim().required(messages.itemName).max(200),
    streamer: yup.string().max(120),
    description: yup.string().max(2000),
    funFact: yup.string().max(2000),
    sourceUrl: yup
      .string()
      .max(500)
      .test('sourceUrl', messages.sourceUrl, (value) =>
        isValidSourceUrl(value ?? ''),
      ),
    email: yup
      .string()
      .trim()
      .max(254)
      .test('email', messages.email, (value) => {
        const v = (value ?? '').trim()
        return v === '' || EMAIL_RE.test(v)
      }),
  })

export type SuggestFormField = keyof SuggestFormValues

export type SuggestFormSchema = ReturnType<typeof createSuggestFormSchema>

export const validateSuggestFieldSync = (
  schema: SuggestFormSchema,
  field: SuggestFormField,
  values: SuggestFormValues,
): string | undefined => {
  try {
    schema.validateSyncAt(field, values, { abortEarly: true })
    return undefined
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return error.message
    }
    return undefined
  }
}

export const validateSuggestFormSync = (
  schema: SuggestFormSchema,
  values: SuggestFormValues,
): Partial<Record<SuggestFormField, string>> => {
  try {
    schema.validateSync(values, { abortEarly: false })
    return {}
  } catch (error) {
    if (!(error instanceof yup.ValidationError)) {
      return {}
    }
    const errors: Partial<Record<SuggestFormField, string>> = {}
    for (const inner of error.inner) {
      if (inner.path && !errors[inner.path as SuggestFormField]) {
        errors[inner.path as SuggestFormField] = inner.message
      }
    }
    if (error.path && !errors[error.path as SuggestFormField]) {
      errors[error.path as SuggestFormField] = error.message
    }
    return errors
  }
}
