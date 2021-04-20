import React, { Component } from 'react';
import Slider from 'react-slick';
import {connect} from 'react-redux'

import {getTrendingCollection} from '../../../services/index'
import {Product4, Product5} from '../../../services/script'
import {addToCart} from "../../../actions/index";
import ProductItem from '../common/product-item';

class TopCollection extends Component {

    render (){

        const {items, symbol, addToCart, type} = this.props;

        var properties;
        if(type === 'kids'){
            properties = Product5
        }else{
            properties = Product4
        }

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
                                <Slider {...properties} className="product-4 product-m no-arrow">
                                    { items.map((product, index ) =>
                                        <div key={index}>
                                            <ProductItem product={product} symbol={symbol}
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

const mapStateToProps = (state, ownProps) => ({
    items: getTrendingCollection(state.data.products, ownProps.type),
    symbol: state.data.symbol
})

export default connect(mapStateToProps, {addToCart}) (TopCollection);