import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import App from './App'
import '@testing-library/jest-dom/extend-expect'

test('test for render', async  () => {
    const {getByLabelText, getByText, findByText} = render(<App/>);
    const input = getByText(/digital/i);

    //
    // // check value of notification
    // const re = new RegExp("Saved .*" + testQuestion, "i");
    // const notification =  await findByText(re);
    // expect(notification).toHaveTextContent(testQuestion);
});
