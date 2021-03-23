import React, { Component,useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {connect} from 'react-redux'
import {addItemToCart} from "../../../actions/cartActions"
import ProductItem from './product-item';
import { getNewProducts } from '../../../actions/productActions';
import { IntlActions } from 'react-redux-multilingual';
import Slider from 'react-slick';
import store from '../../../store'

function SpecialProducts(){
        const dispatch=useDispatch();
        store.dispatch(getNewProducts());
        return (
            <div>
                <div className="title1 section-t-space">
                    <h2 className="title-inner1">New Products</h2>
                </div>
                <section className="section-b-space p-t-0">
                    <div className="container">
                    <Slider  className="product-4 product-m no-arrow">
                                    { () => store.dispatch(getNewProducts()).map((product, index ) =>
                                        <div key={index}>
                                            <ProductItem product={product} symbol={"€"}
                                                         onAddToCartClicked={() => addItemToCart(product, 1)} key={index} />
                                        </div>)
                                    }
                                </Slider>
                    </div>
                </section>
            </div>
        )
    }
/**const mapDispatchToProps = dispatch => {
    return{
        newProducts:()=>dispatch({ type: 'NEW_PRODUCT_REQUEST' }),
        addToCart:(id,stock)=>dispatch({ type: 'ADD_TO_CART' })
    }
}

const mapStateToProps = (state) => {
    return{
        products:state.products,
        cartList:state.cartlist
    }
}*/

export default connect(/*mapStateToProps,mapDispatchToProps*/)(SpecialProducts);