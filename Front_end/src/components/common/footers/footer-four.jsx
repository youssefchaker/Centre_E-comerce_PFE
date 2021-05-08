import React, { useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { subscribeToNewsLetter, clearErrors } from '../../../actions/index'
import { toast } from 'react-toastify';

import {SlideUpDown} from "../../../services/script"
import LogoImage from "../headers/common/logo"

function FooterFour ( {  logoName }) {

    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('');




    const dispatch = useDispatch();

    const { message, error, loading } = useSelector(state => state.newsLetter);

    

    useEffect(() => {

        var contentwidth = window.innerWidth;
        if ((contentwidth) < 750) {
            SlideUpDown('footer-title');
        } else {
            var elems = document.querySelectorAll(".footer-title");
            [].forEach.call(elems, function(elemt) {
                let el = elemt.nextElementSibling;
                el.style = "display: block";
            });
        }

        if (error) {
          
          dispatch(clearErrors())
      }
       
      
  
  
      }, [dispatch, SlideUpDown, alert,  error])




      const submitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('email', email);
        formData.set('status', status);

        dispatch(subscribeToNewsLetter(formData))



        if (message) {

          toast.success(message, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              });
          //dispatch({ type: NEW_STORE_RESET })
      }
    }

    const onChangeNews = e => {
        setEmail(e.target.value)
        setStatus('subscribed')

    }
    

        return (
            <footer className="">
                <div className="white-layout">
                    <div className="container">
                        <section className="small-section">
                            <div className="row">
                                <div className="col-xl-6 offset-xl-3">
                                    <div className="subscribe">
                                        <h4>newsletter</h4>
                                        <form className="form-inline subscribe-form classic-form" onSubmit={submitHandler}>
                                            <div className="form-group">
                                                <input type="text" className="form-control" id="exampleFormControlInput"
                                                       placeholder="Enter your email"  onChange={onChangeNews}/>
                                            </div>
                                            <button type="submit" className="btn btn-solid">subscribe</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
                <section className="section-b-space darken-layout">
                    <div className="container">
                        <div className="row footer-theme partition-f">
                            <div className="col-lg-4 col-md-6">
                                <div className="footer-title footer-mobile-title">
                                    <h4>about</h4>
                                </div>
                                <div className="footer-contant">
                                    <div className="footer-logo">
                                        <LogoImage logo={logoName} />
                                    </div>
                                    <p>Welcome to our Marketplace where you can browse the different products and events from different stores.Along with the possiblity of becoming a seller yourself by buying our subscription on the website and with that begin able to add your own products and events as a store. </p>
                                    <div className="footer-social">
                                        <ul>
                                            <li>
                                                <Link to={'https://www.facebook.com/'} ><i className="fa fa-facebook" aria-hidden="true"></i></Link>
                                            </li>
                                            <li>
                                                <Link to={'https://plus.google.com/'} ><i className="fa fa-google-plus" aria-hidden="true"></i></Link>
                                            </li>
                                            <li>
                                                <Link to={'https://twitter.com'}><i className="fa fa-twitter" aria-hidden="true"></i></Link>
                                            </li>
                                            <li>
                                                <Link to={'https://instagram.com'}><i className="fa fa-instagram" aria-hidden="true"></i></Link>
                                            </li>
                                            <li>
                                                <Link to={'https://rss.com/'}><i className="fa fa-rss" aria-hidden="true"></i></Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col offset-xl-1">
                                <div className="sub-title">
                                    <div className="footer-title">
                                        <h4>Features</h4>
                                    </div>
                                    <div className="footer-contant">
                                        <ul>
                                            <li><Link to={`${process.env.PUBLIC_URL}/pages/subscription`} >Start selling</Link></li>
                                            <li><Link to={`${process.env.PUBLIC_URL}/pages/register`} >Registration</Link></li>
                                            <li><Link to={`${process.env.PUBLIC_URL}/pages/login`} >Login</Link></li>
                                            <li><a href={`${process.env.PUBLIC_URL}/pages/about-us`}>staff</a></li>
                                            <li><a href={`${process.env.PUBLIC_URL}/pages/contact`}>contact us</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="sub-title">
                                    <div className="footer-title">
                                        <h4>Display Section</h4>
                                    </div>
                                    <div className="footer-contant">
                                        <ul>
                                            <li><Link to={`${process.env.PUBLIC_URL}/stores`} >Featured Stores</Link></li>
                                            <li><Link to={`${process.env.PUBLIC_URL}/left-sidebar/collection`} >Featured Products</Link></li>
                                            <li><Link to={`${process.env.PUBLIC_URL}/pages/eventsdisplay`} >Featured Events</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="sub-title">
                                    <div className="footer-title">
                                        <h4>Website information</h4>
                                    </div>
                                    <div className="footer-contant">
                                        <ul className="contact-list">
                                            <li><i className="fa fa-map-marker"></i>Les berges du lac 2
                                                Tunis, 1053
                                            </li>
                                            <li><i className="fa fa-phone"></i>Call Us: 26 582 160</li>
                                            <li><i className="fa fa-envelope-o"></i>Email Us: <a
                                                href="#">Support@Mall.com</a></li>
                                            <li><i className="fa fa-fax"></i>Fax: 123456</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="sub-footer dark-subfooter">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-6 col-md-6 col-sm-12">
                                <div className="footer-end">
                                    <p><i className="fa fa-copyright" aria-hidden="true"></i> <span>{new Date().getFullYear()} </span>
                                        Powered by Silver Digital</p>
                                </div>
                            </div>
                            <div className="col-xl-6 col-md-6 col-sm-12">
                                <div className="payment-card-bottom">
                                    <ul>
                                        <li>
                                            <a href="#"><img src={`${process.env.PUBLIC_URL}/assets/images/icon/visa.png`} alt="" /></a>
                                        </li>
                                        <li>
                                            <a href="#"><img src={`${process.env.PUBLIC_URL}/assets/images/icon/mastercard.png`} alt="" /></a>
                                        </li>
                                        <li>
                                            <a href="#"><img src={`${process.env.PUBLIC_URL}/assets/images/icon/paypal.png`} alt="" /></a>
                                        </li>
                                        <li>
                                            <a href="#"><img src={`${process.env.PUBLIC_URL}/assets/images/icon/american-express.png`} alt="" /></a>
                                        </li>
                                        <li>
                                            <a href="#"><img src={`${process.env.PUBLIC_URL}/assets/images/icon/discover.png`} alt="" /></a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        )
    
}

export default FooterFour;