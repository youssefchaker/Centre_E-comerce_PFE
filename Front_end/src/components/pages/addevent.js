import React, {Component} from 'react';
import Breadcrumb from "../common/breadcrumb";
import SimpleReactValidator from 'simple-react-validator';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Link} from 'react-router-dom';
class Addevent extends Component {
    constructor(props){
    super(props);
    this.state = {
        StoreName:'',
        EventName:'',
        EventImage:null,
        EventDate:''
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
            toast.success("event added !");
          }
 
      }
    render (){
        return (
            <div>
                <Breadcrumb title={'Add event'}/>
                <section className="section-b-space">
                    <div className="container padding-cls">
                        <div className="checkout-page">
                            <div className="checkout-form" >
                                <form>
                                    <div className="checkout row">
                                        <div className="col-lg-6 col-sm-12 col-xs-12" id="1">
                                            <div className="checkout-title">
                                                <h3>Event</h3>
                                            </div>
                                            
                                            <div className="row check-out">
                                            <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                    <div className="field-label">Store Name</div>
                                                    <input type="text" name="StoreName" onChange={this.setStateFromInput} value={this.state.StoreName} />
                                                    {this.validator.message('StoreName', this.state.StoreName, 'required')}
                                                </div>
                                                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                    <div className="field-label">Event Name</div>
                                                    <input type="text" name="EventName" onChange={this.setStateFromInput} value={this.state.EventName} />
                                                    {this.validator.message('EventName', this.state.EventName, 'required')}
                                                </div>
                                                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                    <div className="field-label">Event Image</div>
                                                    <input type="file" name="EventImage" accept="image/*"  onChange={this.setStateFromInput} value={this.state.EventImage}  />
                                                    {this.validator.message('EventImage', this.state.EventImage, 'required')}
                                                </div>   
                                                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                    <div className="field-label">Event Date</div>
                                                    <input type="date" name="EventDate" onChange={this.setStateFromInput} value={this.state.EventDate}  />
                                                    {this.validator.message('EventDate', this.state.EventDate, 'required')}
                                                </div>                                    
                                            </div>
                                        </div>
                </div>
                <div>
                    <button type="submit" className="btn btn-solid" style={{marginTop:"25px"}} onClick={this.handlesubmit}>Submit product</button>
                </div>
                </form>
            </div>
            </div>
            </div>
            <div style={{textAlign:'center' , top:'50%'}}><Link to={`${process.env.PUBLIC_URL}/pages/myprofile`} ><a><button type="submit" className="btn btn-solid" >Finish Adding Products</button></a></Link></div>
            </section>
            </div>
        )
    }
}
export default Addevent