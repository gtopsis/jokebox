import type { Joke } from '@/types/joke'
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'
import JokeCollectionItem from '../JokeCollectionItem.vue'

describe('JokeCollectionItem', () => {
  const joke: Joke = {
    id: 1,
    punchline: 'Punchline',
    setup: 'Setup',
    type: 'general',
  }

  it('should render with default props', () => {
    render(JokeCollectionItem, { props: { joke } })

    expect(screen.getByText('Show')).toBeInTheDocument()
  })

  it('should render with hidden punchline and save button when visiblePunchline prop equals to false', () => {
    render(JokeCollectionItem, { props: { joke, visiblePunchline: false } })

    expect(screen.queryByText('Punchline')).not.toBeInTheDocument()
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('should render with visible punchline and save button when visiblePunchline prop equals to true', () => {
    render(JokeCollectionItem, { props: { joke, visiblePunchline: true } })

    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-label',
      'Save to Favorites'
    )
  })

  it("should emit 'onSave' event when punchline is visible and save button is clicked", async () => {
    const { emitted } = render(JokeCollectionItem, {
      props: { joke, visiblePunchline: true },
    })

    await fireEvent.click(screen.getByRole('button'))

    expect(emitted()).toHaveProperty('onSave')
  })

  it("should emit 'onPunchlineRevealed' event when punchline is not visible and link is clicked", async () => {
    const { emitted } = render(JokeCollectionItem, {
      props: { joke, visiblePunchline: false, saved: false },
    })

    await fireEvent.click(screen.getByText('Show'))

    expect(emitted()).toHaveProperty('onPunchlineRevealed')
  })
})
