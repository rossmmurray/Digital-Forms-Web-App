// /client/App.js
import React, {Component} from 'react';
import TutorialExample from './TutorialExample'
import NHSHeader from './NHSHeader';
import './scss/App.scss';
import NHSQuestions from './NHSQuestions';
import NHSFooter from './NHSFooter';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Start from './Start';
import NewQuestion from './components/NewQuestion';

class App extends Component {
    render() {
        return (
            <Router>
                <div className="mh_container">
                    <div className="mh_header">
                        <NHSHeader/>
                    </div>
                    <TutorialExample/>
                    <div className="mh_body">
                        <div className="nhsuk-width-container">
                            <Route exact path="/" component={Start}/>

                            {/*<Link to="/what"><h1>Some other link</h1></Link>*/}
                            {/*<Route exact path="/about" component={MHQuestions} />*/}
                            <Route exact path="/questions1" component={NHSQuestions} />
                            <Route exact path="/admin/newQuestion" component={NewQuestion} />
                        </div>
                    </div>
                    <div className="mh_footer">
                        <NHSFooter/>
                    </div>
                    {/*<Route exact path="/what" component={MHQuestions} />*/}
                </div>
            </Router>

        )
    }
}

export default App;
