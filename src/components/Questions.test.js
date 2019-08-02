import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import NewQuestion from './NewQuestion'
import '@testing-library/jest-dom/extend-expect'
import ReactDOM from 'react-dom'
import ShallowRenderer from 'react-test-renderer/shallow'; // ES6
import ShowQuestions from './ShowQuestions'
import '@testing-library/jest-dom/extend-expect'
import { saveQuestionRequestToApi } from '../helper/ApiDataFunctions'
import { deleteAllQuestions } from '../helper/ApiDataFunctions'

/*eslint no-undef: 2*/

const freeTextQuestion = {
    questionText: "Standard qustions text",
    answerType: 'free'
}

test('submit question and get notification', async  () => {
    const testQuestionText = "This is the test questions";
    const {getByLabelText, getByText, findByText} = render(<NewQuestion/>);

    // find the input boxes
    const input = getByLabelText(/question text/i);
    const answerTypeInput = getByLabelText(/answer type/i)
    
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

// test("test for render", () => {
//     // let container = document.createElement("div");
//     // const testRenderer = TestRenderer.create(<NewQuestion />);
//     // // console.error(testRenderer.toJSON());
//     // ReactDOM.render(<NewQuestion/>, container);
//     const renderer = new ShallowRenderer();
//     renderer.render(<NewQuestion />);
// });

// it('renders without crashing', () => {
//     const div = document.createElement('div');
//     ReactDOM.render(<NewQuestion />, div);
// });


// todo: doesn't always work because I think first question not alwalys shown (make desc)
test('shows at least one question from api', async () => {
    let createQuestionResult = '';
    try {
        createQuestionResult = await saveQuestionRequestToApi(freeTextQuestion)
    } catch (err) {
        console.error(createQuestionResult)
        console.error(err)
        throw err
    }
    const { findAllByText } = render(<ShowQuestions/>);
    const foundElement = await findAllByText(freeTextQuestion.questionText).catch(error => {
        console.error(error)
    })
    expect(foundElement.length).toBeGreaterThanOrEqual(1);
});

test('modify existing test text', async () => {
    // create single question
    await saveQuestionRequestToApi(freeTextQuestion)
    const { findAllByLabelText, getByLabelText, getAllByText, findByText } = render(<ShowQuestions/>);

    // click first found edit button
    const foundEditButton = await findAllByLabelText(/edit/i)
    fireEvent.click(foundEditButton[0])

    // find question text and answer type inputs
    const input = getByLabelText(/question text/i);
    const answerTypeInput = getByLabelText(/answer type/i);

    // enter values
    const updatedText = "Updated question Text";
    fireEvent.change(input, {target: {value: updatedText}});
    fireEvent.change(answerTypeInput, {target: {value: 'free'}});

    // press button second (edit) button if there is already a new question button on the screen
    const saveButtons = getAllByText(/save/i)
    const buttonIndex = saveButtons.length -1
    fireEvent.click(saveButtons[buttonIndex]); 

    // todo: also test for answer text change (needs notifications first for update)
    const notification =  await findByText(updatedText);
    expect(notification).toHaveTextContent(updatedText);
});

afterAll(() => {
    // deleteAllQuestions();
});