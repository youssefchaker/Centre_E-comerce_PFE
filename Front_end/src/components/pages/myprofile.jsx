import React from 'react';
import Breadcrumb from "../common/breadcrumb";
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearResponse, logout } from '../../actions/index';
import { toast } from 'react-toastify';
function MyProfile ()  {

    const dispatch = useDispatch();
    

    const { user, loading } = useSelector(state => state.auth)
    const logoutHandler = () => {
        dispatch(clearResponse());
        dispatch(logout());
        toast.success('Logged out successfully!!');
    }



        return (
            <div>
                <Breadcrumb title={'Profile'}/>
                
                
                {/*Myprofile section*/}
                <section className="section-b-space">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3">
                                <div className="account-sidebar">
                                    <a className="popup-btn">
                                         Profile
                                    </a>
                                </div>
                                <div className="dashboard-left">
                                    <div className="collection-mobile-back">
                                    <span className="filter-back">
                                        <i className="fa fa-angle-left" aria-hidden="true"></i> back
                                    </span>
                                    </div>
                                    <div className="block-content">
                                        <ul>
                                            <li className="active"><Link to='/pages/myprofile'>My Profile</Link></li>
                                            {user.role == 'Admin' && (
                                            <li><Link to="/dashboard">Dashboard</Link></li>
                                            )}
                                            {user.role == 'Seller' && (
                                            <React.Fragment>
                                            <li><Link to={`${process.env.PUBLIC_URL}/pages/mystore`}>My Store</Link></li>
                                            
                                            <li><Link to="/pages/myevents">My Events</Link></li>
                                            </React.Fragment>
                                            )}
                                            {user.role !== 'Admin' && (
                                            <React.Fragment>
                                            <li><Link to={`${process.env.PUBLIC_URL}/orders/me`}>My Orders</Link></li>
                                            <li><Link to="/cart">My Cart</Link></li>
                                            <li className="last"><a href="/" onClick={logoutHandler}>Log Out</a></li>
                                            </React.Fragment>

                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-9">
                                <div className="dashboard-right">
                                    <div className="dashboard">
                                        <div className="page-title">
                                            <h2>My Profile</h2>
                                        </div>
                                        <div className="welcome-msg">
                                            <h5>Hello, {user.firstname} !</h5>
                                            <p>From your your Account's Dashboard you have the ability to manage your profile</p>
                                        </div>
                                        <div className="box-account box-info">
                                            <div className="box-head">
                                                <h2>Account Information</h2>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <div className="box">
                                                        <div className="box-title">
                                                            <h3>Contact Information</h3>
                                                            <a href="/profile/update">Edit</a>
                                                        </div>
                                                        <div className="box-content">
                                                            <h6>{user.firstname} {user.lastname}</h6>
                                                            <h6>{user.email} </h6>
                                                            <h6><a href="/password/update">Change Password</a></h6>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="box">
                                                        <div className="box-title">
                                                            <h3>join date</h3>
                                                        </div>
                                                        <div className="box-content">
                                                            <p>
                                                            {String(user.register_date).substring(0, 10)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        )
    
}

export default MyProfile;