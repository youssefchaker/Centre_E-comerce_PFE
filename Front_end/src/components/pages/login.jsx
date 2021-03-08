import React, {Component} from 'react';
import { Link} from 'react-router-dom';
import Breadcrumb from "../common/breadcrumb";
import SimpleReactValidator from 'simple-react-validator';

class Login extends Component {

    constructor (props) {
        super (props)
        this.state={
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
                <Breadcrumb title={'Login'}/>  
                {/*Login section*/}
                <section className="login-page section-b-space">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6">
                                <h3>Login</h3>
                                <div className="theme-card">
                                    <form className="theme-form">
                                        <div className="form-group">
                                            <label htmlFor="email">Email</label>
                                            <input type="text" className="form-control" name="email" placeholder="Enter Your Email" onChange={this.setStateFromInput} value={this.state.email}/>
                                            {this.validator.message('email', this.state.email, 'required|email')}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="review">Password</label>
                                            <input type="password" className="form-control" name="password" onChange={this.setStateFromInput} value={this.state.password} placeholder="Enter your password"/>
                                            {this.validator.message('password', this.state.password, 'required')}
                                        </div>
                                        
                                        <button onClick={this.handlesubmit} className="btn btn-solid" style={{marginRight:'100px'}}>Login</button>
                                        <Link to="/pages/forget-password"><a className="btn btn-solid">Forget Password?</a></Link>
                                    </form>
                                </div>
                            </div>
                            <div className="col-lg-6 right-login">
                                <h3>New Customer</h3>
                                <div className="theme-card authentication-right">
                                    <h6 className="title-font">Create A Account</h6>
                                    <p>Sign up for a free account at our store. Registration is quick and easy. It
                                        allows you to be able to order from our shop. To start shopping click
                                        register.</p>
                                    <a href={`${process.env.PUBLIC_URL}/pages/register`} className="btn btn-solid">Create an Account</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        )
    }
}

export default Login