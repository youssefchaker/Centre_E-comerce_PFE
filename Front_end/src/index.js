import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch, Link, Redirect } from 'react-router-dom';
import { ScrollContext } from 'react-router-scroll-4';
import { IntlReducer as Intl, IntlProvider } from 'react-redux-multilingual'
import './index.scss';

// Import custom components
import store from './store';
import translations from './constants/translations'


// Layouts
import HomePage from './components/layouts/Homepage/main';



//Shop page
import Shop from "./components/Shop/shop";

// Product Pages
import LeftSideBar from "./components/products/left-sidebar";


// Features
import Layout from './components/app'
import Cart from './components/cart'
import checkOut from './components/checkout'
import orderSuccess from './components/checkout/success-page'

// Extra Pages
import aboutUs from './components/pages/about-us'
import PageNotFound from './components/pages/404'
import lookbook from './components/pages/lookbook'
import Login from './components/pages/login'
import Register from './components/pages/register'
import TrackOrder from './components/pages/TrackOrder'
import Collection from './components/pages/collection'
import ForgetPassword from './components/pages/forget-password'
import Contact from './components/pages/contact'
import MyProfile from './components/pages/myprofile'
import Addproduct from './components/pages/addproduct'
import Addevent from './components/pages/addevent'
import Eventsdisplay from './components/pages/eventsdisplay';


// Blog Pages
import RightSide from './components/blogs/right-sidebar'
import Details from './components/blogs/details'
import BlogPage from './components/blogs/blog-page'

// Theme Element
import ElementTitle from "./components/features/theme/element-title"
import ElementBanner from "./components/features/theme/element-banner";
import ElementSlider from "./components/features/theme/element-slider";
import ElementCategory from "./components/features/theme/element-category";
import ElementService from "./components/features/theme/element-service";
import ElementRatio from "./components/features/theme/element-ratio";

// Product Elements
import ElementProductBox from "./components/features/product/element-product-box"
import ElementProductSlider from "./components/features/product/element-product-slider"
import ElementProductNoSlider from "./components/features/product/element-product-no-slider"
import ElementMultipleSlider from "./components/features/product/element-multiple-slider"
import ElementProductTab from "./components/features/product/element-product-tab"

// Stores page
import GridCols from "./components/features/portfolio/grid-cols"

// subscription page
import  Subscription from './components/pages/subscription'

import MasonaryGridCols from "./components/features/portfolio/masonary-grid-cols"
import Becomeaseller from './components/pages/becomeaseller';
import Mystore from './components/pages/mystore';
import MyEvents from './components/pages/myevents';


class Root extends React.Component {

