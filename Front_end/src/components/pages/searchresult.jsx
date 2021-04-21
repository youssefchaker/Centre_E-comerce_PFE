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
                
                <section className="section-b-space  blog-page">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-9 col-lg-8 col-md-7 " > 
                            {products.map((product,index)=>(
                                <div className="row blog-media" key={index} >
                                    <div className="col-xl-6 ">
                                    
                                        <div className="blog-left">
                                            <Link to={`${process.env.PUBLIC_URL}/left-sidebar/product/${product._id}`} >
                                                <img onClick={this.closeSearch} src={product.images[0]} className="img-fluid" alt="product image" style={{width:'200px',height:'200px'}}/></Link>
                                        </div>
                                    </div>
                                    <div className="col-xl-6">
                                        <div className="blog-right">
                                            <div>
                                                <h4>{product.name}</h4>
                                                <h6>{product.description} </h6>
                                                {symbol=="DT"?product.discount?<h6>Price:{symbol}&nbsp;{Math.round((currencydiff*(product.price-(product.price*product.discount/100)) + Number.EPSILON) * 100) / 100} </h6>:<h6>Price:{symbol}&nbsp;{Math.round((currencydiff*(product.price) + Number.EPSILON) * 100) / 100} </h6>:product.discount?<h6>Price:{symbol}&nbsp;{(product.price-(product.price*product.discount/100))} </h6>:<h6>Price:{symbol}&nbsp;{product.price} </h6>}
                                                <Link to={`${process.env.PUBLIC_URL}/left-sidebar/product/${product._id}`} ><h5 onClick={this.closeSearch}>Product By: {storenames[index]} </h5></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                                
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