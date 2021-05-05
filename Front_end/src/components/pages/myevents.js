import React, {Fragment,Component} from 'react';
import Breadcrumb from "../common/breadcrumb";
import SimpleReactValidator from 'simple-react-validator';
import {connect} from 'react-redux'
import { toast } from 'react-toastify';
import {Link} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { deleteEvent, updateEvent,getStoreEvents  } from '../../actions/eventActions';
import Loader from "react-loader-spinner";
import { MDBDataTable } from 'mdbreact'
import { DELETE_EVENT_RESET, UPDATE_EVENT_RESET } from '../../constants/eventConstants';
class MyEvents extends Component {
    constructor(props){
    super(props);
    this.state = {
        isLoading:false,
        updatefield:null,
        updatevalue:null,
        updatevaluetext:null,
        updatevalueimage:null,
        updatevaluedate:null,
        eventid:null,
        inputtype:null,
        datestart:null,
        datefinish:null,
        EventImg:null
    }
    this.validator=new SimpleReactValidator();
      }
      componentWillMount=()=>{
        this.props.getStoreEvents(this.props.userStore.store._id);
      }
      componentDidUpdate(){
        if(this.props.updateevent.isUpdated){
            
            toast.success("Event has been updated!!");
            this.props.history.push('/pages/mystore');
            this.props.updatereset();
        }
        if(this.props.deleteevent.isDeleted){
            toast.error("Event has been deleted!!");
            this.props.history.push('/pages/mystore');
            this.props.deleteproductreset();
        }
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
        else if(field=="image"){
            this.setState({inputtype:"image"}); 
        }
        this.setState({updatefield:field});
        this.setState({eventid:id});
    }
    closeSearch() {
        document.getElementById("update-overlay").style.display = "none";
    }
      handledelete=id=>{
        this.props.deleteEvent(id);
    }

