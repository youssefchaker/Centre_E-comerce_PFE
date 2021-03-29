import React, {Component} from 'react';
import Slider from 'react-slick';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'

import {getBestSeller} from "../../services";


class NewProduct extends Component {
    render (){
        const {newproducts} = this.props;
        var products=newproducts.products;
        var newproductsarray = [];
        const product1=products.product1;
        const product2=products.product2;
        const product3=products.product3;
        const product4=products.product4;
        const product5=products.product5;
        newproductsarray.push(product1);
        newproductsarray.push(product2);
        newproductsarray.push(product3);
        newproductsarray.push(product4);
        newproductsarray.push(product5);
        return (
            <div className="theme-card">
                <h5 className="title-border">new product</h5>
                <Slider className="offer-slider slide-1">
                    {newproductsarray.map((product, index) =>
                        <div key={index}>
                                <div className="media" key={index}>
                                    <Link to={`${process.env.PUBLIC_URL}/left-sidebar/product/${product.id}`}><img className="img-fluid" src={`${product.images[0]}`} alt="" /></Link>
                                    <div className="media-body align-self-center">
                                        <div className="rating">
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                        </div>
                                        <Link to={`${process.env.PUBLIC_URL}/left-sidebar/product/${product.id}`}><h6>{product.name}</h6></Link>
                                        <h4>{"€"}{(product.price)}</h4>
                                            {/* <del><span className="money">{"€"}{product.price}</span></del> */}
                                    </div>
                                </div>
                        </div>
                    )}
                </Slider>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        newproducts:state.newproducts
    }
}

export default connect(mapStateToProps, null)(NewProduct);
