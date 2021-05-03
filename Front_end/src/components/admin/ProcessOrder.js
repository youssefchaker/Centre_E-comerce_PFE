import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import Breadcrumb from "../common/breadcrumb";
import {Helmet} from 'react-helmet'
import Sidebar from './sidebar_components/sidebar'
import Loader from "react-loader-spinner";

import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux'
import { getOrderDetails, updateOrder, clearErrors } from '../../actions/orderActions'
import { UPDATE_ORDER_RESET } from '../../constants/ActionTypes'

const ProcessOrder = ({ match }) => {

    const [status, setStatus] = useState('');

    const dispatch = useDispatch();

    const { loading, order = {} } = useSelector(state => state.orderDetails)
    const { shippingInfo, orderItems, paymentInfo, user, totalPrice, orderStatus } = order
    const { error, isUpdated } = useSelector(state => state.order)
    const {symbol} = useSelector(state => state.symbol);
    const {currencydiff} = useSelector(state => state);

    const orderId = match.params.id;

    useEffect(() => {

        dispatch(getOrderDetails(orderId))

        if (error) {
            toast.error(error, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });           
            dispatch(clearErrors())
        }


        if (isUpdated) {
            toast.success('Order Updated successfully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            dispatch({ type: UPDATE_ORDER_RESET })
        }

    }, [dispatch, alert, error, isUpdated, orderId])


    const updateOrderHandler = (id) => {

        const formData = new FormData();
        formData.set('status', status);

        dispatch(updateOrder(id, formData))
    }

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

            <Breadcrumb  title={'Dashboard'}/>
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        {loading ? <div style={{ textAlign: "center" }}><Loader
                             type="Rings"
                             color="#cc2121"
                             height={200}
                             width={300}
                /></div> : (
                            <div className="row d-flex justify-content-around">
                                <div className="col-12 col-lg-7 order-details">

                                    <h2 className="my-5" >Order   <b>#{order._id}</b></h2>

                                    <h4 className="mb-4">Shipping Info</h4>
                                    <p><b>Name: </b> {user && user.firstname + " " + user.lastname}</p>
                                    <p><b>Email: </b> {user && user.email}</p>
                                    <p><b>Phone: </b> {shippingInfo && shippingInfo.phoneNumber}</p>
                                    <p className="mb-4"><b>Address: </b>{shippingDetails}</p>

                                    <h4 >Amount:  <a href = "#">{symbol}{symbol=="€"? (order.totalPrice):Math.round((currencydiff*(order.totalPrice) + Number.EPSILON) )}</a></h4><br></br>
                                    <p><b>Tax price: </b>{symbol}{symbol=="€"? (order.taxPrice):Math.round((currencydiff*(order.taxPrice) + Number.EPSILON) )}</p>
                                    <p><b>Shipping price: </b>{symbol}{symbol=="€"? (order.shippingPrice):Math.round((currencydiff*(order.shippingPrice) + Number.EPSILON) )}</p>
                                    <p><b>Items price: </b>{symbol}{symbol=="€"? (order.itemsPrice):Math.round((currencydiff*(order.itemsPrice) + Number.EPSILON) )}</p>
                                    <hr />

                                    <h4 className="my-4">Payment</h4>
                                    <p className={isPaid ? "redColor" : "greenColor"}><b>{isPaid ? "NOT PAID" : " PAID"}</b></p>

                                    <h4 className="my-4">Stripe Transaction Date </h4>
                                    <p>{order.createdAt}</p><hr></hr>

                                    <h4 className="my-4">Order Status:</h4>
                                    <p className={order.orderStatus && String(order.orderStatus).includes('Delivered') ? "greenColor" : "redColor"} ><b>{orderStatus}</b></p>



                                    <h4 className="my-4">Order Items:</h4>

                                    <hr />
                                    <div className="cart-item my-1">
                                        {orderItems && orderItems.map(item => (
                                            <div key={item._id} className="row my-5">
                                                <div className="col-4 col-lg-2">
                                                    <img src={item.images[0].url} alt={item.name} height="45" width="65" />
                                                </div>

                                                <div className="col-5 col-lg-5">
                                                    <Link to={`/left-sidebar/product/${item._id}`}>{item.name}</Link>
                                                </div>


                                                <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                                    <p>{symbol}{symbol=="€"?item.price-(item.price*item.discount/100):Math.round((currencydiff*(item.price-(item.price*item.discount/100)) + Number.EPSILON) * 100) / 100}</p>
                                                </div>

                                                <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                                    <p>{item.qty} Piece(s)</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <hr />
                                </div>

                                <div className="col-12 col-lg-3 mt-5">
                                    <h4 className="my-4">Status</h4>

                                    <div className="form-group">
                                        <select
                                            className="form-control"
                                            name='status'
                                            value={status}
                                            onChange={(e) => setStatus(e.target.value)}
                                        >
                                            <option value="Processing">Processing</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                            <option value="Canceled">Canceled</option>
                                        </select>
                                    </div>

                                    <button className="btn btn-primary btn-block" onClick={() => updateOrderHandler(order._id)}>
                                        Update Status
                                    </button>
                                </div>

                            </div>
                        )}
                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}

export default ProcessOrder