import { expect, test } from 'vitest'
import {
  ALPHABET,
  splitEmailAddress,
  chunk,
  getColorByEmail
} from '@/lib/utils'

test('ALPHABET is correct', async () => {
  expect(ALPHABET.length).eq(36)
})

test('splitEmailAddress() returns the correct result', async () => {
  const email = 'fooberto@testino.tld'
  const result = splitEmailAddress(email)
  expect(result).eq('ft')
})

test('chunk() returns the correct result', async () => {
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const result = chunk(array, 3)
  expect(result).deep.eq([[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]])
})

test('split alphabet into correct chunks', async () => {
  const result = chunk(ALPHABET.split(''), 5)

  expect(result).deep.eq([
    [ 'a', 'b', 'c', 'd', 'e' ],
    [ 'f', 'g', 'h', 'i', 'j' ],
    [ 'k', 'l', 'm', 'n', 'o' ],
    [ 'p', 'q', 'r', 's', 't' ],
    [ 'u', 'v', 'w', 'x', 'y' ],
    [ 'z', '1', '2', '3', '4' ],
    [ '5', '6', '7', '8', '9' ],
    [ '0' ]  
  ])
})

test('getColorByEmail() returns the correct colors', async () => {
  const chunk0email = getColorByEmail('alberto@testino.tld')
  const chunk1email = getColorByEmail('fooberto@testino.tld')
  const chunk2email = getColorByEmail('lolita@testino.tld')
  const chunk3email = getColorByEmail('nonna@testino.tld')
  const chunk4email = getColorByEmail('sara@testino.tld')
  const chunk5email = getColorByEmail('ulysses@testino.tld')
  const chunk6email = getColorByEmail('zeus@testino.tld')
  const chunk7email = getColorByEmail('1zeus@testino.tld')
  const chunk8email = getColorByEmail('0foo@testino.tld')
  
  expect(chunk0email).eq('pink')
  expect(chunk1email).eq('peach')
  expect(chunk2email).eq('yellow')
  expect(chunk3email).eq('yellow')
  expect(chunk4email).eq('teal')
  expect(chunk5email).eq('sapphire')
  expect(chunk6email).eq('sky')
  expect(chunk7email).eq('sky')
  expect(chunk8email).eq('mauve')
})
