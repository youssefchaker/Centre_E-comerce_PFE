import React, {Component} from 'react';
import Breadcrumb from "../common/breadcrumb";
import SimpleReactValidator from 'simple-react-validator';
import { toast } from 'react-toastify';
import {connect} from 'react-redux'
import 'react-toastify/dist/ReactToastify.css';
import {Link} from 'react-router-dom';
import { newEvent } from '../../actions/eventActions';
class Addevent extends Component {
    constructor(props){
    super(props);
    this.state = {
        StoreName:"",
        EventName:"",
        EventImage:null,
        EventDatestart:null,
        EventDatefinish:null
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
        var currentdate=new Date();
        var month = currentdate.getMonth() + 1;
        var day = currentdate.getDate();
        var year = currentdate.getFullYear();
        var newdate = year + "-" + month + "-" + day;
          if(!this.validator.allValid()){
            this.validator.showMessages();
            this.forceUpdate();
          }
          else{
            if(Date(this.state.EventDatestart)<Date(newdate)  || Date(this.state.EventDatefinish)<Date(newdate)){
                toast.warn("the event start and finish dates must not be a past date");
            }
            else if(this.state.EventDatestart>this.state.EventDatefinish){
                toast.warn("the event start date must be lower then the finish date");
            }
            else{
            var formData = new FormData();
            formData.set('storeName', this.state.StoreName);   
            formData.set('eventName', this.state.EventName);
            formData.set('eventImage', this.state.EventImage);
            formData.set('eventDateStart', this.state.EventDatestart);
            formData.set('eventDateFinish', this.state.EventDatefinish);
            this.props.newEvent({'storeName':this.state.StoreName,'eventName':this.state.EventName,'eventImage':this.state.EventImage,'eventDateStart':this.state.EventDatestart,'eventDateFinish':this.state.EventDatefinish});

            toast.success("event added !");
            }
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
                                                    <div className="field-label">Event Date Start</div>
                                                    <input type="date" name="EventDatestart" onChange={this.setStateFromInput} value={this.state.EventDatestart}   />
                                                    {this.validator.message('EventDatestart', this.state.EventDatestart, `required`)}
                                                </div>   
                                                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                    <div className="field-label">Event Date Finish</div>
                                                    <input type="date" name="EventDatefinish" onChange={this.setStateFromInput} value={this.state.EventDatefinish}  />
                                                    {this.validator.message('EventDatefinish', this.state.EventDatefinish, 'required')}
                                                </div>                                  
                                            </div>
                                        </div>
                </div>
                <div>
                    <button type="submit" className="btn btn-solid" style={{marginTop:"25px"}} onClick={this.handlesubmit}>Submit event</button>
                </div>
                </form>
            </div>
            </div>
            </div>
            <div style={{textAlign:'center' , top:'50%'}}><Link to={`${process.env.PUBLIC_URL}/pages/myprofile`} ><a><button type="submit" className="btn btn-solid" >Finish Adding events</button></a></Link></div>
            </section>
            </div>
        )
    }
}

const mapStateToProps=state=>{
    return {
        newevent:state.newevent
      }
}

const mapDispatchToProps = dispatch => {
    return {
        newEvent: (eventData) => dispatch(newEvent(eventData))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Addevent)