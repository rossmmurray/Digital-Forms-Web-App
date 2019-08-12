import React, { Component } from 'react';
import NHSHeader from './page/NHSHeader';
import NHSFooter from './page/NHSFooter';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Start from './Start';
import NewQuestion from './components/NewQuestion';
import ShowQuestions from './components/ShowQuestions'
import { Login } from './components/Login'
import { Container } from '@material-ui/core';
import MHHeader from './page/MHHeader'
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import { MHTheme } from './theme/MHTheme'
import { UserManagement } from './components/UserManagement'

// process.on('unhandledRejection', (reason, p) => {
//     console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
//     // application specific logging, throwing an error, or other logic here
//   });

class App extends Component {

    myNewQuestion = (props) => {
        const myProps = {
            question: { questionText: "hello there" }
        }
        return (
            <NewQuestion {...myProps} />
        )
    };

    render() {
        return (
            <Router>
                <CssBaseline />
                <ThemeProvider theme={MHTheme} >
                    <MHHeader />
                    <Container maxWidth="md" >
                        <Route exact path="/" component={Start} />
                        <Route exact path="/admin/newQuestion" component={NewQuestion} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/editQuestions" component={ShowQuestions} />
                        <Route exact path="/admin/userManagement" component={UserManagement} />
                    </Container>
                </ThemeProvider>
            </Router >
        )
    }
}

export default App;
