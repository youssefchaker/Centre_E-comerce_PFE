import React, { Component } from 'react';
import Slider from 'react-slick';
import {connect} from 'react-redux'

import {Product4, Product5} from '../../../services/script'
import {addToCart} from "../../../actions/cartActions";
import ProductItem from '../common/product-item';
import { getTopProducts } from '../../../actions/productActions';

class TopCollection extends Component {
    componentWillMount() {
        this.props.getTopProducts();
    }
    render (){
        var properties = Product4;
        const {topproducts} = this.props;
        const products=topproducts.products.products;
        const {symbol}=this.props.symbol;
        const currencydiff=this.props.currencydiff;
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

const mapDispatchToProps = dispatch => {
    return{
        getTopProducts:()=>dispatch(getTopProducts()),
        addToCart:(id,stock)=>dispatch(addToCart(id,stock))
    }
}

const mapStateToProps = (state) => {
    return{
        topproducts:state.topproducts,
        cartList:state.cartlist,
        symbol:state.symbol,
        currencydiff:state.currencydiff
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (TopCollection);
