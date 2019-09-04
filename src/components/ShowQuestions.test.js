import { render, fireEvent, act } from '@testing-library/react'
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import ShowQuestions from './ShowQuestions';


const { getByText, getByLabelText, findAllByLabelText } = render(<ShowQuestions />)

test('loads and says title', () => {
    const titleElement = getByText(/Edit Questions/i)
    expect(titleElement).toHaveTextContent(/edit/i)
})

test('open edit questions part', async () => {
    const editButtons = await findAllByLabelText(/edit/i)
    // act(() => {
    //     fireEvent.click(editButtons[0])
    // })

})