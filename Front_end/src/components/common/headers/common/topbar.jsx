import React from 'react';
import {Link} from 'react-router-dom';
import { withTranslate } from 'react-redux-multilingual'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../../../actions/index';
import { toast } from 'react-toastify';

const TopBar = (props) =>  {

    const dispatch = useDispatch();

    const { user, loading } = useSelector(state => state.auth)
    const logoutHandler = () => {
        dispatch(logout());
        toast.success('Logged out', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
    }

        const {translate} = props;
        return (
            <div className="top-header ">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="header-contact">
                                <ul>
                                    <li>{translate('topbar_title', { theme_name: ' Marketplace' })}</li>
                                    <li><i className="fa fa-phone" aria-hidden="true"></i>{translate('call_us')}:  +216 11 111 111</li>
                                </ul>
                            </div>
                        </div>
                        
                        {user ? (
                        <div className="col-lg-6 text-right" >
                        <ul className="header-dropdown" >
                            <li className="onhover-dropdown mobile-account" >
                                <i className="fa fa-user" aria-hidden="true"></i><span>{user && user.firstname}</span>
                                <ul className="onhover-show-div">
                                {user && user.role === 'admin' && (
                                    <li>
                                    <Link className="dropdown-item" to="/dashboard">Dashboard</Link>
                                    </li>
                                )}
                                    <li>
                                        <Link to={`${process.env.PUBLIC_URL}/pages/myorders`} data-lng="en">Orders</Link>
                                    </li>
                                    <li>
                                        <Link to={`${process.env.PUBLIC_URL}/pages/myprofile`} data-lng="en">Profile</Link>
                                    </li>
                                    <li>
                                        <Link to={`${process.env.PUBLIC_URL}/`} data-lng="en" onClick={logoutHandler}>Logout</Link>
                                    </li>
                                    
                                </ul>
                            </li>
                        </ul>
                    </div>

                          ) :



                        
                        <div className="col-lg-6 text-right">
                            <ul className="header-dropdown">
                                <li className="onhover-dropdown mobile-account">
                                    <i className="fa fa-user" aria-hidden="true"></i> {translate('my_account')}
                                    <ul className="onhover-show-div">
                                        <li>
                                            <Link to={`${process.env.PUBLIC_URL}/pages/login`} data-lng="en">Login</Link>
                                        </li>
                                        <li>
                                            <Link to={`${process.env.PUBLIC_URL}/pages/register`} data-lng="en">Register</Link>
                                        </li>
                                        
                                    </ul>
                                </li>
                            </ul>
                        </div>}
                    </div>
                </div>
            </div>
        )
    
}


export default withTranslate(TopBar);