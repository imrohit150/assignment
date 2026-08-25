import { describe, expect, it } from 'vitest'
import { formatCoverage, formatDateTime, formatLabel } from './formatters'
import { validateReturnNote } from './validation'

describe('formatters', () => {
  it('formats cents as USD while preserving zero and missing values', () => {
    expect(formatCoverage(25_000_000)).toBe('$250,000')
    expect(formatCoverage(0)).toBe('$0')
    expect(formatCoverage(null)).toBe('Not provided')
  })

  it('handles valid, date-only, missing, and invalid dates', () => {
    expect(formatDateTime('2027-01-01')).toBe('Jan 1, 2027')
    expect(formatDateTime(null)).toBe('Not provided')
    expect(formatDateTime('not-a-date')).toBe('Invalid date')
  })

  it('humanizes API labels', () => {
    expect(formatLabel('COVERAGE_MISMATCH')).toBe('Coverage Mismatch')
    expect(formatLabel(null)).toBe('Unspecified')
  })
})

describe('validateReturnNote', () => {
  it('rejects empty and whitespace-only notes', () => {
    expect(validateReturnNote('')).toEqual({
      valid: false,
      message: 'A note is required when returning a submission.',
    })
    expect(validateReturnNote('   ').valid).toBe(false)
  })

  it('accepts notes up to 500 characters and rejects longer notes', () => {
    expect(validateReturnNote('a'.repeat(500)).valid).toBe(true)
    expect(validateReturnNote('a'.repeat(501))).toEqual({
      valid: false,
      message: 'The decision note must be 500 characters or fewer.',
    })
  })
})
