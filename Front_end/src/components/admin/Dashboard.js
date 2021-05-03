import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Breadcrumb from "../common/breadcrumb";
import {Helmet} from 'react-helmet'
import Sidebar from './sidebar_components/sidebar'
import Doughnut from './chart/Doughnut'
import VerticalBar from './chart/VerticalBar'
import { useDispatch, useSelector } from 'react-redux'
import { getAdminProducts } from '../../actions/productActions'
import { allOrders } from '../../actions/orderActions'
import { allUsers } from '../../actions/index'
import Loader from "react-loader-spinner";
import './admin.css'





const Dashboard = () => {



    const dispatch = useDispatch();

    const {  adminProducts } = useSelector(state => state.adminproducts);
    const { orders, totalAmount, loading } = useSelector(state => state.allOrders)
    const { users } = useSelector(state => state.allUsers)
    const { symbol} = useSelector(state => state.symbol);
    const {currencydiff} = useSelector(state => state);


    let outOfStock = 0;
    adminProducts.forEach(product => {
        if (product.stock === 0) {
            outOfStock += 1;
        }
    })

    useEffect(() => {
        dispatch(getAdminProducts())
        dispatch(allOrders())
        dispatch(allUsers())

       

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

                    {loading ?<div style={{ textAlign: "center" }}><Loader
                             type="Rings"
                             color="#cc2121"
                             height={200}
                             width={300}
                /></div> : (

                    
                        <Fragment>
                            

                            <div className="row pr-4">
                                <div className="col-xl-12 col-sm-12 mb-3">
                                    <div className="card text-white bg-primary o-hidden h-100 " style={{borderRadius: '60px'}}>
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Total Amount<br /> <b>{symbol}{totalAmount && symbol=="€"?  totalAmount.toFixed(2):Math.round((currencydiff*(totalAmount) + Number.EPSILON) )}</b>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row pr-4">
                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-dark o-hidden h-100" style={{borderRadius: '15px'}}>
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Products<br /> <b>{adminProducts && adminProducts.length}</b></div>
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
                                            <div className="text-center card-font-size">Orders<br /> <b>{orders && orders.length}</b></div>
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
                                            <div className="text-center card-font-size">Users<br /> <b>{users && users.length}</b></div>
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

                )}
                    

                </div>
            </div>

        </Fragment >
    )
}

export default Dashboard