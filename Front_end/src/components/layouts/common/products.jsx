import React, { Component,useState, useEffect } from 'react';
import {connect} from 'react-redux'
import {addToCart} from "../../../actions/cartActions"
import ProductItem from './product-item';
import { getNewProducts } from '../../../actions/productActions';
import { IntlActions } from 'react-redux-multilingual';
import Slider from 'react-slick';
import store from '../../../store'
import {Slider3} from "../../../services/script"
import {Product4, Product5} from '../../../services/script'
class SpecialProducts extends Component{
    componentWillMount() {
        this.props.getNewProducts();
    }
        render(){
            const {newproducts} = this.props;
            const products=newproducts.products.products;
            const {symbol}=this.props.symbol;
        const currencydiff=this.props.currencydiff;
        var properties = Product4;
        return (
            <div>
                <div className="title1 section-t-space">
                    <h2 className="title-inner1">New Products</h2>
                </div>
                <section className="section-b-space p-t-0">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <Slider {...Slider3} className="product-4 product-m no-arrow">
                                    { products.map((product, index ) =>
                                        <div key={index}>
                                            <ProductItem {...properties} product={product} symbol={symbol} currencydiff={currencydiff}
                                                         onAddToCartClicked={() => addToCart(product, 1)} key={index} />
                                        </div>)
                                    }
                                </Slider>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        newproducts:state.newproducts,
        cartList:state.cartlist,
        symbol:state.symbol,
        currencydiff:state.currencydiff
    }
}

const mapDispatchToProps = dispatch => {
    return{
        getNewProducts:()=>dispatch(getNewProducts()),
        addToCart:(id,stock)=>dispatch(addToCart(id,stock))
    }
}



export default connect(mapStateToProps,mapDispatchToProps)(SpecialProducts);
