import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { base_url } from "../connections";
import { getTokenFromLocalStorage, getUserFromLocalStorage } from '../helper/AuthFunctions'


const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2, 2),
        margin: theme.spacing(2, 0)
    },
}));


export const Login = () => {
    const classes = useStyles();

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    const onFailure = (error) => {
        console.error(error);
    };

    const logout = () => {
        console.log('logging out')
        saveToken(null);
        saveUser(null);
    }

    const saveToken = token => {
        localStorage.setItem("jwToken", token);
        const authBool = token ? true : false;
        setIsAuthenticated(authBool)
    };

    const saveUser = user => {
        localStorage.setItem('user', JSON.stringify(user))
        setUser(user)
    }

    const setStateFromLocalStorage = () => {
        const loggedInUser = getUserFromLocalStorage();
        const token = getTokenFromLocalStorage();
        if (loggedInUser && token) {
            saveUser(loggedInUser)
            saveToken(token)
        }
    }

    useEffect(() => {
        // get state from local storage
        setStateFromLocalStorage();
        // eslint-disable-next-line
    }, [])

    const logoutFailure = (message) => {
        console.error(message)
    }

    const responseGoogle = (response) => {
        const googleAccessToken = JSON.stringify({ access_token: response.accessToken })
        const options = {
            method: 'POST',
            body: googleAccessToken,
            mode: 'cors',
            cache: 'default',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };
        fetch(base_url + '/authenticate', options).then(r => {
            const jwToken = r.headers.get('x-auth-token');
            r.json().then(user => {
                if (jwToken) {
                    saveUser(user);
                    saveToken(jwToken);
                }
            }).catch((err) => {
                console.error(err)
                console.error(r)
            });
        })

    }


    const loginButton = <GoogleLogin
        clientId="51463348971-oupg93q2h6n4ig8voa9695sh1r2e6bmj.apps.googleusercontent.com"
        buttonText="Log in"
        onSuccess={responseGoogle}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
    />;

    const logoutButton = <GoogleLogout
        clientId="51463348971-oupg93q2h6n4ig8voa9695sh1r2e6bmj.apps.googleusercontent.com"
        buttonText="Logout"
        onLogoutSuccess={logout}
        onFailure={logoutFailure}
    />;

    const userInfo = user ?
        (<div>
            <img
                src={user.imageUrl}
                alt="new"
            /> <br />
            {user.email} <br />
            {user.givenName} <br />
            {user.familyName} <br />
        </div>) :
        (null)

    const pageContent = !isAuthenticated ?
        (<div>
            <h1>Login</h1>
            <p>Please log in with your google account by following the below link. If you do not have a google account, please make one.</p>
            {loginButton}
        </div>)
        :
        (<div>
            <h1>You are now logged in</h1>
            {userInfo}
            {logoutButton}
            {loginButton}
        </div>);



    return (
        <div>
            <Paper className={classes.root} >

                {pageContent}

            </Paper>
        </div>
    )
}


