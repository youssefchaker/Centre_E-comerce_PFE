import React, { Fragment, useState, useEffect, useRef } from 'react'
import SimpleReactValidator from 'simple-react-validator';
import Breadcrumb from "../common/breadcrumb";
import { Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { register, clearErrors } from '../../actions/index'
import { toast } from 'react-toastify';


const Register = ({ history }) => {

    const [user, setUser] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
    })
    const [, forceUpdate] = useState()

    const { firstname, lastname, email, password } = user;


    const dispatch = useDispatch();

    const { isAuthenticated, error, loading } = useSelector(state => state.auth);
    
    //const redirect = location.search ? location.search.split('=')[1] : '/'

    const simpleValidator = useRef(new SimpleReactValidator({autoForceUpdate: {forceUpdate: forceUpdate}}));

    useEffect(() => {

        if (isAuthenticated) {
           history.push(`/`)
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

    }, [dispatch, alert, isAuthenticated, error, history ])

    const submitHandler = (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.set('firstname', firstname);
        formData.set('lastname', lastname);
        formData.set('email', email);
        formData.set('password', password);
        
        
        const formValid = simpleValidator.current.allValid()
        if (!formValid) {
          simpleValidator.current.showMessages()
        }
        dispatch(register(formData))
    }
    const onChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }


        return (
          <Fragment>
            <Breadcrumb title={'create account'}/>
                
                
                {/*Regsiter section*/}
                <section className="register-page section-b-space">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <h3>create account</h3>
                                <div className="theme-card">
                                    <form className="theme-form"  onSubmit={submitHandler}>
                                        <div className="form-row">
                                            <div className="col-md-6">
                                                <label htmlFor="firstname">First Name</label>
                                                <input type="text" className="form-control" name="firstname"  value={firstname}  onChange={onChange}
                                                       placeholder="First Name"  />
                                                {simpleValidator.current.message('firstname', firstname, 'required')}

                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="lastname">Last Name</label>
                                                <input type="text" className="form-control" name="lastname" value={lastname}  onChange={onChange}
                                                       placeholder="Last Name"/>
                                                {simpleValidator.current.message('lastname', lastname, 'required')}
                                            </div>
                                        </div>
                                        <hr></hr>
                                        <div className="form-row">
                                            <div className="col-md-6">
                                                <label htmlFor="email">email</label>
                                                <input type="email" className="form-control" name="email" value={email}  onChange={onChange}
                                                       placeholder="Email" />
                                                {simpleValidator.current.message('email', email, 'required|email')}
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="review">Password</label>
                                                <input type="password" id="password" className="form-control" name="password" value={password}  onChange={onChange}
                                                       placeholder="Enter your password" />
                                                {simpleValidator.current.message('password', password, 'required|min:8')}
                                            </div>
                                        </div>
                                        <hr></hr>
                                        <div className="form-row">
                                        <div className="col-md-6">
                                            <Link to="/pages/login">Already have an account?</Link>
                                            </div>
                                            <div className="col-md-6">
                                            <button type="submit"  className="btn btn-solid" disabled={loading ? true : false}>create Account</button>
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


export default Register