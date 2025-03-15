// src/components/__tests__/BaseToggleSwitch.spec.ts
import { fireEvent, render, screen } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'
import BaseToggleSwitch from '../../lib/BaseToggleSwitch.vue'

describe('BaseToggleSwitch', () => {
  it('should render with default props', () => {
    render(BaseToggleSwitch, {
      props: {
        label: 'Toggle me',
      },
    })

    expect(screen.getByText('Toggle me')).toBeInTheDocument()
  })

  it.skip('should toggle checked state when clicked', async () => {
    const { emitted } = render(BaseToggleSwitch, {
      props: {
        label: 'Toggle me',
      },
    })
    const toggleSwitch = screen.getByText('Toggle me')

    await fireEvent.click(toggleSwitch)

    expect(emitted()).toHaveProperty('update:checked')
  })

  it.skip('should render with custom colors', () => {
    render(BaseToggleSwitch, {
      props: {
        label: 'Toggle me',
        checkedColors: {
          background: 'red',
          border: 'blue',
          thumb: 'white',
        },
        uncheckedColors: {
          background: 'green',
          border: 'yellow',
          thumb: 'black',
        },
      },
    })

    const toggleSwitch = screen.getByText('Toggle me')
    const input = toggleSwitch.querySelector('input')
    const thumb = toggleSwitch.querySelector('span')

    expect(input).toHaveStyle({
      backgroundColor: 'green',
      borderColor: 'yellow',
    })
    expect(thumb).toHaveStyle({
      backgroundColor: 'black',
    })

    fireEvent.click(toggleSwitch)

    expect(input).toHaveStyle({
      backgroundColor: 'red',
      borderColor: 'blue',
    })
    expect(thumb).toHaveStyle({
      backgroundColor: 'white',
    })
  })

  it('should render with custom id', () => {
    render(BaseToggleSwitch, {
      props: {
        id: 'my-toggle',
        label: 'Toggle me',
      },
    })

    const input = screen.getByText('Toggle me').querySelector('input')
    expect(input).toHaveAttribute('id', 'my-toggle')
  })
})
