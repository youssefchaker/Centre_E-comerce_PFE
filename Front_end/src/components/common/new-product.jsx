import React, {Component} from 'react';
import Slider from 'react-slick';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'

import {getBestSeller} from "../../services";
import { getNewProducts } from '../../actions/productActions';


class NewProduct extends Component {
    componentWillMount(){
        this.props.getNewProducts();
    }

    render (){
        const {newproducts} = this.props;
        const products=newproducts.products.products;
        return (
            <div className="theme-card">
                <h5 className="title-border">new product</h5>
                <Slider className="offer-slider slide-1">
                    {products.map((product, index) =>
                        <div key={index}>
                                <div className="media" key={index}>
                                    <Link to={`${process.env.PUBLIC_URL}/left-sidebar/product/${product._id}`}><img className="img-fluid" src={`${product.images[0]}`} alt="" /></Link>
                                    <div className="media-body align-self-center">
                                        <div className="rating">
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                        </div>
                                        <Link to={`${process.env.PUBLIC_URL}/left-sidebar/product/${product._id}`} onClick={this.forceUpdate}><h6>{product.name}</h6></Link>
                                        {(product.discount != 0)?
                            <h4>€{product.price-(product.price*product.discount/100)}
                                 <del><span className="money">€{product.price}</span></del> 
                            </h4>:<h4>€{product.price}</h4>}
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
const mapDispatchToProps = dispatch => {
    return {
        getNewProducts:()=>dispatch(getNewProducts())

    }
}
export default connect(mapStateToProps,mapDispatchToProps)(NewProduct);
