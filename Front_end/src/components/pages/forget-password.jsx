import React, {Component} from 'react';
import Breadcrumb from "../common/breadcrumb";
import SimpleReactValidator from 'simple-react-validator';

class ForgetPassword extends Component {

    constructor (props) {
        super (props)
        this.state={
            email:null
        }
        this.validator = new SimpleReactValidator();
    }
    handlesubmit=(e)=>{
        e.preventDefault(); 
          if(!this.validator.allValid()){
            this.validator.showMessages();
            this.forceUpdate();
          }
      }
      setStateFromInput = (event) => {
        var obj = {};
        obj[event.target.name] = event.target.value;
        this.setState(obj);
      }
    render (){


        return (
            <div>
                <Breadcrumb title={'forget password'}/>
                
                
                {/*Forget Password section*/}
                <section className="pwd-page section-b-space">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 offset-lg-3">
                                <h2>Forget Your Password</h2>
                                <form className="theme-form">
                                    <div className="form-row">
                                        <div className="col-md-12">
                                            <input type="text" className="form-control" name="email"
                                                   placeholder="Enter Your Email" onChange={this.setStateFromInput} value={this.state.email} />
                                        </div>
                                        {this.validator.message('email', this.state.email, 'required|email')}
                                        <br></br>
                                        <a className="btn btn-solid" onClick={this.handlesubmit}>Submit</a>
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

export default ForgetPassword