import React, {Component} from 'react';
import { MHPaper } from './styling/MHPaper';

class Start extends Component {
    render() {
        return (
            <div>
                <MHPaper>
                <h1>Welcome to the NHS Digital Form Web App!</h1>
                    <h2>Choose an action to perform on the left-hand side panel. </h2>
                    <h2>Log in to see more options.</h2>
                </MHPaper>
            </div>

        )
    }
}

export default Start;
