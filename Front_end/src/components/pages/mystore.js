import React, {Component} from 'react';
import Breadcrumb from "../common/breadcrumb";
import SimpleReactValidator from 'simple-react-validator';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Link} from 'react-router-dom';
class Mystore extends Component {
    constructor(props){
    super(props);
    this.state={
        productcount:1
    }
      }
    handledelete=product=>{
        toast.success("Product deleted !")
    }
    render (){
        return (
            <div>
                <Breadcrumb title={'My Store'}/>
                <section className="section-b-space">
                    <div className="container padding-cls">
                        <div className="checkout-page">
                            <div className="checkout-form" >
                                    <div className="checkout row">
                                    <div className="account-sidebar">
                                    <a className="popup-btn">
                                        My Profile
                                    </a>
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
                                            <div className="checkout-title">
                                                <h3>Product </h3>
                                            </div>
                                            <div className="row check-out">
                                                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                    <div className="field-label">Product Name</div>
                                                    <button >Update Product Name</button>
                                                </div>
                                                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                    <div  className="field-label">Product Price</div>
                                                    <button >Update Product Price</button>
                                                </div>
                                                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                    <div className="field-label">Product Stock</div>
                                                    <button >Update Product Stock</button>
                                                </div>
                                                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                    <div className="field-label">Product Category</div>
                                                    <button >Update Product Category</button>
                                                </div>
                                                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                    <div className="field-label">Product Details</div>
                                                    <label for="ProductDetail">Product Detail</label>
                                                    <button >Update Product Detail</button>
                                                    <label for="ProductDetailValue">Product Detail Value</label>
                                                    <button >Update Product Detail Value</button>
                                                </div>
                                                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                    <div className="field-label">Product Image</div>
                                                    <button >Update Product Image</button>
                                                </div>
                                                <div className="form-group col-md-12 col-sm-12 col-xs-12">
                                                    <div className="field-label">Product Description</div>
                                                    <button >Update Product Description</button>
                                                </div>  
                                                <div className="form-group col-md-12 col-sm-12 col-xs-12">
                                                <button type="submit" className="btn btn-solid" onClick={this.handledelete}>Delete Product</button>
                                                </div>                                           
                                            </div>
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
export default Mystore