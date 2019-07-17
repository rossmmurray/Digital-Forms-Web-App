import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import NewQuestion from './NewQuestion'
import '@testing-library/jest-dom/extend-expect'
import TestRenderer from 'react-test-renderer'; // ES6
import ReactDOM from 'react-dom'
import ShallowRenderer from 'react-test-renderer/shallow'; // ES6

test('submit question and get notification', async  () => {
    const testQuestion = "This is the test questions";
    const {getByLabelText, getByText, findByText} = render(<NewQuestion/>);
    const input = getByLabelText(/question text/i);

    // enter text
    fireEvent.change(input, {target: {value: testQuestion}});

    // press button
    fireEvent.click(getByText(/add question/i));

    // check value of notification
    const re = new RegExp("Saved .*" + testQuestion, "i");
    const notification =  await findByText(re);
    expect(notification).toHaveTextContent(testQuestion);
});

test("test for render", () => {
    // let container = document.createElement("div");
    // const testRenderer = TestRenderer.create(<NewQuestion />);
    // // console.log(testRenderer.toJSON());
    // ReactDOM.render(<NewQuestion/>, container);
    const renderer = new ShallowRenderer();
    renderer.render(<NewQuestion />);
    const result = renderer.getRenderOutput();
    console.log(result.props);
});

