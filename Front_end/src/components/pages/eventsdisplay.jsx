import React, {Component} from 'react';
import Breadcrumb from "../common/breadcrumb";
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import { getEvents } from '../../actions/eventActions';
class Eventsdisplay extends Component {

    constructor (props) {
        super (props)
    }
    componentWillMount=()=>{
        this.props.getEvents();
      }

    render (){
        var eventsarray = [];
        this.props.events.events.events.map((ev)=>{
            eventsarray.push(ev);
        })
        return (
            <div>
                <Breadcrumb title={'Events '}/>
                
                <section className="section-b-space  blog-page">
                    <div className="container">
                        <div className="row">

                            <div className="col-xl-9 col-lg-8 col-md-7 ">
                            {this.props.events.loading==false?eventsarray.map((event,index)=>(
                                <Link to={`${process.env.PUBLIC_URL}/store/${event.store}`} ><div className="row blog-media">
                                    <div className="col-xl-6">
                                    
                                        <div className="blog-left">
                                            <Link to={`${process.env.PUBLIC_URL}/store/${event.store}`} >
                                                <img src={event.eventImage.url} className="img-fluid" alt="event image" style={{width:'210px',height:'200px'}}/></Link>
                                                
                                        </div>
                                    </div>
                                    <div className="col-xl-6">
                                        <div className="blog-right">
                                            <div>
                                                <h4>{event.eventName}</h4>
                                                <h6>Active from {event.eventDateStart.slice(0,10)} To {event.eventDateFinish.slice(0,10)} </h6>
                                                <Link to={`${process.env.PUBLIC_URL}/store/${event.store}`} ><h5>Event By {this.props.events.events.storenames[index]} </h5></Link>
                                            </div>
                                        </div>
                                        <hr></hr>
                                    </div>
                                    
                                </div>
                                </Link>
                                
                            )):'There are no events at the moment!!'}
                                
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