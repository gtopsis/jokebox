import type { Joke } from '@/types/joke'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'
import JokeCollection from '../JokeCollection.vue'

describe('JokeCollection', () => {
  const jokes: Joke[] = [
    { id: 1, punchline: 'Punchline 1', setup: 'Setup 1', type: 'general' },
    { id: 2, punchline: 'Punchline 2', setup: 'Setup 2', type: 'general' },
  ]

  it('should render joke items', () => {
    render(JokeCollection, { props: { jokes } })

    expect(screen.getByText('Setup 1')).toBeInTheDocument()
    expect(screen.queryByText('Punchline 1')).not.toBeInTheDocument()
    expect(screen.getByText('Setup 2')).toBeInTheDocument()
    expect(screen.queryByText('Punchline 2')).not.toBeInTheDocument()
  })
})
