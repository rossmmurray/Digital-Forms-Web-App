import React from 'react'
import {render, fireEvent, act} from '@testing-library/react'
import NewQuestion from './NewQuestion'
import '@testing-library/jest-dom/extend-expect'
import ShowQuestions from './ShowQuestions'
import '@testing-library/jest-dom/extend-expect'
import { saveQuestionRequestToApi } from '../helper/ApiDataFunctions'
import { deleteAllQuestions } from '../helper/ApiDataFunctions'

/*eslint no-undef: 2*/
// mocking doesn't work here (i think after all is different)
// jest.mock("../helper/APIDataFunctions.js");

const freeTextQuestion = {
    questionText: "Standard qustions text",
    answerType: 'free'
}

test('submit question and get notification', async  () => {
    const testQuestionText = "This is the test questions";
    const {getByLabelText, getByText, findByText} = render(<NewQuestion/>);

    // find the input boxes
    const input = getByLabelText(/question text/i);
    const answerTypeInput = getByLabelText(/type/i)
    
    // enter text
    fireEvent.change(input, {target: {value: testQuestionText}});
    fireEvent.change(answerTypeInput, {target: {value: 'free'}})

    // press button
    fireEvent.click(getByText(/save/i));

    // check value of notification
    const re = new RegExp("Saved .*" + testQuestionText, "i");
    const notification =  await findByText(re);
    expect(notification).not.toHaveTextContent(/fail/i)
    expect(notification).toHaveTextContent(testQuestionText);
    
});



afterAll(() => {
    // deleteAllQuestions();
});