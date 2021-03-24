import React, { Component,useState, useEffect } from 'react';
import {connect} from 'react-redux'
import {addItemToCart} from "../../../actions/cartActions"
import ProductItem from './product-item';
import { getNewProducts } from '../../../actions/productActions';
import { IntlActions } from 'react-redux-multilingual';
import Slider from 'react-slick';
import store from '../../../store'

class SpecialProducts extends Component{
    componentDidMount() {
        this.props.getNewProducts();
    }
        render(){
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
            <div>
                <div className="title1 section-t-space">
                    <h2 className="title-inner1">New Products</h2>
                </div>
                <section className="section-b-space p-t-0">
                    <div className="container">
                    <Slider  className="product-4 product-m no-arrow">
                                    { newproductsarray.map((product, index ) =>
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
}

const mapStateToProps = (state) => {
    return{
        newproducts:state.newproducts,
        cartList:state.cartlist
    }
}

const mapDispatchToProps = dispatch => {
    return{
        getNewProducts:()=>dispatch(getNewProducts()),
        addItemToCart:(id,stock)=>dispatch(addItemToCart(id,stock))
    }
}



export default connect(mapStateToProps,mapDispatchToProps)(SpecialProducts);