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
import Loader from "react-loader-spinner";


function Shop ({ match }) {

    const [layoutColumns, setLayoutColumns] = useState(3);
  



    const dispatch = useDispatch();

    const { error, store, loading } = useSelector(state => state.storeDetails)
    useEffect(() => {
        if (error) {
            alert(error);
            dispatch(clearErrors())
        }
        dispatch(getStoreDetails(match.params.id));
        
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
                                </div>
                                {loading ? <div style={{  margin: '0.3em auto'}}><Loader
                             type="Rings"
                             color="#cc2121"
                             height={200}
                             width={300}
                /></div> :
                                <div className="collection-content col">
                                    <div className="page-main-content ">
                                        <div className="">
                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <div className="top-banner-wrapper">
                                                        {store.avatar && (
                                                        <img src={store.avatar.url} className="img-fluid" alt="" style={{width:'910px',height:'310px'}}/>)}
                                                        <div className="top-banner-content small-section">
                                                        {store.name && (<h4>{store.name}</h4>)}
                                                        {store.description && ( <h5>{store.description }</h5>)}
                                                        {store && (<ul className="contact-list">
                                                          <li><i className="fa fa-phone"></i>  Call Us :    {store.phoneNumber && store.phoneNumber}</li><br></br>
                                                          <li><i className="fa fa-envelope-o"></i>  Email Us : {store.email && store.email}</li>
                                                        </ul>)}
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
                                }
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        )
    
        }

export default Shop 
