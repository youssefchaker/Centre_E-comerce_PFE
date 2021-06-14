import React, { useEffect} from 'react';
import Breadcrumb from "../common/breadcrumb";
import { toast } from 'react-toastify';
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { getUserStoreDetails, clearErrors } from '../../actions/index'

import { clearResponse, logout } from '../../actions/index';

function  myStore () {



    const dispatch = useDispatch();


    const {  error, store } = useSelector(state => state.userStore)


    let date;
    store.createdAt? date= store.createdAt.slice(0,10): date="";
    let year = parseInt(date.substring(3,4));
    let secondYear = (year + 1).toString();
    date = date.replace(year,secondYear)  
  

    useEffect(() => {

        dispatch(getUserStoreDetails());

        if (error) {
            alert(error);
            dispatch(clearErrors())
        }

        

        

    }, [dispatch, alert, error])

    const logoutHandler = () => {
        dispatch(clearResponse());
        dispatch(logout());
        toast.success('Logged out successfully!!');
    }
    return (
        
        <div>
            <Breadcrumb title={'My Store'}/>
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
                                        <li className="active"><Link to="/pages/mystore">My Store</Link></li>
                                        <li><Link to="/pages/myevents">My Events</Link></li>
                                        <li><Link to="/orders/me">My Orders</Link></li>
                                        <li><Link to='/pages/myproducts'>My Products</Link></li>
                                        <li><Link to="/cart">My Cart</Link></li>
                                        <li className="last"><a href="/" onClick={logoutHandler}>Log Out</a></li>
                                        </ul>
                                    </div>
                                    </div>
                                        <div className="col-lg-6 col-sm-12 col-xs-12">
                                        <div className="top-banner-wrapper">
                                            {store.avatar && ( 
                                                        <img src={ store.avatar.url} className="img-fluid" alt="" style={{width:'800px',height:'310px'}}/>)}
                                                        <div className="top-banner-content small-section">
                                                        {store.name && ( <h4>{store && store.name}</h4>)}
                                                        {store.description && (  <h5>{store.description}</h5>)}
                                                            {store.createdAt && (
                                                            <p style={{color:'red'}}>Your Subscription will end in {date} </p>)}<br></br>
                                                            
                                                            <ul className="contact-list">
                                                            {store.address && ( <li>🏠 Address :    {store.address} {store.postalCode}, {store.city} </li>)}<br></br>
                                                            {store.phoneNumber && ( <li>📞 Phone :    {store.phoneNumber}</li>)}<br></br>
                                                            {store.email && ( <li>📧 Email  :   {store.email}</li>)}
                                                          
                                                        </ul>
                                                        </div>
                                                        <Link to={`/update/store/${store._id}`}><button className="btn btn-solid" >Change</button></Link> 
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
export default myStore