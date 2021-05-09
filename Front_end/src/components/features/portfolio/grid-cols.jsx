import React, {  useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getStores } from '../../../actions/index'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import Loader from "react-loader-spinner";
import {Link} from "react-router-dom";
  import Store from './store';

// import Custom Components
import Breadcrumb from "../../common/breadcrumb";
import { getFeatureImages} from "../../../services";




function  GridCols () {
    
    
    const [photoSetting, setPhotoSetting] = useState({
        photoIndex: 0,
        isOpen: false,
        columns:'col-lg-4 col-sm-6'
     });



     const dispatch = useDispatch();
         const { loading, stores, error } = useSelector(state => state.stores) 


     useEffect(() => {
        if (error) {
            return alert(error)
        }

        dispatch(getStores(/*keyword, currentPage, price, category, rating)*/));


    }, [dispatch, alert,  error  /*,keyword, currentPage, price, category, rating*/])

    

   const  redirectshop = (index, type) => {
        setPhotoSetting({ 
            photoIndex: index,
            isOpen: true,
            images: getFeatureImages(stores, type) 
        })
        
    }

    
            
        const { photoIndex, isOpen, images, columns } = photoSetting;
        return (
            <div>
                <Breadcrumb title={'STORES'}/>
          
                {/* Our Project Start */}
                <section className="portfolio-section grid-portfolio ratio2_3 portfolio-padding">
                    <div className="container">
                        <Tabs className="theme-tab">
                            <TabList className="tabs tab-title">
                                <Tab style={{textDecoration:"underline"}}>All</Tab>
                                <Tab style={{textDecoration:"underline"}}>Electronics</Tab>
                                <Tab style={{textDecoration:"underline"}}>Accessories</Tab>
                                <Tab style={{textDecoration:"underline"}}>Food</Tab>
                                <Tab style={{textDecoration:"underline"}}>Fashion</Tab>
                                <Tab style={{textDecoration:"underline"}}>Beauty&Health</Tab>
                            </TabList>
                            <hr></hr>
                            <TabPanel>
                                <div className="row zoom-gallery">
                                    {loading ? <div style={{ margin: '0.3em auto' }}><Loader
                             type="Rings"
                             color="#cc2121"
                             height={200}
                             width={300}
                /></div> :stores && stores.map(store => 
                                        <Store key={store._id} store={store} columns={columns} />
                                    )}
                                </div>
                            </TabPanel>
                            <TabPanel>
                                <div className="row zoom-gallery">
                                    {getFeatureImages(stores, 'Electronics').map(store => 
                                        <div className={`isotopeSelector filter fashion ${columns}`} key={store._id}>
                                            <div className="overlay">
                                                <div className="border-portfolio">
                                                <Link to={`/store/${store._id}`}>
                                                    <div className="overlay-background" onClick={() => redirectshop(store._id, 'Electronics')}>
                                                        <i className="fa fa-plus" aria-hidden="true"></i>
                                                    </div>
                                                    </Link>
                                                    <img src={store.avatar.url} className="img-fluid blur-up lazyload bg-img" alt="store avatar" />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </TabPanel>
                            <TabPanel>
                            <div className="row zoom-gallery">
                                    {getFeatureImages(stores, 'Accessories').map(store => 
                                        <div className={`isotopeSelector filter fashion ${columns}`} key={store._id}>
                                            <div className="overlay">
                                                <div className="border-portfolio">
                                                <Link to={`/store/${store._id}`}>
                                                    <div className="overlay-background" onClick={() => redirectshop(store._id, 'Accessories')}>
                                                        <i className="fa fa-plus" aria-hidden="true"></i>
                                                    </div>
                                                    </Link>
                                                    <img src={store.avatar.url} className="img-fluid blur-up lazyload bg-img" alt="store avatar" />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </TabPanel>
                            <TabPanel>
                            <div className="row zoom-gallery">
                                    {getFeatureImages(stores, 'Food').map(store => 
                                        <div className={`isotopeSelector filter fashion ${columns}`} key={store._id}>
                                            <div className="overlay">
                                                <div className="border-portfolio">
                                                <Link to={`/store/${store._id}`}>
                                                    <div className="overlay-background" onClick={() => redirectshop(store._id, 'Food')}>
                                                        <i className="fa fa-plus" aria-hidden="true"></i>
                                                    </div>
                                                    </Link>
                                                    <img src={store.avatar.url} className="img-fluid blur-up lazyload bg-img" alt="store avatar" />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </TabPanel>
                            <TabPanel>
                            <div className="row zoom-gallery">
                                    {getFeatureImages(stores, 'Fashion').map(store => 
                                        <div className={`isotopeSelector filter fashion ${columns}`} key={store._id}>
                                            <div className="overlay">
                                                <div className="border-portfolio">
                                                <Link to={`/store/${store._id}`}>
                                                    <div className="overlay-background" onClick={() => redirectshop(store._id, 'Fashion')}>
                                                        <i className="fa fa-plus" aria-hidden="true"></i>
                                                    </div>
                                                    </Link>
                                                    <img src={store.avatar.url} className="img-fluid blur-up lazyload bg-img" alt="store avatar" />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </TabPanel>
                            <TabPanel>
                            <div className="row zoom-gallery">
                                    {getFeatureImages(stores, 'Beauty&Health').map(store => 
                                        <div className={`isotopeSelector filter fashion ${columns}`} key={store._id}>
                                            <div className="overlay">
                                                <div className="border-portfolio">
                                                <Link to={`/store/${store._id}`}>
                                                    <div className="overlay-background" onClick={() => redirectshop(store._id, 'Beauty&Health')}>
                                                        <i className="fa fa-plus" aria-hidden="true"></i>
                                                    </div>
                                                    </Link>
                                                    <img src={store.avatar.url} className="img-fluid blur-up lazyload bg-img" alt="store avatar" />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </TabPanel>
                        </Tabs>
                    </div>
                </section>
                
                {isOpen && (
                    <Lightbox
                        mainSrc={images[photoIndex].src}
                        nextSrc={images[(photoIndex + 1) % images.length]}
                        prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                        onCloseRequest={() => setPhotoSetting({ isOpen: false })}
                        onMovePrevRequest={() =>
                        setPhotoSetting({
                            photoIndex: (photoIndex + images.length - 1) % images.length,
                        })
                        }
                        onMoveNextRequest={() =>
                        setPhotoSetting({
                            photoIndex: (photoIndex + 1) % images.length,
                        })
                        }
                    />
                )}
            </div>
        )
    
}

export default GridCols