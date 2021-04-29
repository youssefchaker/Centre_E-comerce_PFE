import React, {Fragment, useState, useEffect, useRef } from 'react'
import { Link} from 'react-router-dom';
import Breadcrumb from "../common/breadcrumb";
import Loader from "react-loader-spinner";
import { toast } from 'react-toastify';
import SimpleReactValidator from 'simple-react-validator';
import { useDispatch, useSelector } from 'react-redux'
import { login, clearErrors } from '../../actions/index';

const Login = ({history}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [, forceUpdate] = useState()


    const dispatch = useDispatch();

    const { isAuthenticated, error, loading, user } = useSelector(state => state.auth);
    
    //const redirect = location.search ? location.search.split('=')[1] : '/'

    const simpleValidator = useRef(new SimpleReactValidator({autoForceUpdate: {forceUpdate: forceUpdate}}));

    useEffect(() => {

        if (isAuthenticated) {
           history.push(`/`)

           sessionStorage.setItem('role', JSON.stringify(user.role))
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
        const formValid = simpleValidator.current.allValid()
        if (!formValid) {
          simpleValidator.current.showMessages()
        }
        dispatch(login(email, password))
    }


    
    
    
        return (
            
        <Fragment>
                {loading ? <div style={{ textAlign: "center" }}><Loader
        type="Rings"
        color="#cc2121"
        height={200}
        width={300}
      /></div>  : (
                <Fragment>
                <Breadcrumb title={'Login'}/>  
                {/*Login section*/}
                <section className="login-page section-b-space">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6">
                                <h3>Login</h3>
                                <div className="theme-card">
                                    <form className="theme-form" onSubmit={submitHandler}>
                                        <div className="form-group">
                                            <label htmlFor="email">Email</label>
                                            <input type="email" className="form-control" name="email" placeholder="Enter Your Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                                            {simpleValidator.current.message('email', email, 'required|email')}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="review">Password</label>
                                            <input type="password" className="form-control" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password"/>
                                            {simpleValidator.current.message('password', password, 'required')}
                                        </div>
                                        
                                        <button type="submit" /*onClick={handlesubmit}*/ className="btn btn-solid" style={{marginRight:'100px'}}>Login</button>
                                        <Link to="/password/forgot"><a className="btn btn-solid">Forget Password?</a></Link>
                                    </form>
                                </div>
                            </div>
                            <div className="col-lg-6 right-login">
                                <h3>New Customer</h3>
                                <div className="theme-card authentication-right">
                                    <h6 className="title-font">Create A Account</h6>
                                    <p>Sign up for a free account at our store. Registration is quick and easy. It
                                        allows you to be able to order from our shop. To start shopping click
                                        register.</p>
                                    <a href={`${process.env.PUBLIC_URL}/pages/register`} className="btn btn-solid">Create an Account</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                </Fragment>
            )}
        </Fragment>           
        )
    }


export default Login