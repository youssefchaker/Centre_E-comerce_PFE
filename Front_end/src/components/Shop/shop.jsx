import React, {Component} from 'react';
import {Helmet} from 'react-helmet'
import Breadcrumb from "../common/breadcrumb";
import NewProduct from "../common/new-product";
import Filter from "./common/filter";
import FilterBar from "./common/filter-bar";
import ProductListing from "./common/product-listing";
import StickyBox from "react-sticky-box";
import TopProduct from '../common/top-product';

class Shop extends Component {
    constructor(props){
        super(props)
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
                                            <NewProduct/>
                                            <TopProduct/>
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
                                                        <ProductListing filter={this.props.match.params.id} colSize={this.state.layoutColumns}/>

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

export default Shop;