import React, {Component} from 'react';
import Breadcrumb from "../common/breadcrumb";
import {Link} from 'react-router-dom'
class MyProfile extends Component {

    constructor (props) {
        super (props)
    }

    render (){


        return (
            <div>
                <Breadcrumb title={'MyProfile'}/>
                
                
                {/*Myprofile section*/}
                <section className="section-b-space">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3">
                                <div className="account-sidebar">
                                    <a className="popup-btn">
                                        My Profile
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
                                        <Link to={`${process.env.PUBLIC_URL}/pages/myprofile`}><li className="active"><a>My Profile</a></li></Link>
                                            <Link to={`${process.env.PUBLIC_URL}/pages/mystore`}><li><a>My Store</a></li></Link>
                                            <Link to={`${process.env.PUBLIC_URL}/pages/myorders`}><li><a>My Orders</a></li></Link>
                                            <Link to={`${process.env.PUBLIC_URL}/pages/myevents`}><li><a>My Events</a></li></Link>
                                            <Link to={`${process.env.PUBLIC_URL}/pages/cart`}><li><a>My Cart</a></li></Link>
                                            <Link to={`${process.env.PUBLIC_URL}/`}><li><a>Change Password</a></li></Link>
                                            <Link to={`${process.env.PUBLIC_URL}/`}><li className="last"><a>Log Out</a></li></Link>
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
                                            <p>Hello {/* {user name} */}</p>
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
                                                            <a href="#">Edit</a>
                                                        </div>
                                                        <div className="box-content">
                                                            <h6>MARK JECNO</h6>
                                                            <h6>MARk-JECNO@gmail.com</h6>
                                                            <h6><a href="#">Change Password</a></h6>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="box">
                                                        <div className="box-title">
                                                            <h3>Mailing News Service</h3>
                                                            <a href="#">Edit</a>
                                                        </div>
                                                        <div className="box-content">
                                                            <p>
                                                                You are currently not subscribed to the Mailing News Service.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="box">
                                                    <div className="box-title">
                                                        <h3>Address Book</h3>
                                                        <a href="#">Manage Addresses</a>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-sm-6">
                                                            <h6>Default Billing Address</h6>
                                                            <address>
                                                                You have not set a default billing address.<br/>
                                                                <a href="#">Edit Address</a>
                                                            </address>
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <h6>Default Shipping Address</h6>
                                                            <address>
                                                                You have not set a default shipping address.<br />
                                                                <a href="#">Edit Address</a>
                                                            </address>
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
}

export default MyProfile;