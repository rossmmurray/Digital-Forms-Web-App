import React from 'react'
import GetQuestion from './GetQuestions'
import '@testing-library/jest-dom/extend-expect'
import ReactDOM from 'react-dom'
import {render} from "@testing-library/react";


it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<GetQuestion />, div);
});

test('get success message from api', async  () => {
    const result = await GetQuestion.getQuestionsFromAPI();
    console.log(result.data.success);
    expect(result.data.success).toEqual(true)
});

// todo: finish this
test('get questions array', async  () => {
    const result = await GetQuestion.getQuestions();
    console.log(result.data.success);
    expect(result.isArray).toEqual(true)
});
