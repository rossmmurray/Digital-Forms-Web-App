// /client/App.js
import React, {Component} from 'react';
// import './css/App.css';
import {Link} from "react-router-dom";

class Start extends Component {
    render() {
        return (
            <div>
                <h1>Fill out the following questionaire</h1>
                <Link to="/questions1" className="nhsuk-button" role="button">Start</Link>
                <Link to="/admin/newQuestion"><h3>Add Question</h3></Link>
            </div>

        )
    }
}

export default Start;
