import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {Helmet} from 'react-helmet'
import Breadcrumb from "../common/breadcrumb";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux'
import { getOrderDetails, clearErrors } from '../../actions/orderActions'
import Loader from "react-loader-spinner";
import './order.css';


const OrderDetails = ({ match }) => {

    const dispatch = useDispatch();

    const { loading, error, order = {} } = useSelector(state => state.orderDetails)
    const {symbol} = useSelector(state => state.symbol);
    const {currencydiff} = useSelector(state => state);
    const { shippingInfo, orderItems, paymentInfo, totalPrice, orderStatus } = order
    const {user} = useSelector(state => state.auth)

    useEffect(() => {
        dispatch(getOrderDetails(match.params.id));

        if (error) {
            
            dispatch(clearErrors())
        }
    }, [dispatch, alert, error, match.params.id])

    const shippingDetails = shippingInfo && `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`

    const isPaid = paymentInfo && paymentInfo.status === 'succeeded' ? true : false

    return (
        <Fragment>
            {/*SEO Support*/}
            <Helmet>
                    <title>Mall</title>
                    <meta name="description" content=" online mall." />
                </Helmet>
                {/*SEO Support End */}
                <Breadcrumb  title={'ORDER DETAILS'}/>

            {loading ? <div style={{ textAlign: "center" }}><Loader
                             type="Rings"
                             color="#cc2121"
                             height={200}
                             width={300}
                /></div> : (
                    <section className="section-b-space">
                    <div className="container">
                        <div className="row"></div>
                   <div className="col-lg-9">
                                <div className="dashboard-right">
                                    <div className="dashboard">
                                        <div className="page-title">
                                            <h1>Order # {order._id}</h1>
                                        </div>
                                        <div className="welcome-msg">
                                        <div className="box-head">
                                        <h2 className="mb-4">Shipping Info</h2>
                                        </div><hr></hr>
                                        <p><b>Name: </b> {user && user.firstname + user.lastname}</p>
                                        <p><b>Phone: </b> {shippingInfo && shippingInfo.phoneNumber}</p>
                                        <p className="mb-4"><b>Address: </b>{shippingDetails}</p>
                                        

                                        </div>
                                        <div className="box-account box-info">
                                            <div className="box-head">
                                                <h2>Payment</h2><hr></hr>
                                                <p style={{color:'green'}}><b>Amount: </b> {symbol}{symbol=="€"? (order.totalPrice):Math.round((currencydiff*(order.totalPrice) + Number.EPSILON) )}</p>
                                                <span className={isPaid ? "redColor" : "greenColor"}><span>{isPaid ? "NOT PAID" : " PAID"}</span></span>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <div className="box">
                                                        <div className="box-title">
                                                            <h5>Order Status : <span className={order.orderStatus && String(order.orderStatus).includes('Delivered') ? "greenColor" : "redColor"} ><b>{orderStatus}</b></span></h5>
                                                            
                                                            
                                                        </div>
                                                        <div className="box-head">
                                                        <h2>Order Items</h2>
                                                        </div>
                                                        <div className="box-content">

                                                            
                                                            <h6>{orderItems && orderItems.map(item => (
                                    <div key={item.product} className="row my-5">
                                        <div className="col-4 col-lg-2">
                                            <img src={item.images[0].url} alt={item.name} height="45" width="65" />
                                        </div>

                                        <div className="col-5 col-lg-5">
                                            <Link to={`/products/${item.product}`}>{item.name}</Link>
                                        </div>


                                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                            <p>{symbol}{symbol=="€"?item.price-(item.price*item.discount/100):Math.round((currencydiff*(item.price-(item.price*item.discount/100)) + Number.EPSILON) * 100) / 100}</p>
                                        </div>

                                        <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                            <p>{item.qty} Piece(s)</p>
                                        </div>
                                    </div>
                                ))}</h6>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="box">
                                                        <div className="box-title">
                                                            <h3><strong>Transaction date</strong></h3>
                                                        </div>
                                                        <div className="box-content">
                                                            <p>
                                                            {order.createdAt.slice(0,10)}
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
                            </section>
                
            )}

        </Fragment>
    )
}

export default OrderDetails