import React, {Component} from 'react';
import Breadcrumb from "../common/breadcrumb";
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import {Product4, Product5} from '../../services/script'
import { addToCart } from '../../actions'
import ProductItem from '../layouts/common/product-item';

class Searchresult extends Component {
    constructor(props) {
        super(props);
    }
    closeSearch() {
        document.getElementById("search-overlay").style.display = "none";
        setTimeout("location.reload(true);",1);
    }
        render(){
            const { addToCart} = this.props;
            var properties = Product4;
            const {products}=this.props.searchedproducts.products
            const storenames=this.props.searchedproducts.products.storenames;
            const {symbol}=this.props.symbol;
            const currencydiff=this.props.currencydiff;
        return (
            <div>
                <Breadcrumb title={'Search Result'}/>
                
            <section>
                <div className="product-wrapper-grid">
                    <div className="container-fluid">
                    <div className="row">
                        {
                            products.map((product, index) => {
                                return (
                                    <div className="col-xl-3 col-sm-6" key={index}>
                                        <div className="card">
                                            <div className="products-admin">
                                                <div className="card-body product-box">
                                                <ProductItem {...properties} product={product} storename={storenames[index]} symbol={symbol} currencydiff={currencydiff}
                                                         onAddToCartClicked={addToCart} key={index} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        </div>
                        </div>
                        </div>
                        </section>
                    </div>
        )

            
        
    }
}
const mapStateToProps=state=>{
    return {
        symbol:state.symbol,
        currencydiff:state.currencydiff,
        searchedproducts:state.searchedproducts
      }
}

export default connect(mapStateToProps,{addToCart})(Searchresult)