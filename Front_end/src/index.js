import React, { useEffect } from 'react'
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch, Link, Redirect } from 'react-router-dom';
import { ScrollContext } from 'react-router-scroll-4';
import { IntlReducer as Intl, IntlProvider } from 'react-redux-multilingual'
import './index.scss';

// Import custom components
import store from './store';
import translations from './constants/translations'
import { getAllProducts } from './actions'
import { loadUser } from './actions/index'

// Payment
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

// Layouts
import HomePage from './components/layouts/Homepage/main';

//Protected Route
import ProtectedRoute from './components/pages/protectedRoute';

//Shop page
import Shop from "./components/Shop/shop";

// Product Pages
import LeftSideBar from "./components/products/left-sidebar";


// Features
import Layout from './components/app'
import Cart from './components/cart'
import checkOut from './components/checkout'
import orderSuccess from './components/checkout/success-page'
import Payment from './components/cart/payment'
import CheckoutPayment from './components/checkout/checkoutPayment'



// Extra Pages
import aboutUs from './components/pages/about-us'
import PageNotFound from './components/pages/404'
import lookbook from './components/pages/lookbook'
import Login from './components/pages/login'
import Register from './components/pages/register'
import TrackOrder from './components/pages/TrackOrder'
import Collection from './components/pages/collection'
import ForgotPassword from './components/pages/forgotPassword'
import Contact from './components/pages/contact'
import MyProfile from './components/pages/myprofile'
import Addproduct from './components/pages/addproduct'
import Addevent from './components/pages/addevent'
import UpdateProfile from './components/pages/updateProfile'
import UpdatePassword from './components/pages/updatePassword'
import NewPassword from './components/pages/newPassword'
import Eventsdisplay from './components/pages/eventsdisplay';
import Searchresult from './components/pages/searchresult';



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
import MyProducts from './components/pages/myProducts';
import MyEvents from './components/pages/myevents';
import UpdateStore from './components/pages/updateStore'
import BrowseProducts from "./components/Shop/browseProducts";
import MyStoreProfile from './components/pages/myStoreProfile';
import ListOrders from './components/order/listOrders';
import OrderDetails from './components/order/orderDetails'

// Admin Pages
import Dashboard from './components/admin/Dashboard'
import ProductsList from './components/admin/ProductsList'






function Root() {

    const stripe = loadStripe(
        "pk_test_51IgzW2GgTi3tRiABYhCePz94UEIzJU6OYobgzriTxviPCjZOvFTqI1hbs3URmUuiSr1u5xcQL85cax6u0lQFWWnB00PC9xOM2H"
      );

    useEffect(() => {
        store.dispatch(getAllProducts());
        store.dispatch(loadUser());
        
        
        
    
      }, [])
    
    
        


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
								<Route path={`${process.env.PUBLIC_URL}/store/:id`} component={Shop}/>
								
								<Route path={`${process.env.PUBLIC_URL}/left-sidebar/collection`} component={BrowseProducts}/>

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
                                <Route path={`${process.env.PUBLIC_URL}/password/forgot`} component={ForgotPassword}/>
                                <Route path={`${process.env.PUBLIC_URL}/password/reset/:token`} component={NewPassword}/>
                                <Route path={`${process.env.PUBLIC_URL}/pages/contact`} component={Contact}/>
                                <ProtectedRoute path={`${process.env.PUBLIC_URL}/pages/myprofile`} component={MyProfile}/>
                                <ProtectedRoute path={`${process.env.PUBLIC_URL}/profile/update`} component={UpdateProfile}/>
                                <ProtectedRoute path={`${process.env.PUBLIC_URL}/password/update`} component={UpdatePassword}/>
                                <Route path={`${process.env.PUBLIC_URL}/pages/addproduct`} component={Addproduct}/>
                                <Route path={`${process.env.PUBLIC_URL}/pages/addevent`} component={Addevent}/>
                                <ProtectedRoute path={`${process.env.PUBLIC_URL}/pages/mystore`} component={MyStoreProfile}/>
                                <ProtectedRoute path={`${process.env.PUBLIC_URL}/update/store/:id`} component={UpdateStore}/>
                                <ProtectedRoute path={`${process.env.PUBLIC_URL}/pages/myproducts`} component={MyProducts}/>
                                <ProtectedRoute path={`${process.env.PUBLIC_URL}/orders/me`} component={ListOrders}/>
                                <ProtectedRoute path="/myorder/:id" component={OrderDetails}  />


                                <Route path={`${process.env.PUBLIC_URL}/pages/myevents`} component={MyEvents}/>
                                <Route path={`${process.env.PUBLIC_URL}/pages/eventsdisplay`} component={Eventsdisplay}/>
                                <Route path={`${process.env.PUBLIC_URL}/pages/searchresult`} component={Searchresult}/>



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
                                <Route path={`${process.env.PUBLIC_URL}/stores`} component={GridCols}/>

							


                                {/* Admin */}
                                <ProtectedRoute path="/dashboard" isAdmin={true} component={Dashboard}  />
                                <ProtectedRoute path="/admin/products" isAdmin={true} component={ProductsList} exact />



                                {/*subscription*/}
                                <Route path={`${process.env.PUBLIC_URL}/pages/subscription`} component={Subscription}/>
                                <Elements stripe={stripe}>
                                   <ProtectedRoute path={`${process.env.PUBLIC_URL}/payment`}  component={Payment} />
                                   <ProtectedRoute path={`${process.env.PUBLIC_URL}/order/payment`}  component={CheckoutPayment} />
                                </Elements>
                                

                                
                               

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

ReactDOM.render(<Root />, document.getElementById('root'));


