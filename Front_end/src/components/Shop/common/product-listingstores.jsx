import React, {Component} from 'react';
import { connect } from 'react-redux'
import {Link} from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';


import { getTotal, getCartProducts } from '../../../reducers'
import { addToCart } from '../../../actions'
import {getMinMaxPrice, getVisibleStoreproducts} from '../../../services';
import ProductListItem from "./product-list-item";
import { getProducts } from '../../../actions/productActions';

class ProductListingStore extends Component {

    constructor (props) {
        super (props)

        this.state = { limit: 5, hasMoreItems: true };

    }

    componentWillMount(){
        this.fetchMoreItems();
    }

    fetchMoreItems = () => {
        if (this.state.limit >= this.props.storeproducts.length) {
            this.setState({ hasMoreItems: false });
            return;
        }
        // a fake async api call
        setTimeout(() => {
            this.setState({
                limit: this.state.limit + 5
            });
        }, 3000);


    }

    render (){
        const { addToCart} = this.props;
        const products=this.props.products;
        const {symbol}=this.props.symbol;
        const currencydiff=this.props.currencydiff;
        return (
            <div>
                <div className="product-wrapper-grid">
                    <div className="container-fluid">
                        {this.props.storeproducts.length > 0 ?
                            <InfiniteScroll
                                dataLength={this.state.limit} //This is important field to render the next data
                                next={this.fetchMoreItems}
                                hasMore={this.state.hasMoreItems}

                                endMessage={
                                    <p className="seen-cls seen-it-cls">
                                        <b>End of Products!</b>
                                    </p>
                                }
                            >
                                <div className="row">
                                    { this.props.storeproducts.map((product, index) =>
                                        <div className={`${this.props.colSize===3?'col-xl-3 col-md-6 col-grid-box':'col-lg-'+this.props.colSize}`} key={index}>
                                        <ProductListItem product={product} symbol={symbol} currencydiff={currencydiff}
                                                         onAddToCartClicked={addToCart} key={index}/>
                                        </div>)
                                    }
                                </div>
                            </InfiniteScroll>
                            :
                            <div className="row">
                                <div className="col-sm-12 text-center section-b-space mt-5 no-found" >
                                    <img src={`${process.env.PUBLIC_URL}/assets/images/empty-search.jpg`} className="img-fluid mb-4" />
                                    <h3>There are no products for the store!!</h3>
                                    <p></p>
                                    <Link to={`${process.env.PUBLIC_URL}/left-sidebar/collection`} className="btn btn-solid">Browse Products</Link>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    allproducts:state.allproducts,
    storeproducts: getVisibleStoreproducts(state.allproducts,state.storeDetails.store._id,state.filters.valuestore,state.filters.valueDTstore,state.filters.sortByStore,state.symbol,state.currencydiff),
    filters:state.filters,
    symbol:state.symbol,
    currencydiff:state.currencydiff,
    storeDetails:state.storeDetails
})
const mapDispatchToProps = dispatch => {
    return {
        addToCart:(product,qty)=>dispatch(addToCart(product,qty))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(ProductListingStore)
