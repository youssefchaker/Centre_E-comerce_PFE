import React from 'react';
import {  useSelector } from 'react-redux'
import provider from 'react-redux-multilingual/lib/provider';



function orderSuccess () {

        
       const { user } = useSelector(state => state.auth)
       const { order } = useSelector(state => state.newOrder);
       const {symbol} = useSelector(state => state.symbol);
       const {currencydiff} = useSelector(state => state);
    

        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        var current = new Date();
        var next5days = new Date(Date.now() + 5 * 86400000);
        let CheckDate = current.toLocaleDateString("en-US", options).toString()
        let deliveryDate = next5days.toLocaleDateString("en-US", options).toString()

        return (
            (order)?
            <div>
                <section className="section-b-space light-layout">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="success-text">
                                    <i className="fa fa-check-circle" aria-hidden="true"></i>
                                    <h2>thank you </h2>
                                    <p>Payment Is Has Been Received Order Placed Successfully</p>
                                    <p>Transaction ID:  {order.order._id}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section-b-space">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="product-order">
                                    <h3>your order details</h3>
                                    {order.order.orderItems.map((item, index) => {
                                    return <div className="row product-order-detail" key={index}>
                                                <div className="col-3">
                                                    <img src={item.images?
                                                        item.images[0]
                                                        :'' } alt="" className="img-fluid" />
                                                </div>
                                                <div className="col-3 order_detail">
                                                    <div>
                                                        <h4>product name</h4>
                                                        <h5>{item.name}</h5>
                                                    </div>
                                                </div>
                                                <div className="col-3 order_detail">
                                                    <div>
                                                        <h4>quantity</h4>
                                                        <h5>{item.qty}</h5>
                                                    </div>
                                                </div>
                                                <div className="col-3 order_detail">
                                                    <div>
                                                        <h4>price</h4>
                                                        <h5>{symbol}{symbol=="€"?item.price: Math.round((currencydiff*(item.price)))}</h5>
                                                    </div>
                                                </div>
                                            </div>
                                    })}
                                    <div className="total-sec">
                                        <ul>
                                            <li>subtotal <span>{symbol}{symbol=="€"?order.order.itemsPrice: Math.round((currencydiff*(order.order.itemsPrice)))}</span></li>
                                            <li>shipping <span>{symbol}{symbol=="€"?order.order.shippingPrice: Math.round((currencydiff*(order.order.shippingPrice)))}</span></li>
                                            <li>tax(GST) <span>{symbol}{symbol=="€"?order.order.taxPrice: Math.round((currencydiff*(order.order.taxPrice)))}</span></li>
                                        </ul>
                                    </div>
                                    <div className="final-total">
                                        <h3>total <span>{symbol}{symbol=="€"?order.order.totalPrice: Math.round((currencydiff*(order.order.totalPrice)))}</span></h3>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="row order-success-sec">
                                    <div className="col-sm-6">
                                        <h4>summery</h4><hr></hr>
                                        <ul className="order-detail">
                                            
                                            <div>
                                            <li>payer ID: {order.order.user}</li>
                                            </div>
                                                
                                            <li>Order ID: {order.order._id}</li> 
                                            <li>Order Date: {CheckDate}</li>
                                            <li>Order Total: {symbol}{symbol=="€"?order.order.totalPrice: Math.round((currencydiff*(order.order.totalPrice)))}</li>
                                        </ul>
                                    </div>
                                    <div className="col-sm-6">
                                        <h4>shipping address</h4><hr></hr>
                                        <ul className="order-detail">
                                            <li>{order.order.shippingInfo.address}</li>
                                            <li>{order.order.shippingInfo.country}</li>
                                            <li>{order.order.shippingInfo.city}</li>
                                            <li>{order.order.shippingInfo.postalCode}</li>
                                            <li>Contact No. {order.order.shippingInfo.phoneNumber}</li>
                                        </ul>
                                    </div>

                                    <div className="col-sm-12 payment-mode">
                                        <h4>payment method</h4>
                                        <p>With Card using Stripe
                                         banking acceptance subject to device availability.</p><br></br><br></br><br></br>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="delivery-sec">
                                            <h3>expected date of delivery</h3>
                                            <h2>{deliveryDate}</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
            </div>
            :
            <section className="p-0">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="error-section">
                                <h1>404</h1>
                                <h2>page not found</h2>
                                <a href="/" className="btn btn-solid">back to home</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    
}

export default orderSuccess