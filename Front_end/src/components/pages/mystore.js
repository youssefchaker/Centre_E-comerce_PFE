import React, {Component} from 'react';
import Breadcrumb from "../common/breadcrumb";
import {connect} from 'react-redux'
import SimpleReactValidator from 'simple-react-validator';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getStoreProducts, updateProduct,deleteProduct } from '../../actions/productActions';
class Mystore extends Component {
    constructor(props){
    super(props);
    this.state = {
        isLoading:false,
        updatefield:null,
        updatevalue:null,
        productid:null,
        inputfield:null
    }
    this.validator=new SimpleReactValidator();
      }
      componentWillMount=()=>{
        this.props.getStoreProducts("603a42db810c623de4f7dd04");
      }
      openSearch=(field,id,detail="")=> {
        document.getElementById("update-overlay").style.display = "block";
        if(field=="name"||field=="desc"){
            this.setState({inputtype:"text"});
        }
        else if(field=="price"||field=="stock"){
            this.setState({inputtype:"number"}); 
        }
        this.setState({updatefield:field});
        this.setState({productid:id});
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
              if(this.state.updatefield=="name"){
                this.props.updateProduct(this.state.productid,{"name":this.state.updatevalue});
                toast.success("product name updated!!");
                setTimeout("location.reload(true);",2000);
              }
              else if(this.state.updatefield=="price"){
                this.props.updateProduct(this.state.productid,{"price":this.state.updatevalue});
                toast.success("product price updated!!");
                setTimeout("location.reload(true);",2000);
              }
              else if(this.state.updatefield=="stock"){
                this.props.updateProduct(this.state.productid,{"stock":this.state.updatevalue});
                toast.success("product stock updated!!");
                setTimeout("location.reload(true);",2000);
              }
              else if(this.state.updatefield=="desc"){
                this.props.updateProduct(this.state.productid,{"description":this.state.updatevalue});
                toast.success("product description updated!!");
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
        var productsarray = [];
        var productdetails=[]
        this.props.storeproducts.products.products.map((pr)=>{
            productsarray.push(pr);
        })
        productsarray.map((pr)=>{
            productdetails.push(pr.details)
        })
       
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
                                                    <button onClick={()=>this.openSearch("name",product._id)} >Update Product Name</button>
                                                </div>
                                                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                    <div  className="field-label">Product Price</div>
                                                    <div>{product.price}</div>
                                                    <button onClick={()=>this.openSearch("price",product._id)} >Update Product Price</button>
                                                </div>
                                                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                    <div className="field-label">Product Stock</div>
                                                    <div>{product.stock}</div>
                                                    <button onClick={()=>this.openSearch("stock",product._id)} >Update Product Stock</button>
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
                                                    <label className="field-label" for="ProductDetailValue">Product Detail Value</label>
                                                    <div name="ProductDetailValue">{ detail.value }</div>
                                                    </div>
                                                    ))}
                                                </div>
                                                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                <label className="field-label" for="ProductImage">Product Images</label>
                                                {product.images.map((image)=>(
                                                        <div>
                                                        
                                                    <img src={image} alt="product image"></img>
                                                    </div>
                                                    ))}
                                                </div>
                                                <div className="form-group col-md-12 col-sm-12 col-xs-12">
                                                <label className="field-label" for="ProductDescription">Product Description</label>
                                                    <div  name="ProductDescription">{product.description}</div>
                                                    <button onClick={()=>this.openSearch("desc",product._id)} >Update Product Description</button>
                                                </div>  
                                                <div className="form-group col-md-12 col-sm-12 col-xs-12">
                                                <button type="submit" className="btn btn-solid" onClick={()=>this.handledelete(product._id)}>Delete Product</button>
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
                                                    {this.state.inputtype=="text"?<input type="text" name="updatevalue" className="form-control" placeholder="Enter new value" onChange={this.setStateFromInput} value={this.state.updatevalue} />
                                                    :<input type="number" name="updatevalue" className="form-control" placeholder="Enter new value" onChange={this.setStateFromInput} value={this.state.updatevalue} min="0" />}
                                                    {this.validator.message('new value', this.state.updatevalue, 'required')}
                                                    </div>
                                                <button type="submit" onClick={this.handlesubmit} className="btn btn-primary" style={{marginRight:"-35px"}}><i className="fa fa-check"></i></button>
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