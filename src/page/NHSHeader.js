import React from 'react';
import '../css/App.css';
import { Link } from "react-router-dom";

const NHSHeader = () => (
    <div>
        <header className="nhsuk-header" role="banner">
            <div className="nhsuk-width-container nhsuk-header__container">

                {/* Logo stuff */}
                <div className='nhsuk-header__logo'>
                    <Link to="/" className="nhsuk-header__link nhsuk-header__link--service" aria-label="NHS homepage">
                        <svg className="nhsuk-logo nhsuk-logo--white"
                            role="presentation" focusable="false" viewBox="0 0 40 16">
                            <path fill="#fff" d="M0 0h40v16H0z" />
                            <path fill="#005eb8"
                                d="M3.9 1.5h4.4l2.6 9h.1l1.8-9h3.3l-2.8 13H9l-2.7-9h-.1l-1.8 9H1.1M17.3 1.5h3.6l-1 4.9h4L25 1.5h3.5l-2.7 13h-3.5l1.1-5.6h-4.1l-1.2 5.6h-3.4M37.7 4.4c-.7-.3-1.6-.6-2.9-.6-1.4 0-2.5.2-2.5 1.3 0 1.8 5.1 1.2 5.1 5.1 0 3.6-3.3 4.5-6.4 4.5-1.3 0-2.9-.3-4-.7l.8-2.7c.7.4 2.1.7 3.2.7s2.8-.2 2.8-1.5c0-2.1-5.1-1.3-5.1-5 0-3.4 2.9-4.4 5.8-4.4 1.6 0 3.1.2 4 .6" />
                            <img src="https://assets.nhs.uk/images/nhs-logo.png" alt="Logo" />
                        </svg>
                        <span className="nhsuk-header__service-name">
                            Digital Mental Health Service
                        </span>
                    </Link>
                </div>

            </div>
            <div className="nhsuk-header__content" id="content-header">
                <nav className="nhsuk-header__navigation" id="header-navigation" role="navigation"
                    aria-label="Primary navigation" aria-labelledby="label-navigation">
                    <ul className="nhsuk-header__navigation-list">
                        <li className="nhsuk-header__navigation-item">
                            <Link className="nhsuk-header__navigation-link" to="/admin/newQuestion">
                                Add Question
                            </Link>
                        </li>
                        <Link className="nhsuk-header__navigation-link" to="/editQuestions">
                            Edit Questions
                            </Link>
                        <li className="nhsuk-header__navigation-item">
                            <Link className="nhsuk-header__navigation-link" to="/Login">
                                Login
                            </Link>
                        </li>
                        <li className="nhsuk-header__navigation-item">
                            <Link className="nhsuk-header__navigation-link" to="/Register">
                                Register
                            </Link>
                        </li>
                    </ul>
                </nav>

            </div>

        </header>

    </div>


);
export default NHSHeader;
