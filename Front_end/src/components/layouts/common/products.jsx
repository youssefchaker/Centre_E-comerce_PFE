import React, { Component } from 'react';
import {connect} from 'react-redux'
import { addToCart } from '../../../actions'
import ProductItem from './product-item';
import Loader from "react-loader-spinner";
import { getNewProducts } from '../../../actions/productActions';
import Slider from 'react-slick';
import {Slider3} from "../../../services/script"
import {Product4, Product5} from '../../../services/script'
class SpecialProducts extends Component{
    componentWillMount() {
        this.props.getNewProducts();
    }
        render(){
            const { addToCart} = this.props;
            const {products,loading} = this.props.newproducts;
            const storenames=products.storenames
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
                                    {loading ? <div style={{ textAlign: "center" }}><Loader
                             type="Rings"
                             color="#cc2121"
                             height={200}
                             width={300}
                /></div> :products.products.length!=0? products.products.map((product, index ) =>
                                        <div key={index}>
                                            <ProductItem {...properties} product={product} symbol={symbol} currencydiff={currencydiff} storename={storenames[index]}
                                                         onAddToCartClicked={addToCart} key={index} />
                                        </div>)
                                    :<h3>There are no products at the moment!</h3>}
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
