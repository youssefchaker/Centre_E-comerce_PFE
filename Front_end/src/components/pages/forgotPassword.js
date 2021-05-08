import React, { Fragment, useState, useEffect } from 'react';
import Breadcrumb from "../common/breadcrumb";
import { useDispatch, useSelector } from 'react-redux'
import { forgotPassword, clearErrors, clearResponse } from '../../actions/index'
import { RESET } from '../../constants/ActionTypes'
import { toast } from 'react-toastify';




const ForgotPassword = () => {

    const [email, setEmail] = useState('')

    const dispatch = useDispatch();

    const { error, loading, message } = useSelector(state => state.forgotPassword)

    useEffect(() => {
         

        dispatch({type: RESET});

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

        if (message) {
            toast.success(message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                }); 
             dispatch(clearResponse());
             

        }

    }, [dispatch, alert, error, message])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('email', email);

        dispatch(forgotPassword(formData))
    }

    



        return (
            <Fragment>
                <Breadcrumb title={'forget password'}/>
                
                
                {/*Forget Password section*/}
                <section className="pwd-page section-b-space">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 offset-lg-3">
                                <h2>Forget Your Password</h2>
                                <form className="theme-form" onSubmit={submitHandler}>
                                    <div className="form-row">
                                        <div className="col-md-12">
                                            <input type="email" className="form-control" id="email"
                                                   placeholder="Enter Your Email" required="please enter a valid email" value={email}
                                                   onChange={(e) => setEmail(e.target.value)}/>
                                        </div>
                                        <button type='submit' className="btn btn-solid" disabled={loading ? true : false}>Send Email </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>

          </Fragment>
        )
    
}

export default ForgotPassword