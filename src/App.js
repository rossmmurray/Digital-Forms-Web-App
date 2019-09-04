import React from 'react';
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
import { FormManagement } from './components/FormManagement'
import { UserFormWizard } from './components/UserFormWizard';
import { ShowAnswers } from './components/ShowAnswers';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';


const drawerWidth = 240

const useStyles = makeStyles(theme => ({
    drawerMargin: {
        // marginLeft: drawerWidth,
        [theme.breakpoints.up('sm')]: {
            // width: `calc(100% - ${drawerWidth} px)`,
            marginLeft: drawerWidth
        },
    },
}))

const App = () => {
    const classes = useStyles();

    const myNewQuestion = () => {
        return (
            <div>
                <br />
                <h1>Add New Question</h1>
                <NewQuestion />
            </div>
        )
    };

    return (
        <Router>
            <CssBaseline />
            <ThemeProvider theme={MHTheme} >
                <MHHeader />
                <Box className={classes.drawerMargin} >
                <Container  maxWidth="md" >
                    <Route exact path="/" component={Start} />
                    <Route exact path="/admin/newQuestion" component={myNewQuestion} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/editQuestions" component={ShowQuestions} />
                    <Route exact path="/admin/userManagement" component={UserManagement} />
                    <Route exact path="/admin/manageForms" component={FormManagement} />
                    <Route exact path="/answers" component={ShowAnswers} />
                    <Route path="/form/:formid" component={UserFormWizard} />
                    </Container>
                    </Box>
            </ThemeProvider>
        </Router >
    )
}

export default App;