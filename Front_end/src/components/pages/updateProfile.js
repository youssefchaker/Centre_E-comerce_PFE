import React, { Fragment, useState, useEffect } from 'react'
import Breadcrumb from "../common/breadcrumb";
import { useDispatch, useSelector } from 'react-redux'
import { updateProfile, loadUser, clearErrors } from '../../actions/index'
import { UPDATE_PROFILE_RESET } from '../../constants/ActionTypes'
import { toast } from 'react-toastify';
import Loader from "react-loader-spinner";

const UpdateProfile = ({ history }) => {

    const [firstname, setFirstName] = useState('')
    const [lastname, setLastName] = useState('')
    const [email, setEmail] = useState('')


    const dispatch = useDispatch();

    const { user } = useSelector(state => state.auth);
    const { error, isUpdated, loading } = useSelector(state => state.user)



    useEffect(() => {

        if (user) {
            setFirstName(user.firstname);
            setLastName(user.lastname);
            setEmail(user.email);
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
                });            dispatch(clearErrors());
        }

        if (isUpdated) {
            toast.success('✅  User updated successfully !', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });            
                dispatch(loadUser());

            history.push('/pages/myprofile')

            dispatch({
                type: UPDATE_PROFILE_RESET
            })
        }

    }, [dispatch, alert, error, history, isUpdated])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('firstname', firstname);
        formData.set('lastname', lastname);
        formData.set('email', email);

       
        dispatch(updateProfile(formData))
    }

    return (
        <Fragment>
           <Breadcrumb title={'Edit profile'}/>
                
                
                {/*edit section*/}
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
                                <h3>Edit Profile</h3>
                                <div className="theme-card">
                                    <form className="theme-form"  onSubmit={submitHandler}>
                                        <div className="form-row">
                                            <div className="col-md-6">
                                                <label htmlFor="firstname">First Name</label>
                                                <input type="text" className="form-control" name="firstname"  value={firstname}  onChange={(e) => setFirstName(e.target.value)}
                                                       placeholder={firstname}  />

                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="lastname">Last Name</label>
                                                <input type="text" className="form-control" name="lastname" value={lastname}  onChange={(e) => setLastName(e.target.value)}
                                                       placeholder={lastname}/>
                                            </div>
                                        </div>
                                        <hr></hr>
                                        <div className="form-row">
                                            <div className="col-md-6">
                                                <label htmlFor="email">email</label>
                                                <input type="email" className="form-control" name="email" value={email}  onChange={(e) => setEmail(e.target.value)}
                                                       placeholder={email}/>
                                            </div>
                                            
                                        </div>
                                        <hr></hr>
                                        <div className="form-row">
                                            <div className="col-md-6">
                                            <button type="submit"  className="btn btn-solid" disabled={loading ? true : false}>Edit Profile</button>
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

export default UpdateProfile