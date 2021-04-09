import React, {Component} from 'react';
import Slider from 'react-slick';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import { getTopProducts } from '../../actions/productActions';


class TopProduct extends Component {
    componentWillMount(){
        this.props.getTopProducts();
    }

    render (){
        const {topproducts} = this.props;
        const products=topproducts.products.products;
        var i=0;
        return (
            <div className="theme-card">
                <h5 className="title-border">Top Products</h5>
                <Slider className="offer-slider slide-1">
                    {products.map((product, index) =>
                        <div key={index}>
                                <div className="media" key={index}>
                                    <Link to={`${process.env.PUBLIC_URL}/left-sidebar/product/${product._id}`}><img className="img-fluid" src={`${product.images[0]}`} alt="" /></Link>
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
        topproducts:state.topproducts
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getTopProducts:()=>dispatch(getTopProducts())

    }
}
export default connect(mapStateToProps,mapDispatchToProps)(TopProduct);
