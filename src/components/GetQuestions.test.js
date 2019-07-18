import React from 'react'
import GetQuestion from './GetQuestions'
import { testFun1 } from './GetQuestions'
import '@testing-library/jest-dom/extend-expect'
import ReactDOM from 'react-dom'
import {render} from "@testing-library/react";


it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<GetQuestion />, div);
});



