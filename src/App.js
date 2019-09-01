import React, { useState } from 'react';
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
        [theme.breakpoints.up('sm')]: {
            marginLeft: drawerWidth
        },
    },
}))

// Top level of app
const App = () => {
    const classes = useStyles();

    // Method to force the header and drawer to re-render - required for login and form changes
    const [headerRenderTrigger, setHeaderRenderTrigger] = useState(false)
    const reRenderHeader = () => setHeaderRenderTrigger(!headerRenderTrigger)

    // Wrappers to provide props - since <Route /> does not accept props directly
    const AddNewQuestionPage = () => <div><h1>Add New Question</h1><NewQuestion /></div>
    const LoginWithProps = () => <Login reRenderHeader={reRenderHeader} />
    const UserManagementWithProps = () => <UserManagement reRenderHeader={reRenderHeader} />
    const FormManagementWithProps = () => <FormManagement reRenderHeader={reRenderHeader} />


    return (
        <Router>
            <CssBaseline />
            <ThemeProvider theme={MHTheme} >
                <MHHeader headerRenderTrigger={headerRenderTrigger} />
                <Box className={classes.drawerMargin} >
                    <Container maxWidth="md" >
                        <Route exact path="/" component={Start} />
                        <Route exact path="/admin/newQuestion" component={AddNewQuestionPage} />
                        <Route exact path="/login" component={LoginWithProps} />
                        <Route exact path="/editQuestions" component={ShowQuestions} />
                        <Route exact path="/admin/userManagement" component={UserManagementWithProps} />
                        <Route exact path="/admin/manageForms" component={FormManagementWithProps} />
                        <Route exact path="/answers" component={ShowAnswers} />
                        <Route path="/form/:formid" component={UserFormWizard} />
                    </Container>
                </Box>
            </ThemeProvider>
        </Router >
    )
}

export default App;