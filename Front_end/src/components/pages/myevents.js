import React from 'react';
import Breadcrumb from "../common/breadcrumb";
import 'react-toastify/dist/ReactToastify.css';
import {Link} from 'react-router-dom';


function  MyEvents ()  {
    
        return (
            <div>
                <Breadcrumb title={'My Events'}/>
                <section className="section-b-space">
                    <div className="container padding-cls">
                        <div className="checkout-page">
                            <div className="checkout-form" >
                                    <div className="checkout row">
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
                                        <li><Link to='/pages/myprofile'>My Profile</Link></li>
                                            <li><Link to="/mystore">My Store</Link></li>
                                            <li><Link to="/pages/myorders">My Orders</Link></li>
                                            <li className="active"><Link to="/pages/myevents">My Events</Link></li>
                                            <li><Link to="/cart">My Cart</Link></li>
                                        </ul>
                                    </div>
                                    <div className="block-content">
                                        <ul>
                                            <li><Link to='/pages/addevent'>Add Event</Link></li>
                                        </ul>
                                    </div>
                                </div>
                                        <div className="col-lg-6 col-sm-12 col-xs-12">
                                            <div className="checkout-title">
                                                <h3>Event </h3>
                                            </div>
                                            <div className="row check-out">
                                                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                    <div className="field-label">Event Name</div>
                                                    <button >Update Event Name</button>
                                                </div>
                                                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                    <div  className="field-label">Event Image</div>
                                                    <button >Update Event Image</button>
                                                </div>
                                                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                    <div className="field-label">Event Date</div>
                                                    <button >Update Event Date</button>
                                                </div>
                                                <div className="form-group col-md-12 col-sm-12 col-xs-12">
                                                <button type="submit" className="btn btn-solid" >Delete Event</button>
                                                </div>                                           
                                            </div>
                                        </div>
                </div>
                <div>
                </div>
            </div>
            </div>
            </div>
            </section>
            </div>
        )
    
}
export default MyEvents