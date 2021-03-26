import React, {Component} from 'react';
import { connect } from 'react-redux'
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import { SlideToggle } from 'react-slide-toggle';


import {getCategories, getMinMaxPrice,getStores} from '../../../services';
import {filterCategory, filterStore, filterPrice} from '../../../actions'
import { getProducts, getStoreName } from '../../../actions/productActions';

class Filter extends Component {

    constructor(props) {
        super(props);

        this.state = {
            openFilter: false,
            products:[],
            productscategory:[],
            productsstore:[],
            productsprice:[],
        }
    }
    componentDidMount=()=>{
        this.props.getProducts();        
      }
    closeFilter = () => {
        document.querySelector(".collection-filter").style = "left: -365px";
    }

    clickCategoryHendle(event) {
        var filteredproducts=[];
        var unfilteredproducts=[];
        this.props.allproducts.products.filter(product => product.category !== event.target.value).map(filteredproduct =>{
            filteredproducts.push(filteredproduct);
        })
        this.props.allproducts.products.filter(product => product.category === event.target.value).map(unfilteredproduct =>{
            unfilteredproducts.push(unfilteredproduct);
        })
        if(event.target.checked){
            

            this.setState({productscategory:unfilteredproducts}); 
        }
        else{
            const uniq = [...new Set(this.state.productscategory.concat(filteredproducts.concat(unfilteredproducts)))];
            
            this.setState({productscategory:uniq}); 
            //const unfilteredproducts=filteredproducts.filter(x => !this.state.productscategory.includes(x))
            
        }
        this.combinefilters();
    }

    storeHandle(event){
        var filteredproducts=[];
        var unfilteredproducts=[];
        this.props.allproducts.products.filter(product => product.store !== event.target.value).map(filteredproduct =>{
            filteredproducts.push(filteredproduct);
        })
        this.props.allproducts.products.filter(product => product.store === event.target.value).map(unfilteredproduct =>{
            unfilteredproducts.push(unfilteredproduct);
        })
        if(event.target.checked){
            this.setState({productsstore:unfilteredproducts}); 
            
        }
        else{
            const uniq = [...new Set(this.state.productsstore.concat(filteredproducts.concat(unfilteredproducts)))];
            
            this.setState({productsstore:uniq}); 
        }
        this.combinefilters();
    }
    priceHandle(e){
        var filteredproducts=[];
        var unfilteredproducts=[];
        this.props.allproducts.products.filter(product => product.store < e.target.value).map(unfilteredproduct =>{
            unfilteredproducts.push(unfilteredproduct);
        })
            
            const uniq = [...new Set(unfilteredproducts)];
            
            this.setState({productsprice:uniq});
            this.combinefilters(); 
    }
     combinefilters(){
        this.setState({products:this.state.productsstore.concat(this.state.productsprice.concat(this.state.productscategory))});
    }

    render (){
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
                                                    <input type="checkbox" onClick={(e) => this.clickCategoryHendle(e)} value={category} className="custom-control-input" id={category} />
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
                                                    <input type="checkbox" onClick={(e) => this.storeHandle(e)} value={store} className="custom-control-input" id={store} />
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
                                                maxValue={this.props.prices["max"]}
                                                minValue={this.props.prices["min"]}
                                                onChange={e => this.priceHandle(e)} />
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
    stores: getStores(state.allproducts.products),
    prices: getMinMaxPrice(state.allproducts.products),
    filters: state.filters,
    allproducts:state.allproducts,
    storename:state.storename
})
const mapDispatchToProps = dispatch => {
    return {
        getProducts: () => dispatch(getProducts()),
        getStoreName:(id)=>dispatch(getStoreName(id))
    }
}
export default connect(
    mapStateToProps,mapDispatchToProps,null,
    { filterCategory, filterStore, filterPrice }
)(Filter);