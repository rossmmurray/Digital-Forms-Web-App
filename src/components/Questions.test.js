import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import NewQuestion from './NewQuestion'
import '@testing-library/jest-dom/extend-expect'
import TestRenderer from 'react-test-renderer'; // ES6
import ReactDOM from 'react-dom'
import ShallowRenderer from 'react-test-renderer/shallow'; // ES6
import ShowQuestions from './ShowQuestions'
import '@testing-library/jest-dom/extend-expect'
import { getQuestions, saveQuestionRequestToApi } from '../helper/ApiDataFunctions'
import selectEvent from 'react-select-event'

/*eslint no-undef: 2*/

const freeTextQuestion = {
    questionText: "Standard qustions text",
    answerType: 'free'
}

test('submit question and get notification', async  () => {
    const testQuestionText = "This is the test questions";
    const {getByLabelText, getByText, findByText, getByTestId} = render(<NewQuestion/>);

    // find the input boxes
    const input = getByLabelText(/question text/i);
    const answerTypeInput = getByLabelText(/answer type/i)
    // const answerTypeInput = getByTestId("select-answer-type")
    
    // expect(answerTypeInput).toHaveFormValues({ food: "" });

    // enter text
    fireEvent.change(input, {target: {value: testQuestionText}});
    // await fireEvent.click(answerTypeInput);
    // await fireEvent.click(await findByText(/free/i))
    fireEvent.change(answerTypeInput, {target: {value: 'free'}})

    // await selectEvent.select(answerTypeInput, /free/i)

    // press button
    fireEvent.click(getByText(/save/i));

    // check value of notification
    const re = new RegExp("Saved .*" + testQuestionText, "i");
    const notification =  await findByText(re);
    expect(notification).not.toHaveTextContent(/fail/i)
    expect(notification).toHaveTextContent(testQuestionText);
    
});

test("test for render", () => {
    // let container = document.createElement("div");
    // const testRenderer = TestRenderer.create(<NewQuestion />);
    // // console.log(testRenderer.toJSON());
    // ReactDOM.render(<NewQuestion/>, container);
    const renderer = new ShallowRenderer();
    renderer.render(<NewQuestion />);
});

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<NewQuestion />, div);
});


// todo: doesn't always work because I think first question not alwalys shown (make desc)
test('shows at least first question from api', async () => {
    let questions = [];
    try {
        await saveQuestionRequestToApi(freeTextQuestion)
        questions = await getQuestions();
        console.log(questions)
    } catch (err) {
        console.log(err.Error)
        throw err
    }
    const firstQuestion = questions[0].questionText;
    const { findAllByText } = render(<ShowQuestions/>);
    const foundElement = await findAllByText(firstQuestion)
    expect(foundElement.length).toBeGreaterThanOrEqual(1);
});

test('modify existing test text', async () => {
    // create single question
    await saveQuestionRequestToApi(freeTextQuestion)
    const { findAllByLabelText, getByLabelText, getAllByText, findByText } = render(<ShowQuestions/>);

    // click first found edit button
    const foundEditButton = await findAllByLabelText(/edit/i)
    fireEvent.click(foundEditButton[0])

    // then find question text input
    const input = getByLabelText(/question text/i);

    // enter text
    const updatedText = "Updated question Text";
    fireEvent.change(input, {target: {value: updatedText}});

    // press button second (edit) button if there is already a new question button on the screen
    const saveButtons = getAllByText(/save/i)
    const buttonIndex = saveButtons.length -1
    fireEvent.click(saveButtons[buttonIndex]); 
    const notification =  await findByText(updatedText);
    expect(notification).toHaveTextContent(updatedText);
});