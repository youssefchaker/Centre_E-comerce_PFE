import React, { Fragment, useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { resetPassword, clearErrors } from '../../actions/index'
import { toast } from 'react-toastify';
import Breadcrumb from "../common/breadcrumb";



const NewPassword = ({ history, match }) => {

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const dispatch = useDispatch();

    const { error, success } = useSelector(state => state.forgotPassword)

    useEffect(() => {

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

        if (success) {
            toast.success('✅  Password updated successfully !', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            history.push('/pages/login')
        }

    }, [dispatch, , error, success, history])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('password', password);
        formData.set('confirmPassword', confirmPassword);

        dispatch(resetPassword(match.params.token, formData))
    }

    return (
        <Fragment>
           <Breadcrumb title={'New password Reset'}/>
                
                
                {/*edit section*/}
                <section className="register-page section-b-space">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <h3>New Password</h3>
                                <div className="theme-card">
                                    <form className="theme-form"  onSubmit={submitHandler}>
                                        <div className="form-row">
                                            <div className="col-md-6">
                                                <label htmlFor="password"> Password</label>
                                                <input type="password" className="form-control"   value={password} onChange={(e) => setPassword(e.target.value)}
                                                         />

                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="password">Confirm password</label>
                                                <input type="password" className="form-control"  value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                                                      />
                                            </div>
                                        </div>
                                        
                                        <hr></hr>
                                        <div className="form-row">
                                            <div className="col-md-6">
                                            <button type="submit"  className="btn btn-solid" >Set Password</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>












           
        </Fragment>
    )
}

export default NewPassword