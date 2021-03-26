import React, {Component} from 'react';
import {connect} from 'react-redux'
import Breadcrumb from "../common/breadcrumb";
import SimpleReactValidator from 'simple-react-validator';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Link} from 'react-router-dom';
import {newProduct} from '../../actions/productActions'
class Addproduct extends Component {
    constructor(props){
    super(props);
    this.state = {
        ProductName:'',
        ProductPrice:null,
        ProductImage:[],
        ProductDescription:'',
        Productnumber:1,
        ProductStock:null,
        ProductCategory:"",
        ProductDetail:"",
        ProductDetailValue:"",
        ProductDetails:[],
        ProductDetailsValues:[],
        details:[]
    }
    this.validator = new SimpleReactValidator();
    this.validator2 = new SimpleReactValidator();
    }

    setStateFromInput = (event) => {
        var obj = {};
        obj[event.target.name] = event.target.value;
        this.setState(obj);
      }
    handleDetails=(e)=>{
        e.preventDefault(); 
        if(!this.validator2.allValid()){
            this.validator2.showMessages();
            this.forceUpdate();
          }
          else{
            this.state.ProductDetails.push(this.state.ProductDetail);
            this.state.ProductDetailsValues.push(this.state.ProductDetailValue);
            document.getElementById("1").value="";
            document.getElementById("2").value="";
            this.state.ProductDetail="";
            this.state.ProductDetailValue="";
            toast.success("New Product Detail Added!!");
          }
    }
      handlesubmit=(e)=>{
        e.preventDefault(); 
          if(!this.validator.allValid()){
            this.validator.showMessages();
            this.forceUpdate();
          }
          else{
            const formData = new FormData();
            var i=0;
            formData.set('name', this.state.ProductName);
            formData.set('price', this.state.ProductPrice);
            formData.set('images', this.state.ProductImage);
            formData.set('description', this.state.ProductDescription);
            formData.set('stock', this.state.ProductStock);
            formData.set('category', this.state.ProductCategory);
            this.state.ProductDetails.push(this.state.ProductDetail);
            this.state.ProductDetailsValues.push(this.state.ProductDetailValue);
            while(i<this.state.ProductDetails.length){
                this.state.details.push({"detailname":this.state.ProductDetails[i],"value":this.state.ProductDetails[i]});
                i++;
            }
            formData.set('details', this.state.details);
            this.props.newProduct(formData);
            toast.success("New Product Added!!");
          }
      }
    render (){
        return (
            <div>
                <Breadcrumb title={'Add product'}/>
                <section className="section-b-space">
                    <div className="container padding-cls">
                        <div className="checkout-page">
                            <div className="checkout-form" >
                                <form>
                                    <div className="checkout row">
                                        <div className="col-lg-6 col-sm-12 col-xs-12">
                                            <div className="checkout-title">
                                                <h3>Product {this.state.Productnumber}</h3>
                                            </div>
                                            <div className="row check-out">
                                                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                    <div className="field-label">Product Name</div>
                                                    <input type="text" name="ProductName" onChange={this.setStateFromInput} value={this.state.ProductName} />
                                                    {this.validator.message('ProductName', this.state.ProductName, 'required')}
                                                </div>
                                                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                    <div  className="field-label">Product Price</div>
                                                    <input  type="text" name="ProductPrice" onChange={this.setStateFromInput} value={this.state.ProductPrice} />
                                                    {this.validator.message('ProductPrice', this.state.ProductPrice, 'required|integer|min:0')}
                                                </div>
                                                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                    <div className="field-label">Product Stock</div>
                                                    <input type="text" name="ProductStock" onChange={this.setStateFromInput} value={this.state.ProductStock}/>
                                                    {this.validator.message('ProductStock', this.state.ProductStock, 'required|integer|min:0')}
                                                </div>
                                                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                    <div className="field-label">Product Category</div>
                                                    <select name="ProductCategory" onChange={this.setStateFromInput} value={this.state.ProductStock}>
                                                    <option>Tech</option>
                                                    <option>Fashion</option>
                                                    <option>Accessoires</option>
                                                    <option>Bags</option>
                                                    <option>Beauty</option>
                                                    <option>Food</option>
                                                    <option>Watchs</option>
                                                    </select>
                                                </div>
                                                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                    <form>
                                                    <div className="field-label">Product Details</div>
                                                    <label for="ProductDetail">Product Detail</label>
                                                    <input type="text" name="ProductDetail" onChange={this.setStateFromInput} value={this.state.ProductDetail} id="1" />
                                                    {this.validator.message('ProductDetail', this.state.ProductDetail, 'required')}
                                                    {this.validator2.message('ProductDetail', this.state.ProductDetail, 'required')}
                                                    <label for="ProductDetailValue">Product Detail Value</label>
                                                    <input type="text" name="ProductDetailValue" onChange={this.setStateFromInput} value={this.state.ProductDetailValue} id="2" />
                                                    {this.validator.message('ProductDetailValue', this.state.ProductDetailValue, 'required')}
                                                    {this.validator2.message('ProductDetailValue', this.state.ProductDetailValue, 'required')}
                                                    <button type="submit" onClick={this.handleDetails}>submit and add Details</button>
                                                    </form>
                                                </div>
                                                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                    <div className="field-label">Product Image</div>
                                                    <input type="file" id="img" name="ProductImage" accept="image/*" multiple onChange={this.setStateFromInput} value={this.state.ProductImage}  />
                                                    {this.validator.message('ProductImage', this.state.ProductImage, 'required')}
                                                </div>
                                                <div className="form-group col-md-12 col-sm-12 col-xs-12">
                                                    <div className="field-label">Product Description</div>
                                                    <textarea name="ProductDescription" rows="15" cols="30" onChange={this.setStateFromInput} value={this.state.ProductDescription} ></textarea>
                                                    {this.validator.message('ProductDescription', this.state.ProductDescription, 'required')}
                                                </div>                                        
                                            </div>
                                        </div>
                </div>
                <div>
                    <button type="submit" className="btn btn-solid" style={{marginTop:"25px"}} onClick={this.handlesubmit}>Submit product</button>
                </div>
                </form>
            </div>
            </div>
            </div>
            <div style={{textAlign:'center' , top:'50%'}}><Link to={`${process.env.PUBLIC_URL}/pages/myprofile`} ><a><button type="submit" className="btn btn-solid" >Finish Adding Products</button></a></Link></div>
            </section>
            </div>
        )
    }
    
}

const mapStateToProps=state=>{
    return {
        newproduct:state.newproduct
      }
}

const mapDispatchToProps = dispatch => {
    return {
        newProduct: (productData) => dispatch(newProduct(productData))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Addproduct)