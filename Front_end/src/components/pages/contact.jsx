import React, {Component} from 'react';
import Breadcrumb from "../common/breadcrumb";
import SimpleReactValidator from 'simple-react-validator';
import { ToastContainer, toast } from 'react-toastify';
class Contact extends Component {

    constructor (props) {
        super (props)
        this.state={
            firstname:"",
            lastname:"",
            email:"",
            messagetopic:"",
            message:""
        }
        this.validator = new SimpleReactValidator();
    }
    setStateFromInput = (event) => {
        var obj = {};
        obj[event.target.name] = event.target.value;
        this.setState(obj);
      }
    handlesubmit=(e)=>{
        e.preventDefault(); 
          if(!this.validator.allValid()){
            this.validator.showMessages();
            this.forceUpdate();
          }
          else{
            toast.success("Feedback Sent !");
          }
 
      }

    render (){


        return (
            <div>
                <Breadcrumb title={'Contact Us'}/>
                
                
                {/*Forget Password section*/}
                <section className=" contact-page section-b-space">
                    <div className="container">
                        <div className="row section-b-space">
                            <div className="col-lg-7 map">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d204351.2646185808!2d10.18440826311541!3d36.84275123732407!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12e2cb4b0eb7c1d9%3A0x31dc6ea669baadcd!2z2KfZhNmF2LnZh9ivINin2YTYudin2YTZiiDZhNmE2KXYudmE2KfZhdmK2KnYjCBSdWUgQWJvdXJyYWloYW4gQWwgQmF5cm91bmksIEFyaWFuYQ!5e0!3m2!1sen!2stn!4v1613940816449!5m2!1sen!2stn" width={400} height={300} style={{border: 0}} allowFullScreen loading="lazy" />
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
                                <form className="theme-form">
                                    <div className="form-row">
                                        <div className="col-md-6">
                                            <label htmlFor="name">First Name</label>
                                            <input type="text" className="form-control" name="firstname" onChange={this.setStateFromInput} value={this.state.firstname}
                                                   placeholder="Enter Your firstname" />
                                            {this.validator.message('firstname', this.state.firstname, 'required')}
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="lastname">Last Name</label>
                                            <input type="text" className="form-control" name="lastname" onChange={this.setStateFromInput} value={this.state.lastname}
                                                   placeholder="Enter Your lastname"/>
                                            {this.validator.message('lastname', this.state.lastname, 'required')}
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="email">Email</label>
                                            <input type="text" className="form-control" placeholder="Enter Your Email" onChange={this.setStateFromInput} value={this.state.email}
                                              name="email"      />
                                            {this.validator.message('email', this.state.email, 'required|email')}
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="lastname">Message Topic</label>
                                            <input type="text" className="form-control" name="messagetopic" onChange={this.setStateFromInput} value={this.state.messagetopic}
                                                   placeholder="Enter Your Message Topic"/>
                                            {this.validator.message('messagetopic', this.state.messagetopic, 'required')}
                                        </div>
                                        <div className="col-md-12">
                                            <label htmlFor="review">Write Your Message</label>
                                            <textarea className="form-control" placeholder="Write Your Message" name="message" rows="6" onChange={this.setStateFromInput} value={this.state.message}></textarea>
                                            {this.validator.message('message', this.state.message, 'required')}
                                        </div>
                                        <div className="col-md-12">
                                            <button className="btn btn-solid" type="submit" onClick={this.handlesubmit}>Send Your Message</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        )
    }
}

export default Contact