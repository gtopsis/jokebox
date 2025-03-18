import type { JokeExtended } from '@/types/joke'
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'
import JokeCollectionItem from '../JokeCollectionItem.vue'

describe('JokeCollectionItem', () => {
  const joke: JokeExtended = {
    id: 1,
    punchline: 'Punchline',
    setup: 'Setup',
    type: 'general',
    saved: false,
    visiblePunchline: false,
  }

  it('should render joke setup and hides punchline initially', () => {
    render(JokeCollectionItem, {
      props: { joke },
    })

    expect(screen.getByText(joke.setup)).toBeInTheDocument()
    expect(getComputedStyle(screen.getByText(joke.punchline)).display).toBe(
      'none'
    )
  })

  it('should show punchline when reveal button is clicked', async () => {
    const { emitted } = render(JokeCollectionItem, {
      props: { joke },
    })

    const revealButton = screen.getByTitle('Show punchline')
    await fireEvent.click(revealButton)

    expect(emitted()).toHaveProperty('onPunchlineRevealed')
  })

  it('should toggle save button when joke is revealed', async () => {
    render(JokeCollectionItem, {
      props: {
        joke: {
          ...joke,
          visiblePunchline: true,
        },
      },
    })

    const saveButton = screen.getByTitle('Save to Favorites')
    await fireEvent.click(saveButton)

    expect(screen.getByTitle('Save to Favorites')).toBeInTheDocument()
  })
})
