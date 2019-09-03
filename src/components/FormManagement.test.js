import { render, fireEvent, act } from '@testing-library/react'
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { FormManagement } from './FormManagement';


const { getByText, getByLabelText, findByText } = render(<FormManagement />)

test('loads and says title', () => {
    const titleElement = getByText(/form/i)
    expect(titleElement).toHaveTextContent(/form/i)
})

test('Try to add form and save', async () => {

    const addButton = getByLabelText(/add/i)
    fireEvent.click(addButton)
    const formTitle = getByLabelText(/title/i)
    fireEvent.change(formTitle, { target: { value: "Test Form" } })
    const save = getByLabelText(/save form/i)
    act(() => {
        fireEvent.click(save)
    })
    const resultMessage = await findByText(/saved/i)
    expect(resultMessage).toHaveTextContent(/saved/i)
})
