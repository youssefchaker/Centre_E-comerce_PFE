import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import {connect} from 'react-redux'

import {getBestSeller, getMensWear, getWomensWear} from '../../../services/index'
import {addToCart} from "../../../actions/index";
import ProductItem from './product-item';

class SpecialProducts extends Component {
    render (){

        const {bestSeller,mensWear,womensWear, symbol, addToCart, addToWishlist, addToCompare} = this.props
        return (
            <div>
                <div className="title1 section-t-space">
                    <h2 className="title-inner1">New Products</h2>
                </div>
                <section className="section-b-space p-t-0">
                    <div className="container">
                        <Tabs className="theme-tab">
                            <TabList className="tabs tab-title">
                                <Tab></Tab>
                            </TabList>

                            <TabPanel>
                                <div className="no-slider row">
                                    { bestSeller.map((product, index ) =>
                                        <ProductItem product={product} symbol={symbol}
                                                     onAddToCartClicked={() => addToCart(product, 1)} key={index} /> )
                                    }
                                </div>
                            </TabPanel>
                            <TabPanel>
                                <div className="no-slider row">
                                    { mensWear.map((product, index ) =>
                                        <ProductItem product={product} symbol={symbol}
                                                     onAddToCartClicked={() => addToCart(product, 1)} key={index} /> )
                                    }
                                </div>
                            </TabPanel>
                            <TabPanel>
                                <div className=" no-slider row">
                                    { womensWear.map((product, index ) =>
                                        <ProductItem product={product} symbol={symbol}
                                                     onAddToCartClicked={() => addToCart(product, 1)} key={index} /> )
                                    }
                                </div>
                            </TabPanel>
                        </Tabs>
                    </div>
                </section>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    bestSeller: getBestSeller(state.data.products),
    mensWear: getMensWear(state.data.products),
    womensWear: getWomensWear(state.data.products),
    symbol: state.data.symbol
})

export default connect(mapStateToProps, {addToCart}) (SpecialProducts);