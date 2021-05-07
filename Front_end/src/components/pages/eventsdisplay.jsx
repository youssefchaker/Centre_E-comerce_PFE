import React, {Component} from 'react';
import Breadcrumb from "../common/breadcrumb";
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import { getEvents } from '../../actions/eventActions';
import Loader from "react-loader-spinner";
class Eventsdisplay extends Component {

    componentWillMount=()=>{
        this.props.getEvents();
      }

    render (){
       const {events,loading}=this.props.events
        return (
            <div>
                <Breadcrumb title={'Events '}/>
                
                <section className="section-b-space  blog-page">
                    <div className="container">
                        <div className="row">

                            <div className="col-xl-9 col-lg-8 col-md-7 ">
                            {loading ? <div style={{ textAlign: "center" }}><Loader
                             type="Rings"
                             color="#cc2121"
                             height={200}
                             width={300}
                /></div> :events.events.length!==0?events.events.map((event,index)=>(
                                <Link to={`${process.env.PUBLIC_URL}/store/${event.store}`} key={index} ><div className="row blog-media">
                                    <div className="col-xl-6">
                                    
                                        <div className="blog-left">
                                                <img src={event.eventImage.url} className="img-fluid" alt="event banner" style={{width:'210px',height:'200px'}}/>
                                                
                                        </div>
                                        <br></br>
                                    </div>
                                    <div className="col-xl-6">
                                        <div className="blog-right">
                                            <div>
                                                <h4>{event.eventName}</h4>
                                                <h6>Active from {event.eventDateStart.slice(0,10)} To {event.eventDateFinish.slice(0,10)} </h6>
                                                <h5>Event By {events.storenames[index]} </h5>
                                            </div>
                                        </div>
                                        <hr></hr>
                                    </div>
                                    
                                </div>
                                </Link>
                                
                            )):<h3>There are no events at the moment!</h3>}
                                
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
        events:state.events,
      }
}
const mapDispatchToProps = dispatch => {
    return {
        getEvents:()=>dispatch(getEvents()),
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (Eventsdisplay)