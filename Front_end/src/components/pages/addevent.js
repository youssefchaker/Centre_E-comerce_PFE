import React, {Component} from 'react';
import Breadcrumb from "../common/breadcrumb";
import SimpleReactValidator from 'simple-react-validator';
import { toast } from 'react-toastify';
import {connect} from 'react-redux'
import 'react-toastify/dist/ReactToastify.css';
import {Link} from 'react-router-dom';
import { newEvent } from '../../actions/eventActions';
import { NEW_EVENT_RESET } from '../../constants/eventConstants';
import Loader from "react-loader-spinner";

class Addevent extends Component {
    constructor(props){
    super(props);
    this.state = {
        StoreName:"",
        EventName:"",
        EventImage:null,
        EventDatestart:null,
        EventDatefinish:null,
        EventImg:'',
        
    }
    this.validator = new SimpleReactValidator();
    }
    componentDidUpdate(){
        if(this.props.newevent.success){
            
            toast.success("New Event Added!!");
            this.props.history.push('/pages/myevents');
            this.props.eventreset();
        }
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
            this.props.newEvent({'storeName':this.props.userStore.store.name,'eventName':this.state.EventName,'eventImage':this.state.EventImg,'eventDateStart':this.state.EventDatestart,'eventDateFinish':this.state.EventDatefinish});      
            }
          }
      }
      handleimages=(e)=>{
        const file = e.target.files[0];
        

            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {  
                    this.setState({EventImg:reader.result});
                }
            }
            reader.readAsDataURL(file)
    
}
    render (){
        const {loading}=this.props.newevent
        return (
            <div>
                <Breadcrumb title={'Add event'}/>
                {loading ? <div style={{ textAlign: "center" }}><Loader
                             type="Rings"
                             color="#cc2121"
                             height={200}
                             width={300}
                /></div> :
                <section className="section-b-space">
                    <div className="container padding-cls">
                        <div className="checkout-page">
                            <div className="checkout-form" >
                                <form onSubmit={this.handlesubmit}>
                                    <div className="checkout row">
                                        <div className="col-lg-6 col-sm-12 col-xs-12" id="1">
                                            <div className="checkout-title">
                                                <h3>New Event Information</h3>
                                            </div>
                                            <div className="row check-out">
                                    <div className="form-group col-md-12 col-sm-12 col-xs-12">
                                        <div className="field-label">Event Name *</div>
                                        <input type="text" name="EventName" onChange={this.setStateFromInput} value={this.state.EventName} />
                                                    {this.validator.message('EventName', this.state.EventName, 'required')}
                                    </div>
                                    <div className="form-group col-md-12 col-sm-12 col-xs-12">
                                        <div className="field-label">Event Date Start *</div>
                                        <input type="date" name="EventDatestart" onChange={this.setStateFromInput} value={this.state.EventDatestart}   />
                                                    {this.validator.message('Event Start Date', this.state.EventDatestart, `required`)}
                                    </div>
                                    <div className="form-group col-md-12 col-sm-12 col-xs-12">
                                        <div className="field-label">Event Date Finish *</div>
                                        <input type="date" name="EventDatefinish" onChange={this.setStateFromInput} value={this.state.EventDatefinish}  />
                                                    {this.validator.message('Event Finsih Date', this.state.EventDatefinish, 'required')}
                                    </div>
                                    <div className="form-group col-md-12 col-sm-12 col-xs-12">
                                        <div className="field-label">Event Image *</div>
                                        <div className="field-label" style={{border: '1px solid #ccc',display: 'block', padding: '15px 20px', cursor: 'pointer', borderRadius: '3px', margin: '0.4em auto'}}>Maximum Image Dimensions :   <span><small>"1000 X 1000"</small></span></div>
                                                    <input id="img" type="file" name="EventImage" accept="image/*"  onChange={this.handleimages}  />
                                                    {this.validator.message('EventImage', this.state.EventImg, 'required')}
                                    </div>
                                    </div>  
                                        </div>
                </div><br></br>
                <div>
                    <button type="submit" className="btn btn-solid" style={{marginTop:"25px"}} >Submit event</button>
                </div>
                </form>
            </div>
            </div>
            </div>
            <div style={{textAlign:'center' , top:'50%'}}><Link to={`${process.env.PUBLIC_URL}/pages/myevents`} ><a><button type="submit" className="btn btn-solid" >Finish Adding events</button></a></Link></div>
            </section>
                }
            </div>
        )
    }
}

const mapStateToProps=state=>{
    return {
        newevent:state.newevent,
        userStore:state.userStore
      }
}

const mapDispatchToProps = dispatch => {
    return {
        newEvent: (eventData) => dispatch(newEvent(eventData)),
        eventreset:()=>dispatch({type:NEW_EVENT_RESET})
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Addevent)
