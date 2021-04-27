import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {Helmet} from 'react-helmet'
import Breadcrumb from "../common/breadcrumb";
import NewProduct from "../common/new-product";
import Filterstore from "./common/filterstores";
import FilterBarStore from "./common/filter-barstores";
import ProductListingStore from "./common/product-listingstores";
import StickyBox from "react-sticky-box";
import TopProduct from '../common/top-product';
import { getStoreDetails, clearErrors } from '../../actions/index'
import { getProducts } from '../../actions/productActions';
import { emptyFilterStore } from '../../actions';
import {getMinMaxPriceStore,getMinMaxPriceDTStore} from '../../services';

function Shop ({ match }) {

    const [layoutColumns, setLayoutColumns] = useState(3);

  



    const dispatch = useDispatch();

    const { loading, error, store } = useSelector(state => state.storeDetails)
    const {products } = useSelector(state => state.allproducts)
    const currencydiff = useSelector(state => state.currencydiff)
    useEffect(() => {
        if (error) {
            alert(error);
            dispatch(clearErrors())
        }
        const prices = getMinMaxPriceStore(products,store._id);
        const pricesDT=  getMinMaxPriceDTStore(products,currencydiff,store._id);
        dispatch(getStoreDetails(match.params.id));
        dispatch(emptyFilterStore(prices.min, pricesDT.min));
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
                                            <NewProduct storeid={store._id}/>
                                            <hr></hr>
                                            <TopProduct storeid={store._id}/>
                                            <hr></hr>
                                            <Filterstore/>
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
                                                            <h5>{/* {store description} */}</h5>
                                                            <ul className="contact-list">
                                                          <li><i className="fa fa-phone"></i>  Call Us :    {store.phoneNumber}</li><br></br>
                                                          <li><i className="fa fa-envelope-o"></i>  Email Us : {store.email}</li>
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
                                                                        <FilterBarStore onLayoutViewClicked={(colmuns) => LayoutViewClicked(colmuns)} storeid={match.params.id}/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <ProductListingStore storeid={match.params.id} colSize={layoutColumns}/>
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
