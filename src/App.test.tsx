import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import App from './App'

afterEach(cleanup)

describe('<App />', () => {
  it('renders the hero heading', () => {
    render(<App />)

    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveTextContent(/issue templates/i)
    expect(heading).toHaveTextContent(/generated in seconds/i)
  })

  it('renders the generator controls', () => {
    render(<App />)

    // The three template types are selectable buttons fed by the shared TYPES list.
    for (const label of ['Bug Report', 'Feature Request', 'Support Request']) {
      expect(screen.getByRole('button', { name: new RegExp(label) })).toBeInTheDocument()
    }
  })
})
