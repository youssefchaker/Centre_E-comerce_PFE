import React, {Component} from 'react';
import Slider from 'react-slick';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'

import {getBestSeller} from "../../services";
import {addToCart} from "../../actions";
import ProductItem from '../layouts/common/product-item';
import { getProducts } from '../../actions/productActions';


class RelatedProduct extends Component {
    componentWillMount() {
        this.props.getProducts();
    }
    render (){
        
        const {items, addToCart} = this.props;


        return (
            <section className="section-b-space">
                <div className="container">
                    <div className="row">
                        <div className="col-12 product-related">
                            <h2>related products</h2>
                        </div>
                    </div>
                    <div className="row search-product">
                        { items.slice(0, 6).map((product, index ) =>
                            <div key={index} className="col-xl-2 col-md-4 col-sm-6">
                                <ProductItem product={product} symbol={"€"}
                                             onAddToCartClicked={() => addToCart(product, 1)} key={index} />
                            </div>)
                        }
                    </div>
                </div>
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        items: getBestSeller(state.allproducts.products),
    }
}
const mapDispatchToProps = dispatch => {
    return{
        getProducts:()=>dispatch(getProducts()),
        addToCart:(id,stock)=>dispatch(addToCart(id,stock))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(RelatedProduct);
