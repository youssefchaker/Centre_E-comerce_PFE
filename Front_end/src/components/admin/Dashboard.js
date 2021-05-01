import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Breadcrumb from "../common/breadcrumb";
import {Helmet} from 'react-helmet'
import Sidebar from './sidebar_components/sidebar'
import Doughnut from './chart/Doughnut'
import VerticalBar from './chart/VerticalBar'
import { useDispatch, useSelector } from 'react-redux'
import { getAdminProducts,getAdminReviews } from '../../actions/productActions'
import { getAdminEvents } from '../../actions/eventActions'
import './admin.css'





const Dashboard = () => {



    const dispatch = useDispatch();

    const {  adminProducts } = useSelector(state => state.adminproducts);
    const {  reviews } = useSelector(state => state.adminreviews);
    const {  events } = useSelector(state => state.adminevents);
    let outOfStock = 0;
    adminProducts.products.forEach(product => {
        if (product.stock === 0) {
            outOfStock += 1;
        }
    })

    useEffect(() => {
        dispatch(getAdminProducts());
        dispatch(getAdminReviews());
        dispatch(getAdminEvents());
       

    }, [dispatch])
   

    return (
        <Fragment>
            
                {/*SEO Support*/}
                <Helmet>
                    <title>Mall</title>
                    <meta name="description" content=" online mall." />
                </Helmet>
                {/*SEO Support End */}

                <Breadcrumb  title={'Dashboard'}/>
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar/>
                </div>
                

                <div className="col-12 col-md-10">
                    <h1 className="my-4">Dashboard</h1>

                    
                        <Fragment>
                            

                            <div className="row pr-4">
                                <div className="col-xl-12 col-sm-12 mb-3">
                                    <div className="card text-white bg-primary o-hidden h-100 " style={{borderRadius: '60px'}}>
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Total Amount<br /> <b>€45</b>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row pr-4">
                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-dark o-hidden h-100" style={{borderRadius: '15px'}}>
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Products<br /> <b>{adminProducts.products && adminProducts.products.length}</b></div>
                                        </div>
                                        <Link className="card-footer text-white clearfix small z-1" to="/admin/products">
                                            <span className="float-left">View Details</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>


                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-danger o-hidden h-100" style={{borderRadius: '15px'}}>
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Orders<br /> <b>50</b></div>
                                        </div>
                                        <Link className="card-footer text-white clearfix small z-1" to="/admin/orders">
                                            <span className="float-left">View Details</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>


                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-info o-hidden h-100" style={{borderRadius: '15px'}}>
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Users<br /> <b>10</b></div>
                                        </div>
                                        <Link className="card-footer text-white clearfix small z-1" to="/admin/users">
                                            <span className="float-left">View Details</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>

                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-success o-hidden h-100" style={{borderRadius: '15px'}}>
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Events<br /> <b>{events.events && events.events.length}</b></div>
                                        </div>
                                        <Link className="card-footer text-white clearfix small z-1" to="/admin/events">
                                            <span className="float-left">View Details</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>

                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-secondary o-hidden h-100" style={{borderRadius: '15px'}}>
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Reviews<br /> <b>{reviews.reviews && reviews.reviews.length}</b></div>
                                        </div>
                                        <Link className="card-footer text-white clearfix small z-1" to="/admin/reviews">
                                            <span className="float-left">View Details</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>

                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-warning o-hidden h-100" style={{borderRadius: '15px'}}>
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Out of Stock<br /> <b>{outOfStock}</b></div>
                                        </div>
                                    </div>
                                </div>
                                
                            </div><hr></hr>
                           <div className="row">
                           <div style={{margin:"auto", display: 'flex', height: '90vh', alignItems: 'center',justifyContent: 'center',width: '600px',borderRadius: '25px',border: '2px solid #dbdbdb'}}>
                            <Doughnut/>
                            </div >
                            <div style={{margin:"auto", display: 'flex', height: '90vh', alignItems: 'center',justifyContent: 'center',width: '600px',borderRadius: '25px',border: '2px solid #dbdbdb'}} >
                            <VerticalBar/>
                            </div>
                            </div><hr></hr>
                          
                        </Fragment>
                    

                </div>
            </div>

        </Fragment >
    )
}

export default Dashboard