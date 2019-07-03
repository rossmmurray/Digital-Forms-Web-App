import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
// import TutorialExample from './TutorialExample'


ReactDOM.render(<App/>, document.getElementById('root'));
//
// const routing = (
//     <Router>
//         <div>
//             <ul>
//
//                 <li>
//                     <NavLink activeClassName="active" to="/users">
//                         Users
//                     </NavLink>
//                 </li>
//             </ul>
//             <hr />
//             <Switch>
//                 <Route path="/users" component={App} />
//             </Switch>
//         </div>
//     </Router>
// );
//
// ReactDOM.render(routing, document.getElementById("root"));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
