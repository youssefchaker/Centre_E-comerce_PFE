import React, {Component} from 'react';
import SimpleReactValidator from 'simple-react-validator';
import Breadcrumb from "../common/breadcrumb";
import { Link} from 'react-router-dom';
class Register extends Component {

    constructor (props) {
        super (props)
        this.state={
            firstname:"",
            lastname:"",
            email:"",
            password:""
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
      }
    render (){


        return (
            <div>
                <Breadcrumb title={'create account'}/>
                
                
                {/*Regsiter section*/}
                <section className="register-page section-b-space">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <h3>create account</h3>
                                <div className="theme-card">
                                    <form className="theme-form">
                                        <div className="form-row">
                                            <div className="col-md-6">
                                                <label htmlFor="email">First Name</label>
                                                <input type="text" className="form-control" name="firstname" onChange={this.setStateFromInput} value={this.state.firstname}
                                                       placeholder="First Name"  />
                                                {this.validator.message('firstname', this.state.firstname, 'required')}

                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="review">Last Name</label>
                                                <input type="password" className="form-control" name="lastname" onChange={this.setStateFromInput} value={this.state.lastname}
                                                       placeholder="Last Name"/>
                                                {this.validator.message('lastname', this.state.lastname, 'required')}
                                            </div>
                                        </div>
                                        <hr></hr>
                                        <div className="form-row">
                                            <div className="col-md-6">
                                                <label htmlFor="email">email</label>
                                                <input type="text" className="form-control" name="email" onChange={this.setStateFromInput} value={this.state.email}
                                                       placeholder="Email" />
                                                {this.validator.message('email', this.state.email, 'required|email')}
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="review">Password</label>
                                                <input type="password" id="password" className="form-control" name="password" onChange={this.setStateFromInput} value={this.state.password}
                                                       placeholder="Enter your password" />
                                                {this.validator.message('password', this.state.password, 'required|min:8')}
                                            </div>
                                        </div>
                                        <hr></hr>
                                        <div className="form-row">
                                        <div className="col-md-6">
                                            <Link to="/pages/login"><a>Already have an account?</a></Link>
                                            </div>
                                            <div className="col-md-6">
                                            <button type="submit" onClick={this.handlesubmit} className="btn btn-solid">create Account</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        )
    }
}

export default Register