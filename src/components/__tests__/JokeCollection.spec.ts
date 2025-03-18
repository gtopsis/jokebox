import type { JokeExtended } from '@/types/joke'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'
import JokeCollection from '../JokeCollection.vue'

describe('JokeCollection', () => {
  const jokes: JokeExtended[] = [
    { id: 1, punchline: 'Punchline 1', setup: 'Setup 1', type: 'general' },
    { id: 2, punchline: 'Punchline 2', setup: 'Setup 2', type: 'general' },
  ]

  it('should render joke items', () => {
    render(JokeCollection, { props: { jokes } })

    expect(screen.getByText(jokes[0].setup)).toBeInTheDocument()
    expect(getComputedStyle(screen.getByText(jokes[0].punchline)).display).toBe(
      'none'
    )
    expect(screen.getByText(jokes[1].setup)).toBeInTheDocument()
    expect(getComputedStyle(screen.getByText(jokes[1].punchline)).display).toBe(
      'none'
    )
  })
})
