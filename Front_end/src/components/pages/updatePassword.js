import React, { Fragment, useState, useEffect } from 'react'
import Breadcrumb from "../common/breadcrumb";
import { useDispatch, useSelector } from 'react-redux'
import { updatePassword, clearErrors } from '../../actions/index'
import { UPDATE_PASSWORD_RESET } from '../../constants/ActionTypes'
import { toast } from 'react-toastify';
import Loader from "react-loader-spinner";

const UpdatePassword = ({ history }) => {

    const [oldPassword, setOldPassword] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch();

    const { error, isUpdated, loading } = useSelector(state => state.user)

    useEffect(() => {

        if (error) {
            toast.error(error  , {
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
            toast.success('✅ Password updated successfully !', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });           

            history.push('/pages/myprofile')

            dispatch({
                type: UPDATE_PASSWORD_RESET
            })
        }

    }, [dispatch, alert, error, history, isUpdated])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('oldPassword', oldPassword);
        formData.set('password', password);

        dispatch(updatePassword(formData))
    }

    return (
        <Fragment>
             <Breadcrumb title={'Update password'}/>

                <section className="register-page section-b-space">
                {loading ? <div style={{ textAlign: "center" }}><Loader
                             type="Rings"
                             color="#cc2121"
                             height={200}
                             width={300}
                /></div> :
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <h3>Update Password</h3>
                                <div className="theme-card">
                                    <form className="theme-form"  onSubmit={submitHandler}>
                                        <div className="form-row">
                                            <div className="col-md-6">
                                                <label htmlFor="password">old password</label>
                                                <input type="password" className="form-control" name="oldPassword"  value={oldPassword} onChange={(e) => setOldPassword(e.target.value)}
                                                         />

                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="password">new password</label>
                                                <input type="password" className="form-control" name="password"  value={password}  onChange={(e) => setPassword(e.target.value)}
                                                      />
                                            </div>
                                        </div>
                                        
                                        <hr></hr>
                                        <div className="form-row">
                                            <div className="col-md-6">
                                            <button type="submit"  className="btn btn-solid" disabled={loading ? true : false}>Update Password</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                </section>






       </Fragment>
    )
}

export default UpdatePassword