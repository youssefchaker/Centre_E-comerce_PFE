import React, {Component} from 'react';
import Breadcrumb from "../common/breadcrumb";
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';

class Searchresult extends Component {
    constructor(props) {
        super(props);
    }
    closeSearch() {
        document.getElementById("search-overlay").style.display = "none";
        setTimeout("location.reload(true);",1);
    }
        render(){
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
                                                    <div className="img-wrapper">
                                                        <div className="lable-block">
                                                            {(product.creationdate.slice(0,4) === '2021' )?<span className="lable3">NEW</span> : ''}
                                                            {product.discount?<span className="lable4">on  sale</span> : '' }
                                                            </div>
                                                        <div className="front">
                                                        <Link to={`${process.env.PUBLIC_URL}/left-sidebar/product/${product._id}`} >
                                                            <a className="bg-size"><img className="img-fluid blur-up bg-img lazyloaded"  src={product.images[0].url} onClick={this.closeSearch} style={{width:'210px',height:'180px'}}/></a></Link>
                                                            <div className="product-hover">
                                                                
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="product-detail">
                                                        <div className="rating">
                                                            <i className="fa fa-star"></i>
                                                            <i className="fa fa-star"></i>
                                                            <i className="fa fa-star"></i>
                                                            <i className="fa fa-star"></i>
                                                            <i className="fa fa-star"></i>
                                                        </div>
                                                        <a> <h6 >{product.name}</h6></a>
                                                        <h6>{product.description}</h6>
                                                        <h4 >{symbol}{symbol=='DT'?Math.round((currencydiff*(product.price-(product.price*product.discount/100)) + Number.EPSILON) * 100) / 100:product.price-(product.price*product.discount/100)} <del >{symbol}{symbol=='DT'?product.discount*currencydiff:product.discount}</del></h4>
                                                        <Link to={`${process.env.PUBLIC_URL}/left-sidebar/product/${product._id}`} ><h5 onClick={this.closeSearch}>By: {storenames[index]} </h5></Link>
                                                        <ul className="color-variant">
                                                            
                                                        </ul>
                                                    </div>
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

export default connect(mapStateToProps)(Searchresult)