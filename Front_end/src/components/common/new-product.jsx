import React, {Component} from 'react';
import Slider from 'react-slick';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import { getNewProducts } from '../../actions/productActions';


class NewProduct extends Component {
    componentWillMount(){
        this.props.getNewProducts();
    }

    render (){
        let filteredproducts=[];
        const storeid=this.props.storeid;
        const {newproducts} = this.props;
        let products=newproducts.products.products;
        const storenames=newproducts.products.storenames;
        const {symbol}=this.props.symbol;
        const currencydiff=this.props.currencydiff;
        if(storeid!==undefined){
            for(var i=0;i<products.length;i++){
                if(products[i].store!==storeid){
                    filteredproducts.push(products[i])
                }
            }
            products=filteredproducts;
        }
        return (
            <div className="theme-card">
                <h5 className="title-border">New Products</h5>
                <Slider className="offer-slider slide-1">
                    {products.length>0?products.map((product, index) =>
                        <div key={index}>
                                <div className="media" key={index}>
                                    <Link to={`${process.env.PUBLIC_URL}/left-sidebar/product/${product._id}`}><img className="img-fluid" src={`${product.images[0].url}`} style={{width:'120px',height:'130px'}} alt="new product" /></Link>
                                    <div className="media-body align-self-center">
                                        
                                        {product.nbreviews<10?
                                            <div >
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star-o"></i>
                                            <i className="fa fa-star-o"></i>
                                            <i className="fa fa-star-o"></i>
                                            <i className="fa fa-star-o"></i>
                                            </div>:
                                            product.nbreviews>10 && product.nbreviews<20 ?
                                            <div>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star-o"></i>
                                            <i className="fa fa-star-o"></i>
                                            <i className="fa fa-star-o"></i>
                                            </div>:
                                            product.nbreviews>20 && product.nbreviews<30?
                                            <div>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star-o"></i>
                                            <i className="fa fa-star-o"></i>
                                            </div>:
                                            product.nbreviews>30 && product.nbreviews<40?
                                            <div>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star-o"></i>
                                            </div>:
                                            <div>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            </div>}
                                        <Link to={`${process.env.PUBLIC_URL}/left-sidebar/product/${product._id}`} onClick={this.forceUpdate}><h6>{product.name}</h6></Link>
                                        <Link to={`${process.env.PUBLIC_URL}/store/${product.store}`} onClick={this.forceUpdate}><h6 style={{"textDecoration":"underline"}} className="sname">Product By:{storenames[index]}</h6></Link>
                                        {symbol==="DT"?
                                        (product.discount !== 0)?
                            <h4>{symbol}{Math.round((currencydiff*(product.price-(product.price*product.discount/100)) + Number.EPSILON) * 100) / 100}
                                 <del><span className="money">{symbol}{Math.round((currencydiff*(product.price) + Number.EPSILON) * 100) / 100}</span></del> 
                            </h4>:<h4>{symbol}{Math.round((currencydiff*(product.price) + Number.EPSILON) * 100) / 100}</h4>:
                            (product.discount !== 0)?
                            <h4>{symbol}{product.price-(product.price*product.discount/100)}
                                 <del><span className="money">{symbol}{product.price}</span></del> 
                            </h4>:<h4>{symbol}{product.price}</h4>}
                                    </div>
                                </div>
                        </div>
                    ):<p>There are no new products from other stores</p>}
                </Slider>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        newproducts:state.newproducts,
        symbol:state.symbol,
        currencydiff:state.currencydiff
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getNewProducts:()=>dispatch(getNewProducts())

    }
}
export default connect(mapStateToProps,mapDispatchToProps)(NewProduct);