    handlesubmit=(e)=>{
        e.preventDefault(); 
          if(!this.validator.allValid() && this.state.updatevaluetext==null && this.state.updatevaluedate==null && this.state.updatevalueimage==null ){
            this.validator.showMessages();
            this.forceUpdate();
          }
          else{
              if(this.state.updatefield=="name"){  
                this.props.updateEvent(this.state.eventid,{"eventName":this.state.updatevaluetext});
              }
              else if(this.state.updatefield=="datestart"){
                if(this.state.updatevaluedate>this.state.date){
                    toast.warn("the event start date must before the event end date!!");                 
                }
                else{
                    this.props.updateEvent(this.state.eventid,{"eventDateStart":this.state.updatevaluedate});
                } 
              }
              else if(this.state.updatefield=="datefinish"){
                if(this.state.updatevaluedate<this.state.date){
                    toast.warn("the event end date must be after the event start date!!");               
                }
                else{
                    this.props.updateEvent(this.state.eventid,{"eventDateFinish":this.state.updatevaluedate});
                }           
              }
              else if(this.state.updatefield=="image"){ 
                this.props.updateEvent(this.state.eventid,{"eventImage":this.state.EventImg});
              }
          }
      }
    setStateFromInput = (event) => {
        var obj = {};
        obj[event.target.name] = event.target.value;
        this.setState(obj);
      }
      handleimages=(e)=>{
        var obj = {};
        obj[e.target.name] = e.target.value;
        this.setState(obj);
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
        const {events,loading,error}=this.props.storeevents;
        const loadingdel=this.props.deleteevent.loading
        const loadingup=this.props.updateevent.loading
        const setEvents = () => {
        const data = {
            columns: [
                {
                    label: 'Image',
                    field: 'eventImage',
                    sort: 'asc'
                },
                {
                    label: 'Event Name',
                    field: 'eventName',
                    sort: 'asc'
                },
                {
                    label: 'Event Start Date',
                    field: 'eventDateStart',
                    sort: 'asc'
                },
                {
                    label: 'Event Finish Date',
                    field: 'eventDateFinish',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }
        if (events) {
            events.forEach(event => {
                data.rows.push({
                    eventImage:<img className="update"  onClick={()=>this.openSearch("image",event._id)} src={event.eventImage.url} alt="event image" style={{width:'80px',height:'80px'}}></img>,
                    eventName: <div className="update" onClick={()=>this.openSearch("name",event._id)}>{event.eventName}</div>,
                    eventDateStart: <div className="update" onClick={()=>this.openSearch("datestart",event._id,event.eventDateFinish.slice(0,10))} >{event.eventDateStart.slice(0,10)}</div>,
                    eventDateFinish: <div className="update" onClick={()=>this.openSearch("datefinish",event._id,event.eventDateStart.slice(0,10))}>{event.eventDateFinish.slice(0,10)}</div>,
                    actions: <Fragment>
                        <button className="btn btn-danger py-1 px-2 ml-2" style={{borderRadius:'4px'}} onClick={()=>this.handledelete(event._id)}  >
                            <i className="fa fa-trash"></i>
                        </button>
                    </Fragment>
                })
            })
        }
        return data;
    }
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
                                        <Link to={`${process.env.PUBLIC_URL}/orders/me`}><li><a>My Orders</a></li></Link>
                                        <Link to={`${process.env.PUBLIC_URL}/cart`}><li><a>My Cart</a></li></Link>
                                        </ul>
                                    </div>
                                    <div className="block-content">
                                        <ul>
                                            <li><a href='./pages/addevent'>Add Event</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <Fragment>
                {error==null?
                    <div className="col-10 col-md-10">
                    <Fragment>

                        {loading||loadingdel ? <div style={{ textAlign: "center" }}><Loader
                             type="Rings"
                             color="#cc2121"
                             height={200}
                             width={300}
                /></div> : (
                            <MDBDataTable
                                data={setEvents()}
                                className="px-3"
                                bordered
                                striped
                                hover
                            />
                        )}

                    </Fragment>
                </div>:<h3>{error+"!!"}</h3>}
        </Fragment>
                                <div className="col-lg-10 col-sm-12 col-xs-12">
                                
                                            <div id="update-overlay" className="search-overlay">
                                        <div>
                                        <span className="closebtn" onClick={this.closeSearch} title="Close Overlay">×</span>
                                                <div className="overlay-content">
                                                <div className="container">
                                                <div className="row">
                                                <div className="col-xl-12">
                                                {loadingup ? <div style={{ textAlign: "center" }}><Loader
                             type="Rings"
                             color="#cc2121"
                             height={200}
                             width={300}
                /></div> :
                                                <form>
                                                    <div className="form-group">
                                                    {this.state.inputtype=="text"?<input type="text" name="updatevaluetext" className="form-control" placeholder="Enter new value" onChange={this.setStateFromInput} value={this.state.updatevaluetext} />
                                                     :this.state.inputtype=="date"?<input type="date" name="updatevaluedate" className="form-control" placeholder="Enter new value" onChange={this.setStateFromInput} value={this.state.updatevaluedate} />
                                                     :<input id="img" onChange={this.handleimages} type="file" name="updatevalueimage" accept="image/*" value={this.state.updatevalueimage} />}                                                    
                                                    {this.state.inputtype=="text"?this.validator.message('new event name', this.state.updatevaluetext, 'required'):this.state.inputtype=="date"?this.validator.message('new event date', this.state.updatevaluedate, 'required'):this.validator.message('new event image', this.state.updatevalueimage, 'required')}
                                                    </div>
                                                <button type="submit" onClick={this.handlesubmit} style={{marginRight:"-35px"}} className="btn btn-primary"><i className="fa fa-check"></i></button>
                                                </form>}
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
        deleteevent:state.deleteevent,
        userStore:state.userStore,
        symbol:state.symbol,
        currencydiff:state.currencydiff
      }
}
const mapDispatchToProps = dispatch => {
    return {
        getStoreEvents: (id) => dispatch(getStoreEvents(id)),
        updateEvent:(id,productdata)=>dispatch(updateEvent(id,productdata)),
        deleteEvent:(id)=>dispatch(deleteEvent(id)),
        updatereset:()=>dispatch({type:UPDATE_EVENT_RESET}),
        deleteproductreset:()=>dispatch({type:DELETE_EVENT_RESET})
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(MyEvents)
