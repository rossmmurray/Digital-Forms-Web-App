import React from 'react';

// TODO: change this to a class based component
class Login extends React.Component {
    render() {
        return (
            <div>
                  <label>
                        <h3>Login</h3>
                        {/*<div>*/}
                            <input
                                className="nhsuk-input"
                                type="text"
                                style={{ width: '400px' }}
                                onChange={(e) => this.setState({ questionText: e.target.value })}
                                placeholder="email"
                            />
                             <input
                                className="nhsuk-input"
                                type="text"
                                style={{ width: '400px' }}
                                onChange={(e) => this.setState({ questionText: e.target.value })}
                                placeholder="password"
                            />
                            <button className="nhsuk-button" onClick={() => this.saveQuestionToDB(this.state.questionText)}>
                                Login
                            </button>
                        {/*</div>*/}

                    </label>
            </div>
        )
    }
}

export default Login;

