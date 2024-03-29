import React, {Component} from 'react';
import { connect } from 'react-redux'
import {Link} from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { addToCart } from '../../../actions'
import { getVisibleproducts} from '../../../services';
import ProductListItem from "./product-list-item";
import Loader from "react-loader-spinner";

class ProductListing extends Component {

    constructor (props) {
        super (props)

        this.state = { limit: 5, hasMoreItems: true };

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
        const {loading}=this.props.allproducts
        const { addToCart} = this.props;
        const products=this.props.products;
        const storenames=this.props.allproducts.storenames;
        const {symbol}=this.props.symbol;
        const currencydiff=this.props.currencydiff;
        return (
            <div>
                <div className="product-wrapper-grid">
                    <div className="container-fluid">
                        {products.length > 0 ?
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
                                    { loading ? <div style={{ textAlign: "center" }}><Loader
                             type="Rings"
                             color="#cc2121"
                             height={200}
                             width={300}
                /></div> :products.length!==0?products.map((product, index) =>
                                        <div className={`${this.props.colSize===3?'col-xl-3 col-md-6 col-grid-box':'col-lg-'+this.props.colSize}`} key={index}>
                                        <ProductListItem product={product} symbol={symbol} currencydiff={currencydiff} storename={storenames[index]}
                                                         onAddToCartClicked={addToCart} key={index}/>
                                        </div>)
                                    :<h3>There are no products at the moment!</h3>}
                                </div>
                            </InfiniteScroll>
                            :
                            <div className="row">
                                <div className="col-sm-12 text-center section-b-space mt-5 no-found" >
                                    <img src={`${process.env.PUBLIC_URL}/assets/images/empty-search.jpg`} className="img-fluid mb-4" alt="no products" />
                                    <h3>Sorry! Couldn't find the product you were looking For!!!    </h3>
                                    <p>Please check your filter options.</p>
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
    products: getVisibleproducts(state.allproducts,state.filters.category,state.filters.store,state.filters.value,state.filters.valueDT,state.filters.sortBy,state.symbol,state.currencydiff),
    filters:state.filters,
    symbol:state.symbol,
    currencydiff:state.currencydiff
})
const mapDispatchToProps = dispatch => {
    return {
        addToCart:(product,qty)=>dispatch(addToCart(product,qty))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(ProductListing)
