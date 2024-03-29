import React, { Component } from 'react';
import Slider from 'react-slick';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'
import {Slider3} from "../../../services/script"
import { getEventsLimited } from '../../../actions/eventActions';
import Loader from "react-loader-spinner";
class EventSection extends Component {

    componentWillMount=()=>{
        this.props.getEventsLimited();
      }
    render (){
        const {events,loading}=this.props.limitedevents;

        return (
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <Slider {...Slider3} className="slide-3 no-arrow ">
                            {loading ? <div style={{ textAlign: "center" }}><Loader
                             type="Rings"
                             color="#cc2121"
                             height={200}
                             width={300}
                /></div> :events.events.length!==0?events.events.map((event,index)=>(
                                <div key={index}>
                                    <div className="col-md-12">
                                        <Link to={`${process.env.PUBLIC_URL}/store/${event.store}`}>
                                            <div className="classic-effect">
                                                <img src={event.eventImage.url} style={{width:'500px',height:'370px',borderRadius:'2px'}} className="img-fluid" alt="event banner" />
                                                    <span></span>
                                            </div>
                                        </Link>
                                        <div className="blog-details">
                                            <h4>{event.eventDateStart.slice(0,10)}</h4>
                                            <p>{event.eventName} by {this.props.limitedevents.events.storenames[index]} ends in {event.eventDateFinish.slice(0,10)} </p>
                                            <hr className="style1" />
                                            <Link to={`/pages/eventsdisplay`} style={{textDecorationLine:'underline'}} >
                                                <h6>Check All Events</h6></Link>
                                        </div>
                                    </div>
                                </div>

                            )):<h3>There are no events at the moment !</h3>}
                                
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
