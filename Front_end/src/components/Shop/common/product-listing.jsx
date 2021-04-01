import React, {Component} from 'react';
import { connect } from 'react-redux'
import {Link} from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';


import { getTotal, getCartProducts } from '../../../reducers'
import { addToCart } from '../../../actions'
import {getVisibleproducts} from '../../../services';
import ProductListItem from "./product-list-item";
import { getProducts } from '../../../actions/productActions';

class ProductListing extends Component {

    constructor (props) {
        super (props)

        this.state = { limit: 5, hasMoreItems: true };

    }


    componentWillMount(){
        this.fetchMoreItems();
        this.props.getProducts();
    }

    fetchMoreItems = () => {
        if (this.state.limit >= this.props.products.length) {
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
        const {allproducts, addToCart} = this.props;
        const products=allproducts.products;
        return (
            <div>
                <div className="product-wrapper-grid">
                    <div className="container-fluid">
                        {products.length > 0 ?
                            <InfiniteScroll
                                dataLength={this.state.limit} //This is important field to render the next data
                                next={this.fetchMoreItems}
                                hasMore={this.state.hasMoreItems}
                                loader={<div className="loading-cls"></div>}
                                endMessage={
                                    <p className="seen-cls seen-it-cls">
                                        <b>Yay! You have seen it all</b>
                                    </p>
                                }
                            >
                                <div className="row">
                                    { products.slice(0, this.state.limit).map((product, index) =>
                                        <div className={`${this.props.colSize===3?'col-xl-3 col-md-6 col-grid-box':'col-lg-'+this.props.colSize}`} key={index}>
                                        <ProductListItem product={product} symbol={"€"}
                                                         onAddToCartClicked={addToCart} key={index}/>
                                        </div>)
                                    }
                                </div>
                            </InfiniteScroll>
                            :
                            <div className="row">
                                <div className="col-sm-12 text-center section-b-space mt-5 no-found" >
                                    <img src={`${process.env.PUBLIC_URL}/assets/images/empty-search.jpg`} className="img-fluid mb-4" />
                                    <h3>Sorry! Couldn't find the product you were looking For!!!    </h3>
                                    <p>Please check if you have misspelt something or try searching with other words.</p>
                                    <Link to={`${process.env.PUBLIC_URL}/`} className="btn btn-solid">continue shopping</Link>
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
    products: getVisibleproducts(state.allproducts,state.category,state.store,state.price,state.sortby),
    symbol: state.data.symbol,
    category:state.category,
    store:state.store,
    price:state.price,
    sortby:state.sortby
})
const mapDispatchToProps = dispatch => {
    return {
        getProducts: () => dispatch(getProducts()),
        addToCart:(product,qty)=>dispatch(addToCart(product,qty))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(ProductListing)