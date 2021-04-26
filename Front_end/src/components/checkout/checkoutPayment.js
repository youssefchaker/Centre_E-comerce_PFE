import React, { Fragment, useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SimpleReactValidator from 'simple-react-validator';
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js'
import { createOrder, clearErrors } from '../../actions/orderActions'


import axios from 'axios'
import {Helmet} from 'react-helmet'
import { toast } from 'react-toastify';
import '../cart/payment.css';

const options = {
    style: {
        
        invalid: {
            color: '#9e2146'
        },
        base: {
          width: '100%',
          color: 'white',
          letterSpacing: '0px',
          fontSize: '14px',
          background: '0',
          border: '0px',
          ":focus": {
            outline: "0"
          },
        }
    }
}

const CheckoutPayment = ({ history }) => {

    const [name, setName] = useState('');
    const [, forceUpdate] = useState()


    
    
    const simpleValidator = useRef(new SimpleReactValidator({autoForceUpdate: {forceUpdate: forceUpdate}}));


    const stripe = useStripe();
    const elements = useElements();

    const dispatch = useDispatch();
    
    const {cart} = useSelector(state => state.cartList);
    const { user } = useSelector(state => state.auth)
    const { loading, error } = useSelector(state => state.newOrder);
    const {symbol} = useSelector(state => state.symbol);
    const {currencydiff} = useSelector(state => state);




    useEffect(() => {

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
     
    


    }, [dispatch, alert,  error])

    const shippingInfo = JSON.parse(sessionStorage.getItem('shippingInfo'));
    const order = {
      orderItems: cart,
      shippingInfo
  }

  const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));
  if (orderInfo) {
      order.itemsPrice = orderInfo.itemsPrice
      order.shippingPrice = orderInfo.shippingPrice
      order.taxPrice = orderInfo.taxPrice
      order.totalPrice = orderInfo.totalPrice
  }



    const paymentAmount = symbol=="€"? (Math.round(orderInfo.totalPrice)):Math.round((currencydiff*(orderInfo.totalPrice) + Number.EPSILON) ) / 100
  
    const paymentData = {
        amount: Math.round(paymentAmount*100)
       
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    let res;
    try {

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        res = await axios.post('/api/mall/payment/process', paymentData, config)

        const clientSecret = res.data.client_secret;

        

        if (!stripe || !elements) {
            return;
        }

        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardNumberElement),
                billing_details: {
                    name: name,
                    email: user.email
                }
            }
        });

        if (result.error) {
            
            toast.error(result.error.message, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              });
            
        } else {

            // The payment is processed or not
            if (result.paymentIntent.status === 'succeeded') {

              dispatch(createOrder(order))
              history.push('/order-success')

               
            } else {
                alert('There is some issue while payment processing')
            }
        }


    } catch (error) {
        
        alert(error.response.data.message)
        
    }
}

return (
   <Fragment>
       {/*SEO Support*/}
       <Helmet>
                    <title>Mall</title>
                    <meta name="description" content=" online mall." />
                </Helmet>
                {/*SEO Support End */}
      <div className="app-container">
        <div className="row">
          <div className="col">
          <div className="item-container">
         <div className="item-image">
           <img src={`${process.env.PUBLIC_URL}/assets/images/payment-image.png`}/>
        <div className="item-details">
        </div>
        </div>
        </div>
       </div>
     <form onSubmit={submitHandler}>
          <div className="col no-gutters">
          <div className="checkout-payment">
      <div className="checkout-payment-container">
        <h3 className="heading-3">Credit card checkout</h3>
      <div className="input">
        <label>name</label>
      <div className="input-field">
       <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
      
      </div>
      </div>
      <div className="input">
        <label>"card number"</label>
      <div className="input-field">
        <CardNumberElement  type="number" name="card_number" options={options} />
        <img src="https://seeklogo.com/images/V/visa-logo-6F4057663D-seeklogo.com.png"/>
      </div>
     </div>
      <div className="row">
        <div className="col">
     <div className="input">
       <label>exp date</label>
     <div className="input-field">
       <CardExpiryElement  type="month" name="exp_date" options={options} />
      
     </div>
     </div>
     </div>
      <div className="col">
       <div className="input">
       <label>CVV</label>
     <div className="input-field">
       <CardCvcElement  type="number" name="cvv" options={options} />
     </div>
     </div>
     </div>
     </div>
       <button className="checkout-payment-btn" type="submit" disabled={loading ? true : false}>Pay{` ${symbol}${paymentData.amount/100}`}</button>
     </div>
    </div>
      </div>
   </form>
    </div>
        
   </div> 
</Fragment>
    )
}

export default CheckoutPayment