import React, { Fragment, useState, useEffect } from 'react'

import Breadcrumb from "../common/breadcrumb";
import {Helmet} from 'react-helmet'
import Sidebar from './sidebar_components/sidebar'
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux'
import { updateUser, getUserDetails, clearErrors } from '../../actions/index'
import { UPDATE_USER_RESET } from '../../constants/ActionTypes'

const UpdateUser = ({ match,history }) => {

    
    const [role, setRole] = useState('')

    
    const dispatch = useDispatch();

    const { error, isUpdated } = useSelector(state => state.user);
    const { user } = useSelector(state => state.userDetails)

    const userId = match.params.id;

    useEffect(() => {

        
        if (user && user._id !== userId) {
            dispatch(getUserDetails(userId))
        } else {
            
            setRole(user.role)
        }

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
            dispatch(clearErrors());
        }

        if (isUpdated) {
            toast.success('User updated successfully', {
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
                type: UPDATE_USER_RESET
            })
        }

    }, [dispatch, alert, error, history, isUpdated, userId, user])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        
        formData.set('role', role);

        dispatch(updateUser(user._id, formData))
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
                    <div className="row wrapper">
                        <div className="col-10 col-lg-5">
                            <form onSubmit={submitHandler}>
                                <h1 className="mt-2 mb-5">Update User</h1>

                                

                               

                                <div className="form-group">
                                    <label htmlFor="role_field"><b>Role</b></label><br></br>

                                    <select
                                        id="role_field"
                                        className="form-control"
                                        name='role'
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                    >
                                        <option value="User">user</option>
                                        <option value="Admin">admin</option>
                                        <option value="Seller">seller</option>
                                    </select>
                                </div>

                                <button type="submit" className="btn btn-solid" >Update</button>
                            </form><br></br>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    )
}

export default UpdateUser