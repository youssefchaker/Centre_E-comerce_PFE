import React, {Component} from 'react';
import Breadcrumb from "../common/breadcrumb";
import {Link} from 'react-router-dom';

class Eventsdisplay extends Component {

    constructor (props) {
        super (props)
    }

    render (){


        return (
            <div>
                <Breadcrumb title={'Events display'}/>
                
                <section className="section-b-space  blog-page">
                    <div className="container">
                        <div className="row">

                            <div className="col-xl-9 col-lg-8 col-md-7 ">
                                <div className="row blog-media">
                                    <div className="col-xl-6">
                                        <div className="blog-left">
                                            <Link to={`${process.env.PUBLIC_URL}/blog/details`} >
                                                <img src={`${process.env.PUBLIC_URL}/assets/images/blog/1.jpg`} className="img-fluid" alt=""/>{/*Event picture */}</Link>
                                        </div>
                                    </div>
                                    <div className="col-xl-6">
                                        <div className="blog-right">
                                            <div>
                                                <h5>{/*event name */}a</h5>
                                                <h6>{/*Event Date*/}a</h6>
                                                <Link to={`${process.env.PUBLIC_URL}/blog/details`} ><h4></h4></Link>
                                                <ul className="post-social">
                                                    <li>Posted By :a {/*store name */}</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        )
    }
}

export default Eventsdisplay