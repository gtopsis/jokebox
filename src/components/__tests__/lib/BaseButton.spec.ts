import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'
import BaseButton from '../../lib/BaseButton.vue'

describe('BaseButton', () => {
  it('should render with default props', () => {
    render(BaseButton, {
      slots: {
        default: 'Click me',
      },
    })

    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('should emits click event when clicked', async () => {
    const { emitted } = render(BaseButton, {
      slots: {
        default: 'Click me',
      },
    })

    await fireEvent.click(screen.getByText('Click me'))

    expect(emitted()).toHaveProperty('click')
  })

  it('should render with custom colors', () => {
    render(BaseButton, {
      props: {
        colors: {
          background: '#123',
          border: 'blue',
          text: '#123',
        },
      },
      slots: {
        default: 'Click me',
      },
    })
    const button = screen.getByText('Click me')

    expect(button).toHaveStyle({
      backgroundColor: 'rgb(17, 34, 51)',
      borderColor: 'blue',
      color: 'rgb(17, 34, 51)',
    })
  })

  it('should render with custom id', () => {
    render(BaseButton, {
      props: {
        id: 'my-button',
      },
      slots: {
        default: 'Click me',
      },
    })
    const button = screen.getByText('Click me')

    expect(button).toHaveAttribute('id', 'my-button')
  })
})
