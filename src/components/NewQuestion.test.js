import React from 'react'
import {render, fireEvent, getByLabelText} from '@testing-library/react'
import NewQuestion from './NewQuestion'
import '@testing-library/jest-dom/extend-expect'

test('submit question', () => {
    const testQuestion = "This is the test questions";
    const utils = render(<NewQuestion/>);
    const input = utils.getByLabelText(/question text/i);

    fireEvent.change(input, {target: {value: testQuestion}});
    expect(input.value).toBe(testQuestion)

    // input.value = testQuestion;
    // expect(getByLabelText(container, 'Question Text')).toHaveTextContent(testQuestion);
});
