import React, {Component} from 'react';
import {Helmet} from 'react-helmet'
import Breadcrumb from "../common/breadcrumb";
import NewProduct from "../common/new-product";
import Filter from "./common/filter";
import FilterBar from "./common/filter-bar";
import ProductListing from "./common/product-listing";
import StickyBox from "react-sticky-box";
import TopProduct from '../common/top-product';
import { emptyFilter } from '../../actions';
import { connect } from 'react-redux'
import { getProducts } from '../../actions/productActions';
import {getMinMaxPrice,getMinMaxPriceDT} from '../../services';
class BrowseProducts extends Component {
    constructor(props){
        super(props)
    }
    componentWillMount(){
        this.props.getProducts();
        this.props.emptyFilter(this.props.prices.min,this.props.pricesDT.min);
    }
    state = {
        layoutColumns:3
    }

    LayoutViewClicked(colums) {
        this.setState({
            layoutColumns:colums
        })
    }

    openFilter = () => {
        document.querySelector(".collection-filter").style = "left: -15px";
    }
    
    render (){
        return (
            <div>
                {/*SEO Support*/}
                <Helmet>
                    <title>Mall</title>
                    <meta name="description" content="online Mall" />
                </Helmet>
                {/*SEO Support End */}

                <Breadcrumb title={'store'}/>

                <section className="section-b-space">
                    <div className="collection-wrapper">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-3 collection-filter">

                                    <StickyBox offsetTop={20} offsetBottom={20}>
                                        <div>
                                            <Filter/>
                                            <hr></hr>
                                            <NewProduct/>
                                            <hr></hr>
                                            <TopProduct/>
                                            <div className="collection-sidebar-banner">
                                                <a href="#">
                                                    <img src={`${process.env.PUBLIC_URL}/assets/images/promotion-banner.png`} className="img-fluid" alt="" />
                                                </a>
                                            </div>
                                        </div>
                                    </StickyBox>
                                    {/*side-bar banner end here*/}
                                </div>
                                <div className="collection-content col">
                                    <div className="page-main-content ">
                                        <div className="">
                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <div className="collection-product-wrapper">
                                                        <div className="product-top-filter">
                                                            <div className="container-fluid p-0">
                                                                <div className="row">
                                                                    <div className="col-xl-12">
                                                                        <div className="filter-main-btn">
                                                                            <span onClick={this.openFilter}
                                                                                className="filter-btn btn btn-theme"><i
                                                                                className="fa fa-filter"
                                                                                aria-hidden="true"></i> Filter</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-12">
                                                                        <FilterBar onLayoutViewClicked={(colmuns) => this.LayoutViewClicked(colmuns)}/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/*Products Listing Component*/}
                                                        <ProductListing filterstore={this.props.match.params.id} colSize={this.state.layoutColumns}/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    allproducts:state.allproducts.products,
    prices: getMinMaxPrice(state.allproducts.products),
    pricesDT: getMinMaxPriceDT(state.allproducts.products,state.currencydiff),
    currencydiff:state.currencydiff
})
const mapDispatchToProps = dispatch => {
    return {
        getProducts: () => dispatch(getProducts()),
        emptyFilter:(min,minDT)=>dispatch(emptyFilter(min,minDT))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(BrowseProducts) ;