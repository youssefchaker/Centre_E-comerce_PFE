import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {Helmet} from 'react-helmet'
import Breadcrumb from "../common/breadcrumb";
import NewProduct from "../common/new-product";
import Filter from "./common/filter";
import FilterBar from "./common/filter-bar";
import ProductListing from "./common/product-listing";
import StickyBox from "react-sticky-box";
import TopProduct from '../common/top-product';
import { getStoreDetails, clearErrors } from '../../actions/index'
import { getProducts } from '../../actions/productActions';
import { emptyFilter } from '../../actions';
import {getMinMaxPrice,getMinMaxPriceDT} from '../../services';

function Shop ({ match }) {

    const [layoutColumns, setLayoutColumns] = useState(3);

  



    const dispatch = useDispatch();

    const { loading, error, store } = useSelector(state => state.storeDetails)
    const {products } = useSelector(state => state.allproducts)
    const {currencydiff } = useSelector(state => state.currencydiff)
    useEffect(() => {
        console.log("a");
        if (error) {
            alert(error);
            dispatch(clearErrors())
        }
        const prices = getMinMaxPrice(products);
        const pricesDT=  getMinMaxPriceDT(products, currencydiff);
        dispatch(getStoreDetails(match.params.id));
        dispatch(emptyFilter(prices.min, pricesDT.min));
    }, [dispatch, alert, error, match.params.id])
     function LayoutViewClicked(colums) {
        setLayoutColumns({
            layoutColumns:colums
        })
    }
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
                                                    <div className="top-banner-wrapper">
                                                        <img src={store.avatar.url} className="img-fluid" alt="" style={{width:'910px',height:'310px'}}/>
                                                        <div className="top-banner-content small-section">
                                                            <h4>{store.name}</h4>
                                                            <h5>{store.name} is a {store.buisnessDomaine} company it is part of the international Inditex group</h5>
                                                            <p>The company was created in {store.createdAt.substring(0, 4)} as a new store and unique concept, aimed at a young target Market.</p><hr></hr>
                                                            <ul className="contact-list">
                                                          <li><i className="fa fa-phone"></i>  Call Us :    {store.phoneNumber}</li><br></br>
                                                          <li><i className="fa fa-envelope-o"></i>  Email Us : <a
                                                          href="#">{store.email}</a></li>
                                                        </ul>
                                                        </div>
                                                    </div>
                                                    <div className="collection-product-wrapper">
                                                        <div className="product-top-filter">
                                                            <div className="container-fluid p-0">
                                                                <div className="row">
                                                                    <div className="col-xl-12">
                                                                        <div className="filter-main-btn">
                                                                            <span onClick={() => {document.querySelector(".collection-filter").style = "left: -15px";  }}
                                                                                className="filter-btn btn btn-theme"><i
                                                                                className="fa fa-filter"
                                                                                aria-hidden="true"></i> Filter</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-12">
                                                                        <FilterBar onLayoutViewClicked={(colmuns) => LayoutViewClicked(colmuns)}/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
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

export default Shop 
