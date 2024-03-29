import React, {Component} from 'react';
import {Helmet} from 'react-helmet'
import Slider from 'react-slick';
import '../common/index.scss';
import {connect} from "react-redux";
import Service from "./common/service";
import RelatedProduct from "../common/related-product";
import Breadcrumb from "../common/breadcrumb";
import DetailsWithPrice from "./common/product/details-price";
import DetailsTopTabs from "./common/details-top-tabs";
import { addToCart, addToCartUnsafe } from '../../actions/cartActions'
import ImageZoom from './common/product/image-zoom'
import SmallImages from './common/product/small-image'
import { getStoreProduct } from '../../actions/productActions';
import Loader from "react-loader-spinner";


class LeftSideBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open:false,
            nav1: null,
            nav2: null,
            id:null
        };
    }

    // document.getElementById('idOfElement').classList.add('newClassName');


    componentDidMount() {
        this.setState({
            nav1: this.slider1,
            nav2: this.slider2
        });
        
        
    }
    componentWillMount() {
        this.props.getStoreProduct(this.props.match.params.id);
        this.setState({id:this.props.match.params.id});
    }
    componentDidUpdate() {
        if(this.props.match.params.id!==this.state.id){
            setTimeout("location.reload(true);",1);
        }
    }
    filterClick() {
        document.getElementById("filter").style.left = "-15px";
    }
    backClick() {
        document.getElementById("filter").style.left = "-365px";
    }

    render(){
        const { loading} = this.props.product; 
        const { product} = this.props.product.product; 
        const storename=this.props.product.product.storename;
        const {addToCart,addToCartUnsafe}=this.props;
        const {symbol}=this.props.symbol;
        const currencydiff=this.props.currencydiff;
        var products = {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
            arrows: true,
            fade: true
        };
        var productsnav = {
            slidesToShow: 3,
            swipeToSlide:true,
            arrows: false,
            dots: false,
            focusOnSelect: true
        };

        return (
            <div>
                <Helmet>
                    <title>Mall | {product.category} | {product.name}</title>
                    <meta name="description" content="online Mall" />
                </Helmet>
                <Breadcrumb  parent={'Product'} title={product.name} />
                {loading ? <div style={{ textAlign: "center" }}><Loader
                             type="Rings"
                             color="#cc2121"
                             height={200}
                             width={300}
                /></div> :(product)?
                <section className="section-b-space">
                    <div className="collection-wrapper">
                        <div className="container">
                            <div className="row">

                                <div className="col-sm-3 collection-filter" id="filter">
                                    <div  className="collection-mobile-back pl-5">
                                        <span onClick={this.backClick}  className="filter-back">
                                            <i className="fa fa-angle-left" aria-hidden="true"></i> back
                                        </span>
                                    </div>

                                    {/* <BrandBlock/> */}
                                    <Service/>
                                    {/*side-bar single product slider start*/}
                                    <RelatedProduct target={product.category} own={product._id} />
                                    {/*side-bar single product slider end*/}
                                </div>
                                <div className="col-lg-9 col-sm-12 col-xs-12">
                                    <div className="">
                                        <div className="row">
                                            <div className="col-xl-12">
                                                <div className="filter-main-btn mb-2">
                                                    <span onClick={this.filterClick}  className="filter-btn" >
                                                        <i className="fa fa-filter" aria-hidden="true"></i> filter</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-6 product-thumbnail">
                                                <Slider {...products} asNavFor={this.state.nav2} ref={slider => (this.slider1 = slider)} className="product-slick">
                                                    {
                                                    
                                                    product.images.map((vari, index) =>
                                                        <div key={index}>
                                                            <ImageZoom image={vari.url} />
                                                        </div>
                                                    )}
                                                </Slider>
                                                <SmallImages product={product} settings={productsnav} navOne={this.state.nav1} />
                                            </div>
                                            <DetailsWithPrice symbol={symbol} product={product} navOne={this.state.nav1} addToCartClicked={addToCart} BuynowClicked={addToCartUnsafe} currencydiff={currencydiff} storename={storename}  />
                                        </div>
                                    </div>
                                    <DetailsTopTabs product={product} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section> : ''}
                {/*Section End*/}
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return{
        product:state.product,
        symbol:state.symbol,
        currencydiff:state.currencydiff
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getStoreProduct:(id)=>dispatch(getStoreProduct(id)),
        addToCart:(product,quantity)=>dispatch(addToCart(product,quantity)),
        addToCartUnsafe:(product,quantity)=>dispatch(addToCartUnsafe(product,quantity))
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (LeftSideBar);
