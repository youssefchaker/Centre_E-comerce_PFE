import React, {Component} from 'react';
import { connect } from 'react-redux'
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import { SlideToggle } from 'react-slide-toggle';
import {getMinMaxPriceStore,getMinMaxPriceDTStore, getVisibleStoreproducts} from '../../../services';
import {filterPriceStore,filterPriceDTStore} from '../../../actions'

class filterstore extends Component {

    constructor(props) {
        super(props);

        this.state = {
            openFilter: false,
        }
    }
    closeFilter = () => {
        document.querySelector(".collection-filter").style = "left: -365px";
    }


    render (){
        const symbol=this.props.symbol.symbol;
        return (
                <div className="collection-filter-block">
                    {/*category filter start*/}
                    <div className="collection-mobile-back">
                        <span className="filter-back" onClick={(e) => this.closeFilter(e)} >
                            <i className="fa fa-angle-left" aria-hidden="true"></i> back
                        </span>
                    </div>
                    {this.props.products!==0?<SlideToggle>
                        {({onToggle, setCollapsibleElement}) => (
                            <div className="collection-collapse-block open">
                                <h3 className="collapse-block-title" onClick={onToggle}>price({symbol})</h3>
                                <div className="collection-collapse-block-content block-price-content" ref={setCollapsibleElement}>
                                    <div className="collection-brand-filter">
                                    {symbol==="DT"?
                                    <div className="custom-control custom-checkbox collection-filter-checkbox">
                                            <InputRange
                                                maxValue={this.props.pricestoreDT.max}
                                                minValue={this.props.pricestoreDT.min}
                                                value={this.props.filters.valueDTstore}
                                                onChange={value => this.props.filterPriceDTStore({ value })} />
                                        </div>:
                                        <div className="custom-control custom-checkbox collection-filter-checkbox">
                                            <InputRange
                                                maxValue={this.props.pricestore.max}
                                                minValue={this.props.pricestore.min}
                                                value={this.props.filters.valuestore}
                                                onChange={value => this.props.filterPriceStore({ value })} />
                                        </div>}
                                        
                                    </div>
                                </div>
                            </div>
                        )}
                    </SlideToggle>:''}
                    
                </div>
        )
    }
}


const mapStateToProps = state => ({
    pricestore:getMinMaxPriceStore(state.allproducts.products,state.storeDetails.store._id),
    pricestoreDT:getMinMaxPriceDTStore(state.allproducts.products,state.currencydiff,state.storeDetails.store._id),
    filters: state.filters,
    symbol:state.symbol,
    currencydiff:state.currencydiff,
    storeDetails:state.storeDetails,
    allproducts:state.allproducts,
    products: getVisibleStoreproducts(state.allproducts,state.storeDetails.store._id,state.filters.valuestore,state.filters.valueDTstore,state.sortBy,state.symbol,state.currencydiff)
})

export default connect(mapStateToProps,{filterPriceStore,filterPriceDTStore  })(filterstore);
