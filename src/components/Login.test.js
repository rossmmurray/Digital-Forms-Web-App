import { render } from '@testing-library/react'
import { Login } from './Login'
import React from 'react'
import '@testing-library/jest-dom/extend-expect'


test('loads and says login', () => {
    const { getByText } = render(<Login />)
    const titleElement = getByText(/login/i)
    expect(titleElement).toHaveTextContent(/login/i)
})