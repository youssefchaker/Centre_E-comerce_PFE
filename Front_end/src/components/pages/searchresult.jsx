import React, {Component} from 'react';
import Breadcrumb from "../common/breadcrumb";
import {Link} from 'react-router-dom';
class Searchresult extends Component {
    constructor(props) {
        super(props);
    }
        render(){
        return (
            <div>
                <Breadcrumb title={'Events display'}/>
                
                <section className="section-b-space  blog-page">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-9 col-lg-8 col-md-7 ">
                            {this.props.products.products.map((product,index)=>(
                                <div className="row blog-media" key={index}>
                                    <div className="col-xl-6">
                                    
                                        <div className="blog-left">
                                            <Link to={`${process.env.PUBLIC_URL}/blog/details`} >
                                                <img src={product.images[0]} className="img-fluid" alt="event image" /></Link>
                                        </div>
                                    </div>
                                    <div className="col-xl-6">
                                        <div className="blog-right">
                                            <div>
                                                <h4>{product.name}</h4>
                                                <h6>{product.description} </h6>
                                                <h6>Price:{product.price} </h6>
                                                <Link to={`${process.env.PUBLIC_URL}/blog/details`} ><h5>Event By {product.store} </h5></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                                
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        )
    }
}


export default Searchresult