import React, {Component} from 'react';
import Breadcrumb from "../common/breadcrumb";
import {connect} from 'react-redux'
import SimpleReactValidator from 'simple-react-validator';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Link} from 'react-router-dom';
import { getStoreProducts } from '../../actions/productActions';
import store from "../../store"
class Mystore extends Component {
    constructor(props){
    super(props);
      }
      componentDidMount=()=>{
        this.props.getStoreProducts("603a42db810c623de4f7dd04");
      }

    handledelete=product=>{
        toast.warn("Product deleted !")
    }

    handleupdate=field=>{
    }

    render (){
        const {storeproducts}=this.props
        var productsarray = [];
        var productdetails=[]
        for(const i=0;i<storeproducts.length;i++){
            productsarray.push(storeproducts[i]);
            console.log(storeproducts[i]);
        }
        for(const j=0;j<productsarray.length;j++){
            productdetails[j]=productsarray[j].details;
        }
        
        return (
            <div>0
                <Breadcrumb title={'My Store'}/>
                <section className="section-b-space">
                    <div className="container padding-cls">
                        <div className="checkout-page">
                            <div className="checkout-form" >
                                    <div className="checkout row">
                                    <div className="account-sidebar">

                                </div>
                                <div className="dashboard-left">
                                    <div className="collection-mobile-back">
                                    <span className="filter-back">
                                        <i className="fa fa-angle-left" aria-hidden="true"></i> back
                                    </span>
                                    </div>
                                    <div className="block-content">
                                        <ul>
                                            <li><a href='./pages/myprofile'>My Profile</a></li>
                                            <li className="active"><a href="./pages/mystore">My Store</a></li>
                                            <li><a href="./pages/myorders">My Orders</a></li>
                                            <li><a href="./pages/myevents">My Events</a></li>
                                            <li><a href="../cart">My Cart</a></li>
                                            <li><a href="#">Change Password</a></li>
                                            <li className="last"><a href="#">Log Out</a></li>
                                        </ul>
                                    </div>
                                    <div className="block-content">
                                        <ul>
                                            <li><a href='./pages/addproduct'>Add Product</a></li>
                                        </ul>
                                    </div>
                                </div>
                                        <div className="col-lg-6 col-sm-12 col-xs-12">
                                        {productsarray.map((product,index)=>(
                                            <div className="row check-out">
                                                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                    <div className="field-label">Product Name</div>
                                                    <button onClick={()=>this.handleupdate("name")} >Update Product Name</button>
                                                    <input type="text" name="upprn" hidden></input>
                                                </div>
                                                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                    <div  className="field-label">Product Price</div>
                                                    <div>{product.price}</div>
                                                    <button >Update Product Price</button>
                                                </div>
                                                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                    <div className="field-label">Product Stock</div>
                                                    <div>{product.stock}</div>
                                                    <button >Update Product Stock</button>
                                                </div>
                                                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                    <div className="field-label">Product Category</div>
                                                    <div>{product.category}</div>
                                                    <button >Update Product Category</button>
                                                </div>
                                                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                    <div className="field-label">Product Details</div>
                                                    {productdetails[index].map((detail)=>(
                                                        <div>
                                                        <label for="ProductDetail">Product Detail</label>
                                                    <div name="ProductDetail">{detail.detailname }</div>
                                                    <button >Update Product Detail</button>
                                                    <label for="ProductDetailValue">Product Detail Value</label>
                                                    <div name="ProductDetailValue">{ detail.value }</div>
                                                    <button >Update Product Detail Value</button>
                                                    </div>
                                                    ))}
                                                </div>
                                                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                {product.images.map((image)=>(
                                                        <div>
                                                        <label for="ProductImage">Product Image</label>
                                                    <img src={image} alt="product image"></img>
                                                    <button >Update Product Image</button>
                                                    </div>
                                                    ))}
                                                </div>
                                                <div className="form-group col-md-12 col-sm-12 col-xs-12">
                                                <label for="ProductDescription">Product Description</label>
                                                    <div className="field-label" name="ProductDescription">{product.description}</div>
                                                    <button >Update Product Description</button>
                                                </div>  
                                                <div className="form-group col-md-12 col-sm-12 col-xs-12">
                                                <button type="submit" className="btn btn-solid" onClick={this.handledelete}>Delete Product</button>
                                                </div>                                           
                                            </div>
                                        ))} 
                                        </div>
                </div>
                <div>
                </div>
            </div>
            </div>
            </div>
            </section>
            </div>
        )
    }
}
const mapStateToProps=state=>{
    return {
        storeproducts:state.storeproducts
      }
}
const mapDispatchToProps = dispatch => {
    return {
        getStoreProducts: (id) => dispatch(getStoreProducts(id))
    }
}
export default connect(mapStateToProps,mapDispatchToProps) (Mystore)