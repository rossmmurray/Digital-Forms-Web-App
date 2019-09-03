import React from 'react'
import { render } from '@testing-library/react'
import App from './App'
import '@testing-library/jest-dom/extend-expect'
import ShallowRenderer from 'react-test-renderer/shallow';



test('test for render', () => {
    // in your test:
    const renderer = new ShallowRenderer();
    renderer.render(<App />);
    const result = renderer.getRenderOutput();
    // console.log(result.props.children)
    // expect(result.props).toEqual('div');

});
