import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/vue'
import { beforeAll, describe, expect, it } from 'vitest'
import { createRouter, createWebHistory, type Router } from 'vue-router'
import TheTopBar from '../TheTopBar.vue'

import Home from '../../views/HomeView.vue'

describe('TheTopBar', () => {
  let router: Router

  beforeAll(() => {
    router = createRouter({
      history: createWebHistory(),
      routes: [
        { path: '/', name: 'home', component: Home },
        { path: '/favorites', name: 'favorites', component: Home },
      ],
    })
  })

  it('should render correctly', () => {
    render(TheTopBar, {
      global: {
        plugins: [router],
      },
    })

    expect(screen.getByText('New Jokes')).toBeInTheDocument()
    expect(screen.getByText('JokeBox')).toBeInTheDocument()
    expect(screen.getByText('Favorites')).toBeInTheDocument()
  })

  it('should have correct navigation links', async () => {
    render(TheTopBar, {
      global: {
        plugins: [router],
      },
    })
    const links = await screen.findAllByRole('link')

    expect(links.length).toBe(3)
    expect(links[0].getAttribute('href')).toBe('/')
    expect(links[1].getAttribute('href')).toBe('/')
    expect(links[2].getAttribute('href')).toBe('/favorites')
  })

  it('should change current route when a navigation link clicked', async () => {
    const { emitted } = render(TheTopBar, {
      global: {
        plugins: [router],
      },
    })
    const link = await screen.findByRole('link', { name: 'Favorites' })

    await fireEvent.click(link)
    await router.isReady()

    expect(emitted().click).toBeTruthy()
    expect(router.currentRoute.value.path).toBe('/favorites')
  })
})
