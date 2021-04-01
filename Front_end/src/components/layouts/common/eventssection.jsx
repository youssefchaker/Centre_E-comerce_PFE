import React, { Component } from 'react';
import Slider from 'react-slick';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'
import {Slider3} from "../../../services/script"
import { getEventsLimited } from '../../../actions/eventActions';

class EventSection extends Component {
    constructor(props){
        super(props);
    }
    componentWillMount=()=>{
        this.props.getEventsLimited();
      }
    render (){
        var eventsarray = [];
        this.props.limitedevents.events.events.map((ev)=>{
            eventsarray.push(ev);
        })
        return (
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <Slider {...Slider3} className="slide-3 no-arrow ">
                            {eventsarray.map((event,index)=>(
                                <div>
                                    <div className="col-md-12">
                                        <Link to={`${process.env.PUBLIC_URL}/left-sidebar/collection/${event.store}`}>
                                            <div className="classic-effect">
                                                <img src={event.eventImage} className="img-fluid" alt="event image" />
                                                    <span></span>
                                            </div>
                                        </Link>
                                        <div className="blog-details">
                                            <h3>{event.eventName}</h3>
                                            <h4>Event Start Date</h4>
                                            <p>{event.eventDateStart.slice(0,10)}</p>
                                            <h4>Event End Date</h4>
                                            <p>{event.eventDateFinish.slice(0,10)}</p>
                                            <h4>Event By</h4>
                                            <p>{this.props.limitedevents.events.storenames[index]}</p>    
                                            <hr className="style1" />
                                            <Link to="../../../pages/eventsdisplay" style={{textDecorationLine:'underline'}} ><h6>Check all events</h6></Link>
                                        </div>
                                    </div>
                                </div>

                            ))}
                                
                            </Slider>
                        </div>
                    </div>
                </div>
        )
    }
}

const mapStateToProps=state=>{
    return {
        limitedevents:state.limitedevents
      }
}
const mapDispatchToProps = dispatch => {
    return {
        getEventsLimited:()=>dispatch(getEventsLimited())
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (EventSection);