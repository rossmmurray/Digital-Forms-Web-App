import React from 'react'
import ShowQuestions from './ShowQuestions'
import '@testing-library/jest-dom/extend-expect'
import { render } from "@testing-library/react";
import { getQuestions } from '../helper/ApiDataFunctions'

// it('renders without crashing', () => {
    // render(<ShowQuestions />);
// });

test('shows at least first question from api', async () => {
    const questions = await getQuestions();
    const firstQuestion = questions[0].questionText;

    const { findAllByText } = render(<ShowQuestions/>);
    const foundElement = await findAllByText(firstQuestion)
    expect(foundElement.length).toBeGreaterThanOrEqual(1);
})

