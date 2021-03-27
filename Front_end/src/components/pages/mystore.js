import React, {Component} from 'react';
import Breadcrumb from "../common/breadcrumb";
import {connect} from 'react-redux'
import SimpleReactValidator from 'simple-react-validator';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Link} from 'react-router-dom';
import { getStoreProducts, updateProduct,deleteProduct } from '../../actions/productActions';
import store from "../../store"
class Mystore extends Component {
    constructor(props){
    super(props);
    this.state = {
        isLoading:false,
        updatefield:null,
        updatevalue:null,
        productid:null
    }
    this.validator=new SimpleReactValidator();
      }
      componentDidMount=()=>{
        this.props.getStoreProducts("603a42db810c623de4f7dd04");
      }
      openSearch=(field,id,detail="")=> {
        document.getElementById("update-overlay").style.display = "block";
        this.state.updatefield=field;
        this.state.productid=id;
    }

    closeSearch() {
        document.getElementById("update-overlay").style.display = "none";
    }

    handledelete=id=>{
        this.props.deleteProduct(id);
        toast.error("Product deleted !");
        setTimeout("location.reload(true);",2000);
    }

    handlesubmit=(e)=>{
        e.preventDefault(); 
          if(!this.validator.allValid()){
            this.validator.showMessages();
            this.forceUpdate();
          }
          else{
              switch(this.state.updatefield){
                case "name":
                    this.props.updateProduct(this.state.productid,{"name":this.state.updatevalue});
                    setTimeout("location.reload(true);",2000);
                case "price":
                    this.props.updateProduct(this.state.productid,{"price":this.state.updatevalue});
                    setTimeout("location.reload(true);",2000);
                case "stock":
                    this.props.updateProduct(this.state.productid,{"stock":this.state.updatevalue});
                    setTimeout("location.reload(true);",2000);
              }

          }
      }
    setStateFromInput = (event) => {
        var obj = {};
        obj[event.target.name] = event.target.value;
        this.setState(obj);
      }

    render (){
    
        const {storeproducts}=this.props.storeproducts
        var productsarray = [];
        var productdetails=[]
        for(const i=0;i<storeproducts.length;i++){
            productsarray.push(storeproducts[i]);
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
                                                    <div>{product.name}</div>
                                                    <button onClick={()=>this.openSearch("name",product.id)} >Update Product Name</button>
                                                </div>
                                                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                    <div  className="field-label">Product Price</div>
                                                    <div>{product.price}</div>
                                                    <button onClick={()=>this.openSearch("price",product.id)} >Update Product Price</button>
                                                </div>
                                                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                    <div className="field-label">Product Stock</div>
                                                    <div>{product.stock}</div>
                                                    <button onClick={()=>this.openSearch("stock",product.id)} >Update Product Stock</button>
                                                </div>
                                                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                    <div className="field-label">Product Category</div>
                                                    <div>{product.category}</div>
                                                </div>
                                                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                    <div className="field-label">Product Details</div>
                                                    {productdetails[index].map((detail)=>(
                                                        <div>
                                                        <label for="ProductDetail">Product Detail</label>
                                                    <div name="ProductDetail">{detail.detailname }</div>
                                                    <label for="ProductDetailValue">Product Detail Value</label>
                                                    <div name="ProductDetailValue">{ detail.value }</div>
                                                    </div>
                                                    ))}
                                                </div>
                                                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                {product.images.map((image)=>(
                                                        <div>
                                                        <label for="ProductImage">Product Image</label>
                                                    <img src={image} alt="product image"></img>
                                                    </div>
                                                    ))}
                                                </div>
                                                <div className="form-group col-md-12 col-sm-12 col-xs-12">
                                                <label for="ProductDescription">Product Description</label>
                                                    <div className="field-label" name="ProductDescription">{product.description}</div>
                                                    <button >Update Product Description</button>
                                                </div>  
                                                <div className="form-group col-md-12 col-sm-12 col-xs-12">
                                                <button type="submit" className="btn btn-solid" onClick={()=>this.handledelete(product.id)}>Delete Product</button>
                                                </div>                                          
                                                </div>
                                            
                                        ))} 
                                        <div id="update-overlay" className="search-overlay">
                                        <div>
                                        <span className="closebtn" onClick={this.closeSearch} title="Close Overlay">×</span>
                                                <div className="overlay-content">
                                                <div className="container">
                                                <div className="row">
                                                <div className="col-xl-12">
                                                <form>
                                                    <div className="form-group">
                                                    <input type="text" name="updatevalue" className="form-control" placeholder="Enter new value" onChange={this.setStateFromInput} value={this.state.updatevalue} />
                                                    {this.validator.message('new value', this.state.updatevalue, 'required')}
                                                    </div>
                                                <button type="submit" onClick={this.handlesubmit} className="btn btn-primary"><i className="fa fa-check"></i></button>
                                                </form>
                                                </div>
                                                </div>
                                                </div>
                                                </div> 
                                        </div>
                                        </div>
                                        </div>
                                        <div>
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
        storeproducts:state.storeproducts,
        updateproduct:state.updateproduct,
        deleteproduct:state.deleteproduct
      }
}
const mapDispatchToProps = dispatch => {
    return {
        getStoreProducts: (id) => dispatch(getStoreProducts(id)),
        updateProduct:(id,productdata)=>dispatch(updateProduct(id,productdata)),
        deleteProduct:(id)=>dispatch(deleteProduct(id))
    }
}
export default connect(mapStateToProps,mapDispatchToProps) (Mystore)