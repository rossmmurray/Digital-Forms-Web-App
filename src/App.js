// /client/App.js
import React, {Component} from 'react';
// import TutorialExample from './TutorialExample'
import NHSHeader from './page/NHSHeader';
import './css/App.css';
import NHSFooter from './page/NHSFooter';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Start from './Start';
import NewQuestion from './components/NewQuestion';
import ShowQuestions from './components/ShowQuestions'
import Login from './components/Login'


// process.on('unhandledRejection', (reason, p) => {
//     console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
//     // application specific logging, throwing an error, or other logic here
//   });

class App extends Component {

    myNewQuestion = (props) => {
        const myProps = {
            question: {questionText: "hello there"}
        }
        return (
            <NewQuestion {...myProps}/>
        )
    };

    render() {
        return (
            <Router>
                <div className="mh_container">
                    <div className="mh_header">

                        <NHSHeader/>
                    </div>
                    {/*<TutorialExample/>*/}
                    <div className="mh_body">
                        <div className="nhsuk-width-container">
                            <Route exact path="/" component={Start}/>

                            {/*<Link to="/what"><h1>Some other link</h1></Link>*/}
                            {/*<Route exact path="/about" component={MHQuestions} />*/}
                            <Route exact path="/admin/newQuestion" component={NewQuestion} />
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/editQuestions" component={ShowQuestions} />

                            {/* render={(routeProps) => (
    <MyComponent {...routeProps} {...props} />
  )} */}
                            {/* <Route exact path="/register" component={Register} /> */}
                            {/* <ShowQuestions/> */}
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
