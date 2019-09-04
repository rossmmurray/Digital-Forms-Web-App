import { render, fireEvent, act } from '@testing-library/react'
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import NewQuestion from './NewQuestion';



test('open edit questions part', async () => {
    const { getByText, getByLabelText } = render(<NewQuestion />)
    const editButton = await getByLabelText(/text/i)
    act(() => {
        fireEvent.click(editButton)
    })

})