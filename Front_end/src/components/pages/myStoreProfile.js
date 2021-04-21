import React, { useEffect} from 'react';
import Breadcrumb from "../common/breadcrumb";
import { toast } from 'react-toastify';
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { getUserStoreDetails, clearErrors } from '../../actions/index'



function  myStore () {



    const dispatch = useDispatch();


    const {  error, store } = useSelector(state => state.userStore)
    


    useEffect(() => {

        dispatch(getUserStoreDetails());

        if (error) {
            alert(error);
            dispatch(clearErrors())
        }

        

        

    }, [dispatch, alert, error])


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
                                        <li className="active"><Link to="/mystore">My Store</Link></li>
                                        <li><Link to="/pages/myevents">My Events</Link></li>
                                        <li><Link to="/pages/myorders">My Orders</Link></li>
                                        <li><Link to='/pages/myproducts'>My Products</Link></li>
                                        <li><Link to="/cart">My Cart</Link></li>
                                        </ul>
                                    </div>
                                    </div>
                                        <div className="col-lg-6 col-sm-12 col-xs-12">
                                        <div className="top-banner-wrapper">
                                                        <img src={store && store.avatar.url} className="img-fluid" alt="" style={{width:'800px',height:'310px'}}/>
                                                        <div className="top-banner-content small-section">
                                                            <h4>{store && store.name}</h4>
                                                            <h5>{store && store.name} is a {store && store.buisnessDomaine} company it is part of the international Inditex group</h5>
                                                            <p>The company was created in {store.createdAt.substring(0, 4)} as a new store and unique concept, aimed at a young target Market.</p><hr></hr>
                                                            <ul className="contact-list">
                                                            <li>🏠 Address :    {store.address} {store.postalCode}, {store.city} </li><br></br>
                                                            <li>📞 Phone :    {store.phoneNumber}</li><br></br>
                                                            <li>📧 Email  :   <a href="#">{store.email}</a></li>
                                                          
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