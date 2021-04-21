import React, {Component} from 'react';
import Breadcrumb from "../common/breadcrumb";
import SimpleReactValidator from 'simple-react-validator';
import {connect} from 'react-redux'
import { toast } from 'react-toastify';
import {Link} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { deleteEvent, updateEvent,getStoreEvents  } from '../../actions/eventActions';
class MyEvents extends Component {
    constructor(props){
    super(props);
    this.state = {
        isLoading:false,
        updatefield:null,
        updatevalue:null,
        eventid:null,
        inputtype:null,
        datestart:null,
        datefinish:null
    }
    this.validator=new SimpleReactValidator();
      }
      componentWillMount=()=>{
          //get store's id from state
        this.props.getStoreEvents("603a42db810c623de4f7dd04");
      }
      openSearch=(field,id,date="")=> {
        document.getElementById("update-overlay").style.display = "block";
        if(field=="name"){
            this.setState({inputtype:"text"});
        }
        else if(field=="datestart"||field=="datefinish"){
            this.setState({inputtype:"date"}); 
            this.setState({date:date}); 
        }
        this.setState({updatefield:field});
        this.setState({eventid:id});
    }
    closeSearch() {
        document.getElementById("update-overlay").style.display = "none";
    }
      handledelete=id=>{
        this.props.deleteEvent(id);
        toast.error("Event deleted !");
        setTimeout("location.reload(true);",2000);
    }

    handlesubmit=(e)=>{
        e.preventDefault(); 
          if(!this.validator.allValid()){
            this.validator.showMessages();
            this.forceUpdate();
          }
          else{
              if(this.state.updatefield=="name"){  
                this.props.updateEvent(this.state.eventid,{"eventName":this.state.updatevalue});
                toast.success("event name updated!!");
                setTimeout("location.reload(true);",2000);
              }
              else if(this.state.updatefield=="datestart"){
                if(this.state.updatevalue>this.state.date){
                    toast.warn("the event start date must lower then the event end date!!");                 
                }
                else{
                    this.props.updateEvent(this.state.eventid,{"eventDateStart":this.state.updatevalue});
                    toast.success("event start date updated!!");
                    setTimeout("location.reload(true);",2000);
                } 
              }
              else if(this.state.updatefield=="datefinish"){
                if(this.state.updatevalue<this.state.date){
                    toast.warn("the event end date must higher then the event start date!!");               
                }
                else{
                    this.props.updateEvent(this.state.eventid,{"eventDateFinish":this.state.updatevalue});
                    toast.success("event end date updated!!"); 
                    setTimeout("location.reload(true);",2000);
                }           
              }
          }
      }
    setStateFromInput = (event) => {
        var obj = {};
        obj[event.target.name] = event.target.value;
        this.setState(obj);
      }
    render (){
        var eventsarray = [];
        this.props.storeevents.events.map((ev)=>{
            eventsarray.push(ev);
        })
        return (
            <div>
                <Breadcrumb title={'My Events'}/>
                <section className="section-b-space">
                    <div className="container padding-cls">
                        <div className="checkout-page">
                            <div className="checkout-form" >
                                    <div className="checkout row">
                                    <div className="account-sidebar">
                                    <a className="popup-btn">
                                        My Profile
                                    </a>
                                </div>
                                <div className="dashboard-left">
                                    <div className="block-content">
                                        <ul>
                                        <Link to={`${process.env.PUBLIC_URL}/pages/myprofile`}><li><a>My Profile</a></li></Link>
                                        <Link to={`${process.env.PUBLIC_URL}/pages/mystore`}><li><a>My Store</a></li></Link>
                                        <Link to={`${process.env.PUBLIC_URL}/pages/myevents`}><li className="active"><a>My Events</a></li></Link>
                                        <Link to={`${process.env.PUBLIC_URL}/pages/myorders`}><li><a>My Orders</a></li></Link>
                                        <Link to={`${process.env.PUBLIC_URL}/cart`}><li><a>My Cart</a></li></Link>
                                        </ul>
                                    </div>
                                    <div className="block-content">
                                        <ul>
                                            <li><a href='./pages/addevent'>Add Event</a></li>
                                        </ul>
                                    </div>
                                </div>
                                        <div className="col-lg-6 col-sm-12 col-xs-12">
                                        <h5 style={{color:"#fe2b2a"}}>Click on the event's attribute to update it!</h5>
                                            {eventsarray.map((event,index)=>(
                                                <div>
                                                <h3 style={{color:"black"}}>Event {index+1}</h3>
                                                <div className="row check-out">
                                                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                    <div className="field-label">Event Name</div>
                                                    <div onClick={()=>this.openSearch("name",event._id)}>{event.eventName}</div>
                                                </div>
                                                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                    <div  className="field-label">Event Image</div>
                                                </div>
                                                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                    <div className="field-label">Event Date Start</div>
                                                    <div onClick={()=>this.openSearch("datestart",event._id,event.eventDateFinish.slice(0,10))} >{event.eventDateStart.slice(0,10)}</div>                                                </div>
                                                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                    <div className="field-label">Event Date Finish</div>
                                                    <div onClick={()=>this.openSearch("datefinish",event._id,event.eventDateStart.slice(0,10))}>{event.eventDateFinish.slice(0,10)}</div>
                                                </div>
                                                <div className="form-group col-md-12 col-sm-12 col-xs-12">
                                                <button type="submit" className="btn btn-solid" onClick={()=>this.handledelete(event._id)}>Delete Event</button>
                                                <hr></hr>
                                                </div>                                           
                                            </div>
                                            </div>
                                            ))} 
                                            <div id="update-overlay" className="search-overlay">
                                        <div>
                                        <span className="closebtn" onClick={this.closeSearch} title="Close Overlay">×</span>
                                                <div className="overlay-content">
                                                <div className="container">
                                                <div className="row">
                                                <div className="col-xl-12">
                                                <form>
                                                    <div className="form-group">
                                                    {this.state.inputtype=="text"?<input type="text" name="updatevalue" className="form-control" placeholder="Enter new value" onChange={this.setStateFromInput} value={this.state.updatevalue} />
                                                     :<input type="date" name="updatevalue" className="form-control" placeholder="Enter new value" onChange={this.setStateFromInput} value={this.state.updatevalue} /> }                                                    
                                                    {this.validator.message('new value', this.state.updatevalue, 'required')}
                                                    </div>
                                                <button type="submit" onClick={this.handlesubmit} style={{marginRight:"-35px"}} className="btn btn-primary"><i className="fa fa-check"></i></button>
                                                </form>
                                                </div>
                                                </div>
                                                </div>
                                                </div> 
                                        </div>
                                        </div>
                                        </div>
                </div>
                <div>
                </div>
            </div>
            </div>
            </div>
            </section>
            </div>
        )
    }
}

const mapStateToProps=state=>{
    return {
        storeevents:state.storeevents,
        updateevent:state.updateevent,
        deleteevent:state.deleteevent
      }
}
const mapDispatchToProps = dispatch => {
    return {
        getStoreEvents: (id) => dispatch(getStoreEvents(id)),
        updateEvent:(id,productdata)=>dispatch(updateEvent(id,productdata)),
        deleteEvent:(id)=>dispatch(deleteEvent(id))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(MyEvents)
