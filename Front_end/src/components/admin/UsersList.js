import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'
import Breadcrumb from "../common/breadcrumb";
import {Helmet} from 'react-helmet'
import Sidebar from './sidebar_components/sidebar'
import Loader from "react-loader-spinner";
import { useDispatch, useSelector } from 'react-redux'
import { allUsers, updateAccountStatus, clearErrors } from '../../actions/index'
import { UPDATE_ACCOUNT_STATUS_RESET } from '../../constants/ActionTypes'
import { toast } from 'react-toastify';


const UsersList = ({ history }) => {
      
    const [active, setActive] = useState(true);
    const dispatch = useDispatch();

    const { loading, error, users } = useSelector(state => state.allUsers);
    const { isUpdated } = useSelector(state => state.userAccount)

    useEffect(() => {
        dispatch(allUsers());

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

        if (isUpdated) {
           
           
            toast.success('User status updated successfully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });

                history.push('/admin/users')

                dispatch({
                    type: UPDATE_ACCOUNT_STATUS_RESET
                })
            
        }

    }, [dispatch, alert, error, isUpdated, history])

    const updateAccountStatusHandler = (id, active) => {
        const formData = {id: id, active: active}
        
        
        

        dispatch(updateAccountStatus(formData))
        console.log(formData)
    }

    const setUsers = () => {
        const data = {
            columns: [
                {
                    label: 'User ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'First name',
                    field: 'firstname',
                    sort: 'asc'
                },
                {
                    label: 'Last name',
                    field: 'lastname',
                    sort: 'asc'
                },
                {
                    label: 'Email',
                    field: 'email',
                    sort: 'asc'
                },
                {
                    label: 'Role',
                    field: 'role',
                    sort: 'asc'
                },
                {
                    label: 'Active',
                    field: 'active',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }
      if(users) {
        users.forEach(user => {
            data.rows.push({
                id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                role: user.role,
                active: user.active?'yes':'no',

                actions: <Fragment>
                    <Link to={`/admin/user/${user._id}`} className="btn btn-primary py-1 px-2" style={{borderRadius:'4px'}}>
                        <i className="fa fa-pencil"></i>
                    </Link>
                    <button className="btn btn-danger py-1 px-2 ml-2" style={{borderRadius:'4px'}} onClick={() => updateAccountStatusHandler(user._id, false)}>
                        <i className="fa fa-power-off"></i>
                    </button>
                    <button className="btn btn-success py-1 px-2 ml-2" style={{borderRadius:'4px'}} onClick={() => updateAccountStatusHandler(user._id, true)}>
                        <i className="fa fa-power-off"></i>
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
                        <h1 className="my-5">All Users</h1>

                        {loading ? <div style={{ textAlign: "center" }}><Loader
                             type="Rings"
                             color="#cc2121"
                             height={200}
                             width={300}
                /></div> : (
                            <MDBDataTable
                                data={setUsers()}
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

export default UsersList