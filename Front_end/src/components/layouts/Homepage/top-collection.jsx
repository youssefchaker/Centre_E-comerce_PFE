import React, { Component } from 'react';
import Slider from 'react-slick';
import {connect} from 'react-redux'

import {Product4, Product5} from '../../../services/script'
import {addItemToCart} from "../../../actions/cartActions";
import ProductItem from '../common/product-item';
import { getTopProducts } from '../../../actions/productActions';

class TopCollection extends Component {
    componentDidMount() {
        this.props.getTopProducts();
    }
    render (){
        const {topproducts} = this.props;
        var products=topproducts.products;
        var topproductsarray = [];
        const product1=products.product1;
        const product2=products.product2;
        const product3=products.product3;
        const product4=products.product4;
        const product5=products.product5;
        topproductsarray.push(product1);
        topproductsarray.push(product2);
        topproductsarray.push(product3);
        topproductsarray.push(product4);
        topproductsarray.push(product5);
        console.log(topproductsarray);
        return (
            <div>
                {/*Paragraph*/}
                <div className="title1  section-t-space">
                    <h2 className="title-inner1">top products</h2>
                </div>
                {/*Paragraph End*/}
                <section className="section-b-space p-t-0">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <Slider  className="product-4 product-m no-arrow">
                                    { topproductsarray.map((product, index ) =>
                                        <div key={index}>
                                            <ProductItem product={product} symbol={"€"}
                                                         onAddToCartClicked={() => addItemToCart(product, 1)} key={index} />
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

const mapDispatchToProps = dispatch => {
    return{
        getTopProducts:()=>dispatch(getTopProducts()),
        addToCart:(id,stock)=>dispatch(addItemToCart(id,stock))
    }
}

const mapStateToProps = (state) => {
    return{
        topproducts:state.topproducts,
        cartList:state.cartlist
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (TopCollection);