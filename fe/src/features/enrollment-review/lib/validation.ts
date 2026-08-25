export type DecisionValidation = {
  valid: boolean
  message?: string
}

export function validateReturnNote(note: string): DecisionValidation {
  if (note.trim().length === 0) {
    return { valid: false, message: 'A note is required when returning a submission.' }
  }

  if (note.length > 500) {
    return { valid: false, message: 'The decision note must be 500 characters or fewer.' }
  }

  return { valid: true }
}
