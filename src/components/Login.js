import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import axios from 'axios';
import { base_url } from "../connections";


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
        setIsAuthenticated(false);
        setUser(null);
    }

    const responseGoogle = (response) => {
        // console.log(response);
        // // setIsAuthenticated
        // if (response && response.profileObj) {
        //     setIsAuthenticated(true);
        //     setUser(response.profileObj)
        // } else {
        //     setIsAuthenticated(false)
        // }

        // const backendResponse = await axios.post(base_url + '/authenticate', {access_token: response.accessToken})
        // const backendToken = backendResponse.headers.get('x-auth-token');
        // const user = backendResponse.json();
        // if (backendToken) {
        //     setIsAuthenticated(true)
        //     setUser(user)
        // }
        // response.accessToken = response.accessToken
        const tokenBlob = new Blob([JSON.stringify({ access_token: response.accessToken }, null, 2)], { type: 'application/json' });
        const token2 = JSON.stringify({ access_token: response.accessToken }, null, 2);
        const options = {
            method: 'POST',
            body: JSON.stringify({ access_token: response.accessToken }),
            mode: 'cors',
            cache: 'default',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
        };
        console.log(options)
        fetch(base_url + '/authenticate', options).then(r => {
            const token = r.headers.get('x-auth-token');
            console.log(r);
            console.log(token)
            r.json().then(user => {
                console.log(user)
                if (token) {
                    setIsAuthenticated(true)
                    setUser(user)
                }
            }).catch( (err) => {
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
        </div>);



    return (
        <div>
            <Paper className={classes.root} >

                {pageContent}

            </Paper>
        </div>
    )
}


