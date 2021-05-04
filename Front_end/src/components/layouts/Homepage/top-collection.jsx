import React, { Component } from 'react';
import Slider from 'react-slick';
import {connect} from 'react-redux'
import Loader from "react-loader-spinner";
import {Product4, Product5} from '../../../services/script'
import { addToCart } from '../../../actions'
import ProductItem from '../common/product-item';
import { getTopProducts } from '../../../actions/productActions';
import {Slider3} from "../../../services/script"
class TopCollection extends Component {
    componentWillMount() {
        this.props.getTopProducts();
    }
    render (){
        const { addToCart} = this.props;
        var properties = Product4;
        const {products,loading} = this.props.topproducts;
        const storenames=products.storenames
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
                            
                                <Slider {...Slider3} className="product-4 product-m no-arrow">
                                    {loading ? <div style={{ textAlign: "center" }}><Loader
                             type="Rings"
                             color="#cc2121"
                             height={200}
                             width={300}
                /></div> :products.products.length!=0? products.products.map((product, index ) =>
                                        <div key={index}>
                                            <ProductItem {...properties} product={product} storename={storenames[index]} symbol={symbol} currencydiff={currencydiff}
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
