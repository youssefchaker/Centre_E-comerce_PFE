import React, {Component} from 'react';
import Slider from 'react-slick';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'

import {getRelatedItems} from "../../services";
import { getProducts } from '../../actions/productActions';


class RelatedProduct extends Component {
    constructor(props){
        super(props)
    }
    componentWillMount(){
        this.props.getProducts();
    }

    render (){
        const {relatedproducts} = this.props;
        const {symbol}=this.props.symbol;
        const currencydiff=this.props.currencydiff;
        return (
            <div className="theme-card">
                <h5 className="title-border">Related Products</h5>
                <Slider className="offer-slider slide-1">
                    {relatedproducts.products.length!=0?relatedproducts.products.map((product, index) =>
                        <div key={index}>
                                <div className="media" key={index}>
                                    <Link to={`${process.env.PUBLIC_URL}/left-sidebar/product/${product._id}`}><img style={{width:'80px',height:'80px'}} className="img-fluid" src={`${product.images[0].url}`} alt="" /></Link>
                                    <div className="media-body align-self-center">
                                    {product.nbreviews<10?
                                            <div >
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star-o"></i>
                                            <i className="fa fa-star-o"></i>
                                            <i className="fa fa-star-o"></i>
                                            <i className="fa fa-star-o"></i>
                                            </div>:
                                            product.nbreviews>10 && product.nbreviews<20 ?
                                            <div>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star-o"></i>
                                            <i className="fa fa-star-o"></i>
                                            <i className="fa fa-star-o"></i>
                                            </div>:
                                            product.nbreviews>20 && product.nbreviews<30?
                                            <div>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star-o"></i>
                                            <i className="fa fa-star-o"></i>
                                            </div>:
                                            product.nbreviews>30 && product.nbreviews<40?
                                            <div>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star-o"></i>
                                            </div>:
                                            <div>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            </div>}
                                        <Link to={`${process.env.PUBLIC_URL}/left-sidebar/product/${product._id}`} onClick={this.forceUpdate}><h6>{product.name}</h6></Link>
                                        <Link to={`${process.env.PUBLIC_URL}/store/${product.store}`} onClick={this.forceUpdate}><h6 style={{"textDecoration":"underline"}} className="sname">Product By:{relatedproducts.storenames[index]}</h6></Link>
                                        {symbol=="DT"?
                                        (product.discount != 0)?
                            <h4>{symbol}{Math.round((currencydiff*(product.price-(product.price*product.discount/100)) + Number.EPSILON) * 100) / 100}
                                 <del><span className="money">{symbol}{Math.round((currencydiff*(product.price) + Number.EPSILON) * 100) / 100}</span></del> 
                            </h4>:<h4>{symbol}{Math.round((currencydiff*(product.price) + Number.EPSILON) * 100) / 100}</h4>:
                            (product.discount != 0)?
                            <h4>{symbol}{product.price-(product.price*product.discount/100)}
                                 <del><span className="money">€{product.price}</span></del> 
                            </h4>:<h4>€{product.price}</h4>}
                                    </div>
                                </div>
                        </div>
                    ):<p>there are no related products</p>}
                </Slider>
            </div>
        )
    }
}

function mapStateToProps(state,ownProps) {
    return {
        relatedproducts:getRelatedItems(state.allproducts,ownProps.target,ownProps.own),
        symbol:state.symbol,
        currencydiff:state.currencydiff
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getProducts:()=>dispatch(getProducts())

    }
}
export default connect(mapStateToProps,mapDispatchToProps)(RelatedProduct);
