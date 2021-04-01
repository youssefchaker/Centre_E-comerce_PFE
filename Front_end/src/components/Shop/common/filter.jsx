import React, {Component} from 'react';
import { connect } from 'react-redux'
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import { SlideToggle } from 'react-slide-toggle';


import {getCategories, getMinMaxPrice,getStores} from '../../../services';
import {filterCategory, filterStore, filterPrice} from '../../../actions'

class Filter extends Component {

    constructor(props) {
        super(props);

        this.state = {
            openFilter: false,
        }
    }
    closeFilter = () => {
        document.querySelector(".collection-filter").style = "left: -365px";
    }

    clickCategoryHendle(event,categories,index) {
        if (event.target.checked)
        categories.push(event.target.value); // push in array checked value
        else
        categories.splice(index, 1); // removed in array unchecked value

        this.props.filterCategory(categories);
    }

    storeHandle(event,stores,index){
        if (event.target.checked)
        stores.push(event.target.value); // push in array checked value
        else
        stores.splice(index, 1); // removed in array unchecked value

        this.props.filterStore(stores);
    }
    render (){
        const filteredcategories = []
        const filteredstores = []
        return (
                <div className="collection-filter-block">
                    {/*category filter start*/}
                    <div className="collection-mobile-back">
                        <span className="filter-back" onClick={(e) => this.closeFilter(e)} >
                            <i className="fa fa-angle-left" aria-hidden="true"></i> back
                        </span>
                    </div>
                    <SlideToggle>
                        {({onToggle, setCollapsibleElement}) => (
                            <div className="collection-collapse-block">
                                <h3 className="collapse-block-title" onClick={onToggle}>category</h3>
                                <div className="collection-collapse-block-content"  ref={setCollapsibleElement}>
                                    <div className="collection-brand-filter">
                                        {this.props.categories.map((category, index) => {
                                            return (
                                                <div className="custom-control custom-checkbox collection-filter-checkbox" key={index}>
                                                    <input type="checkbox" onClick={(e) => this.clickCategoryHendle(e,filteredcategories,index)} value={category} className="custom-control-input" id={category} /*defaultChecked={filteredcategories.includes(category)? true : false}*/ />
                                                    <label className="custom-control-label"
                                                           htmlFor={category}>{category}</label>
                                                </div> )
                                        })}
                                    </div>
                                </div>
                            </div>
                        )}
                    </SlideToggle>

                    {/*store filter start here*/}
                    <SlideToggle>
                    {({onToggle, setCollapsibleElement}) => (
                            <div className="collection-collapse-block">
                                <h3 className="collapse-block-title" onClick={onToggle}>store</h3>
                                <div className="collection-collapse-block-content"  ref={setCollapsibleElement}>
                                    <div className="collection-brand-filter">
                                        {this.props.stores.map((store, index) => {
                                            return (
                                                <div className="custom-control custom-checkbox collection-filter-checkbox" key={index}>
                                                    <input type="checkbox" onClick={(e) => this.storeHandle(e,filteredstores,index)} value={store} className="custom-control-input" id={store} /*defaultChecked={filteredstores.includes(store)? true : false}*/ />
                                                    <label className="custom-control-label"
                                                           htmlFor={store}>{store}</label>
                                                </div> )
                                        })}
                                    </div>
                                </div>
                            </div>
                        )}
                    </SlideToggle>
                    {/*price filter start here */}
                    <SlideToggle>
                        {({onToggle, setCollapsibleElement}) => (
                            <div className="collection-collapse-block open">
                                <h3 className="collapse-block-title" onClick={onToggle}>price</h3>
                                <div className="collection-collapse-block-content block-price-content" ref={setCollapsibleElement}>
                                    <div className="collection-brand-filter">
                                        <div className="custom-control custom-checkbox collection-filter-checkbox">
                                            <InputRange
                                                maxValue={this.props.prices.max}
                                                minValue={this.props.prices.min}
                                                value={this.props.price.value}
                                                onChange={value => this.props.filterPrice({ value })} />
                                                {console.log(this.props.prices)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </SlideToggle>
                </div>
        )
    }
}


const mapStateToProps = state => ({
    categories: getCategories(state.allproducts.products),
    stores: getStores(state.allproducts),
    prices: getMinMaxPrice(state.allproducts.products),
    category:state.category,
    store:state.store,
    price:state.price,
    sortby:state.sortby
})

const mapDispatchToProps=dispatch=>({
    filterCategory:(category)=>dispatch(filterCategory(category)),
    filterStore:(store)=>dispatch(filterStore(store)),
    filterPrice:(price)=>dispatch(filterPrice(price))
})
export default connect(mapStateToProps,mapDispatchToProps)(Filter);