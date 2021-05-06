import React, { Fragment, useState, useEffect, useRef } from 'react';
import Breadcrumb from "../common/breadcrumb";
import SimpleReactValidator from 'simple-react-validator';
import { useDispatch, useSelector } from 'react-redux'
import { contactFormulaire, clearErrors } from '../../actions/index'
import { toast } from 'react-toastify';

function Contact ({history})  {

    

    const [email, setEmail] = useState('')
    const [firstname, setFirstName] = useState('')
    const [lastname, setLastName] = useState('')
    const [message, setMessage] = useState('')
    const [messagetopic, setMessageTopic] = useState('')
    const [, forceUpdate] = useState()
    const [formErrors, setFormErrors] = useState(false)


    const dispatch = useDispatch();



    const { error, loading, response } = useSelector(state => state.contact)

    const simpleValidator = useRef(new SimpleReactValidator({autoForceUpdate: {forceUpdate: forceUpdate}}));
    
    
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
            dispatch(clearErrors());
        }

        if (response && !formErrors ) {
            toast.success(response, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                }); 
           history.push('/pages/contact')
        }

    }, [dispatch, , error, response])






    const submitHandler = (e) => {
        e.preventDefault();
        const formValid = simpleValidator.current.allValid()
        setFormErrors(false)

        if (!formValid) {
          simpleValidator.current.showMessages();
           setFormErrors(true);

        }

        const formData = new FormData();
        formData.set('firstname', firstname);
        formData.set('lastname', lastname);
        formData.set('email', email);
        formData.set('message', message);
        formData.set('messagetopic', messagetopic);

        dispatch(contactFormulaire( formData))
    }

    


        return (
            <Fragment>
                <Breadcrumb title={'Contact Us'}/>
                
                
                {/*Forget Password section*/}
                <section className=" contact-page section-b-space">
                    <div className="container">
                        <div className="row section-b-space">
                            <div className="col-lg-7 map">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3192.770058093472!2d10.266119815146089!3d36.847982679938866!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd4ba01f5798f7%3A0x683ccc08c45ecf18!2sSilver%20Digital!5e0!3m2!1sen!2stn!4v1620254632181!5m2!1sen!2stn"  width={400} height={300} style={{border: 0}} allowFullScreen loading="lazy" />
                            </div>
                            <div className="col-lg-5">
                                <div className="contact-right">
                                    <ul>
                                        <li>
                                            <div className="contact-icon">
                                                <img src={`${process.env.PUBLIC_URL}/assets/images/icon/phone.png`} alt="Generic placeholder image" />
                                                    <h6>Contact Us</h6>
                                            </div>
                                            <div className="media-body">
                                                <p>+216 22222222</p>
                                                <p>+216 22222222</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="contact-icon">
                                                <i className="fa fa-map-marker" aria-hidden="true"></i>
                                                <h6>Address</h6>
                                            </div>
                                            <div className="media-body">
                                                <p>Tunis,Ariana</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="contact-icon">
                                                <img src={`${process.env.PUBLIC_URL}/assets/images/icon/email.png`} alt="Generic placeholder image" />
                                                    <h6>Email Address</h6>
                                            </div>
                                            <div className="media-body">
                                                <p>Support@Shopcart.com</p>
                                                <p>info@shopcart.com</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <form className="theme-form" onSubmit={submitHandler}>
                                    <div className="form-row">
                                        <div className="col-md-6">
                                            <label htmlFor="name">First Name</label>
                                            <input type="text" className="form-control"  value={firstname} onChange={(e) => setFirstName(e.target.value)}
                                                   placeholder="Enter Your firstname" />
                                            {simpleValidator.current.message('firstname', firstname, 'required')}
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="lastname">Last Name</label>
                                            <input type="text" className="form-control"  value={lastname} onChange={(e) => setLastName(e.target.value)}
                                                   placeholder="Enter Your lastname"/>
                                            {simpleValidator.current.message('lastname', lastname, 'required')}
                                        </div>
                                        </div>
                                        <hr></hr>
                                        <div className="form-row">                                    
                                        <div className="col-md-6">
                                            <label htmlFor="email">Email</label>
                                            <input type="email" className="form-control" placeholder="Enter Your Email" value={email} onChange={(e) => setEmail(e.target.value)}
                                                    />
                                            {simpleValidator.current.message('email', email, 'required|email')}
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="lastname">Message Topic</label>
                                            <input type="text" className="form-control"  value={messagetopic} onChange={(e) => setMessageTopic(e.target.value)}
                                                   placeholder="Enter Your Message Topic"/>
                                            {simpleValidator.current.message('messagetopic', messagetopic, 'required')}
                                        </div>
                                        </div>
                                        <hr></hr>
                                        <div className="col-md-12">
                                            <label htmlFor="review">Write Your Message</label>
                                            <textarea className="form-control" placeholder="Write Your Message"  rows="6" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                                            {simpleValidator.current.message('message', message, 'required')}
                                        </div>
                                        <hr></hr>
                                        <div className="col-md-12">
                                            <button className="btn btn-solid" type="submit" disabled={loading ? true : false}>Send Your Message</button>
                                        </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>

            </Fragment>
        )
    
}

export default Contact