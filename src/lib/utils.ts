import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { Updater } from '@tanstack/vue-table'
import type { Ref } from 'vue'
import type { AvatarColor } from '@/env.d.ts'

export const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * The valueUpdater function updates a Vue ref object's value.
 * It handles both direct assignments and transformations using a function.
 * If updaterOrValue is a function, it's called with the current ref value, and the result is assigned to ref.value.
 * If it's not a function, it's directly assigned to ref.value.
 * This utility enhances flexibility in updating ref values. While Vue ref can manage reactive state directly,
 * valueUpdater simplifies value updates, improving code readability and maintainability
 * when the new state can be a direct value or a function generating it based on the current one.
 * 
 * @param updaterOrValue 
 * @param ref 
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function valueUpdater<T extends Updater<any>>(updaterOrValue: T, ref: Ref) {
  ref.value = typeof updaterOrValue === 'function'
    ? updaterOrValue(ref.value)
    : updaterOrValue
}

/**
 * Splits an email address at the @ chatracter and returns a combination of the first letters of the split.
 * 
 * @param {string} email 
 * @returns {string}
 */
export function splitEmailAddress(email: string): string {
  const splitted = email.split('@')
  return `${splitted[0][0]}${splitted[1][0]}`
}

/**
 * Splits an array into chunks of a given size
 * 
 * @param {T[]} array 
 * @param {number} size 
 *
 * @returns {T[][]}
 */
export function chunk <T>(array: T[], size: number): T[][] {
  const result = []
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size))
  }
  return result
}

/**
 * Returns a color based on the first letter of the email
 * @Todo: Check for numbers in email address
 * 
 * @param {string} email
 * @returns {AvatarColor}
 */
export function getColorByEmail(email: string): AvatarColor {
  const avatarColors = ['pink', 'peach', 'yellow', 'teal', 'sapphire', 'sky', 'lavender']
  const splittedEmail = email.split('@')
  const firstChar = splittedEmail[0][0]
  const splittedAlphabet = chunk(ALPHABET.split(''), 4)
  const idx = splittedAlphabet.findIndex((arr) => arr.includes(firstChar))
  return avatarColors[idx] as AvatarColor
}
