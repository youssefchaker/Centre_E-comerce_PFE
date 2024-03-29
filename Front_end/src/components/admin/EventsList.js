import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'
import Breadcrumb from "../common/breadcrumb";
import {Helmet} from 'react-helmet'
import Sidebar from './sidebar_components/sidebar'
import Loader from "react-loader-spinner";
import { useDispatch, useSelector } from 'react-redux'
import { getAdminEvents, deleteAdminEvent, clearErrors } from '../../actions/eventActions'
import { DELETE_ADMIN_EVENT_RESET} from '../../constants/eventConstants'
import { toast } from 'react-toastify';


const EventsList = ({ history }) => {

    const dispatch = useDispatch();

    const { loading, error, events } = useSelector(state => state.adminEvents);
    const { error: deleteError, isDeleted } = useSelector(state => state.deleteAdminEvent)


    useEffect(() => {
        dispatch(getAdminEvents());

        if (error) {
            toast.error(error, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            dispatch(clearErrors())
        }

        if (isDeleted) {
            toast.success('Event deleted successfully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            history.push('/admin/events');
            dispatch({ type: DELETE_ADMIN_EVENT_RESET })
        }

    }, [dispatch, alert, error, isDeleted, history])

    const deleteEventHandler = (id) => {
        dispatch(deleteAdminEvent(id))
    }

    const setEvents = () => {
        const data = {
            columns: [
                {
                    label: 'Image',
                    field: 'eventImage',
                    sort: 'asc'
                },
                {
                    label: 'Store',
                    field: 'store',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'eventName',
                    sort: 'asc'
                },
                {
                    label: 'Start Date',
                    field: 'eventDateStart',
                    sort: 'asc'
                },
                {
                    label: 'Finish Date',
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
            
            events.events.forEach((event,index) => {
            data.rows.push({
                eventImage:<img src = {event.eventImage.url} style = {{width:'80px',height:'80px'}}></img>,
                store: events.storenames[index],
                eventName: event.eventName,
                eventDateStart:event.eventDateStart.slice(0,10),
                eventDateFinish:event.eventDateFinish.slice(0,10),
                actions: <Fragment>
                    <button className="btn btn-danger py-1 px-2 ml-2" style={{borderRadius:'4px'}}  onClick={() => deleteEventHandler(event._id)}>
                        <i className="fa fa-trash"></i>
                    </button>
                </Fragment>
            })
        })
    }
        return data;
    }


    return (
        <Fragment>
            {/*SEO Support*/}
            <Helmet>
                <title>Mall</title>
                <meta name="description" content=" online mall." />
            </Helmet>
            {/*SEO Support End */}

            <Breadcrumb  title={'Dashboard'}/>
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-5">All Events</h1>

                        {loading ? <div style={{ textAlign: "center" }}><Loader
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
                </div>
            </div>

        </Fragment>
    )
}

export default EventsList