    render() {
       // store.dispatch(getAllProducts());

        return(
        	<Provider store={store}>
                <IntlProvider translations={translations} locale='en'>
				<BrowserRouter basename={'/'} >
					<ScrollContext>
						<Switch>
                            
                            
                               <Layout>
                               <Switch>
                               <Route exact path={`${process.env.PUBLIC_URL}/`} component={HomePage}/>

                                {/*Routes For Layouts*/}
                                
								{/*Routes For Features (Product Collection) */}
								<Route path={`${process.env.PUBLIC_URL}/left-sidebar/collection`} component={Shop}/>
								

								{/*Routes For Single Product*/}
								<Route path={`${process.env.PUBLIC_URL}/left-sidebar/product/:id`} component={LeftSideBar}/>
								
								

								{/*Routes For custom Features*/}
								<Route path={`${process.env.PUBLIC_URL}/cart`} component={Cart}/>
								<Route path={`${process.env.PUBLIC_URL}/checkout`} component={checkOut}/>
								<Route path={`${process.env.PUBLIC_URL}/order-success`} component={orderSuccess}/>
								<Route path={`${process.env.PUBLIC_URL}/sales/orders`} component={aboutUs}/>

								{/*Routes For Extra Pages*/}
                                <Route path={`${process.env.PUBLIC_URL}/pages/about-us`} component={aboutUs}/>

                                <Route path={`${process.env.PUBLIC_URL}/pages/becomeaseller`} component={Becomeaseller}/>

                                <Route path={`${process.env.PUBLIC_URL}/pages/lookbook`} component={lookbook}/>
                                <Route path={`${process.env.PUBLIC_URL}/pages/login`} component={Login}/>
                                <Route path={`${process.env.PUBLIC_URL}/pages/register`} component={Register}/>
                                <Route path={`${process.env.PUBLIC_URL}/pages/TrackOrder`} component={TrackOrder}/>
                                <Route path={`${process.env.PUBLIC_URL}/pages/collection`} component={Collection}/>
                                <Route path={`${process.env.PUBLIC_URL}/pages/forget-password`} component={ForgetPassword}/>
                                <Route path={`${process.env.PUBLIC_URL}/pages/contact`} component={Contact}/>
                                <Route path={`${process.env.PUBLIC_URL}/pages/myprofile`} component={MyProfile}/>
                                <Route path={`${process.env.PUBLIC_URL}/pages/addproduct`} component={Addproduct}/>
                                <Route path={`${process.env.PUBLIC_URL}/pages/addevent`} component={Addevent}/>
                                <Route path={`${process.env.PUBLIC_URL}/pages/mystore`} component={Mystore}/>
                                <Route path={`${process.env.PUBLIC_URL}/pages/myevents`} component={MyEvents}/>
                                <Route path={`${process.env.PUBLIC_URL}/pages/eventsdisplay`} component={Eventsdisplay}/>



								{/*Features*/}
								{/*Theme Elements*/}
                                <Route path={`${process.env.PUBLIC_URL}/features/element-title`} component={ElementTitle}/>
                                <Route path={`${process.env.PUBLIC_URL}/features/element-banner`} component={ElementBanner}/>
                                <Route path={`${process.env.PUBLIC_URL}/features/element-slider`} component={ElementSlider}/>
                                <Route path={`${process.env.PUBLIC_URL}/features/element-category`} component={ElementCategory}/>
                                <Route path={`${process.env.PUBLIC_URL}/features/element-service`} component={ElementService}/>
                                <Route path={`${process.env.PUBLIC_URL}/features/element-ratio`} component={ElementRatio}/>

								{/*Product Elements*/}
                                <Route path={`${process.env.PUBLIC_URL}/features/element-product-box`} component={ElementProductBox}/>
                                <Route path={`${process.env.PUBLIC_URL}/features/element-product-slider`} component={ElementProductSlider}/>
                                <Route path={`${process.env.PUBLIC_URL}/features/element-product-no-slider`} component={ElementProductNoSlider}/>
                                <Route path={`${process.env.PUBLIC_URL}/features/element-product-multiple-slider`} component={ElementMultipleSlider}/>
                                <Route path={`${process.env.PUBLIC_URL}/features/element-product-tab`} component={ElementProductTab}/>

								{/*Stores*/}
                                <Route path={`${process.env.PUBLIC_URL}/features/portfolio-grid/:columns`} component={GridCols}/>

								{/*Blog Pages*/}
                                <Route path={`${process.env.PUBLIC_URL}/blog/right-sidebar`} component={RightSide}/>
                                <Route path={`${process.env.PUBLIC_URL}/blog/details`} component={Details}/>
                                <Route path={`${process.env.PUBLIC_URL}/blog/blog-page`} component={BlogPage}/>


                                {/*subscription*/}
                                <Route path={`${process.env.PUBLIC_URL}/pages/subscription`} component={Subscription}/>


                                 {/* <Route exact path="*" component={PageNotFound} /> */}

                                <Route component={PageNotFound} />
                                </Switch>
                                

                                </Layout>
                                
                         </Switch>

					  </ScrollContext>
					</BrowserRouter>
                </IntlProvider>
			</Provider>
    	);
    }
}

ReactDOM.render(<Root />, document.getElementById('root'));


