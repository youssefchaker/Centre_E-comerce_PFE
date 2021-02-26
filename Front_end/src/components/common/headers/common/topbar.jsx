import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { withTranslate } from 'react-redux-multilingual'

class TopBar extends Component {

    render() {
        const {translate} = this.props;
        return (
            <div className="top-header ">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="header-contact">
                                <ul>
                                    <li>{translate('topbar_title', { theme_name: ' Mall' })}</li>
                                    <li><i className="fa fa-phone" aria-hidden="true"></i>{translate('call_us')}:  +216 95 456 201</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-6 text-right">
                            <ul className="header-dropdown">
        
                                <li className="mobile-wishlist"><Link to={`${process.env.PUBLIC_URL}/wishlist`}><i className="fa fa-heart" aria-hidden="true"></i>{translate('wishlist')}</Link></li>
                                <li className="onhover-dropdown mobile-account">
                                    <i className="fa fa-user" aria-hidden="true"></i> {translate('my_account')}
                                    <ul className="onhover-show-div">
                                        <li>
                                            <Link to={`${process.env.PUBLIC_URL}/pages/login`} data-lng="en">Login</Link>
                                        </li>
                                        <li>
                                            <Link to={`${process.env.PUBLIC_URL}/pages/register`} data-lng="en">Register</Link>
                                        </li>
                                        <li>
                                            <Link to={`${process.env.PUBLIC_URL}/pages/becomeaseller`} data-lng="en">BecomeSeller</Link>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default withTranslate(TopBar);