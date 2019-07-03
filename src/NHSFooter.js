import React from 'react';
import './scss/App.scss';

const NHSFooter = () => (
    <div>
        <footer role="contentinfo">
            <div className="nhsuk-footer" id="nhsuk-footer">
                <div className="nhsuk-width-container">
                    <h2 className="nhsuk-u-visually-hidden">Support links</h2>
                    <ul className="nhsuk-footer__list">
                        <li className="nhsuk-footer__list-item"><a className="nhsuk-footer__list-item-link"
                                                                   href="https://www.nhs.uk/Pages/nhs-sites.aspx">NHS
                            sites</a></li>
                        <li className="nhsuk-footer__list-item"><a className="nhsuk-footer__list-item-link"
                                                                   href="https://www.nhs.uk/about-us">About us</a></li>
                        <li className="nhsuk-footer__list-item"><a className="nhsuk-footer__list-item-link"
                                                                   href="https://www.nhs.uk/contact-us/">Contact us</a>
                        </li>
                        <li className="nhsuk-footer__list-item"><a className="nhsuk-footer__list-item-link"
                                                                   href="https://www.nhs.uk/about-us/sitemap/">Sitemap</a>
                        </li>
                        <li className="nhsuk-footer__list-item"><a className="nhsuk-footer__list-item-link"
                                                                   href="https://www.nhs.uk/our-policies/">Our
                            policies</a></li>
                    </ul>

                    <p className="nhsuk-footer__copyright">&copy; Crown copyright</p>
                </div>
            </div>
        </footer>
    </div>


);
export default NHSFooter;
