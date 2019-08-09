const googleResponse = (response) => {
    const tokenBlob = new Blob([JSON.stringify({ access_token: response.accessToken }, null, 2)], { type: 'application/json' });
    const options = {
        method: 'POST',
        body: tokenBlob,
        mode: 'cors',
        cache: 'default'
    };
    fetch('http://localhost:4000/api/v1/auth/google', options).then(r => {
        const token = r.headers.get('x-auth-token');
        r.json().then(user => { 
            if (token) {
                this.setState({ isAuthenticated: true, user, token })
            }
        });
    })
}