import React, {Component} from 'react';
import Breadcrumb from "../common/breadcrumb";
import SimpleReactValidator from 'simple-react-validator';
/* import FormErrors from './product validation/index'; */
class Addproduct extends Component {
    constructor(props){
    super(props);
    this.state = {
        ProductName:'',
        ProductPrice:0,
        ProductImage:null,
        ProductDescription:'',
        formErrors: {ProductName:'', ProductPrice:'',ProductImage:null,ProductDescription:''},
        ProductNameValid: false,
        ProductPriceValid: false,
        ProductImageValid: false,
        ProductDescriptionValid: false,
        formValid: false
    }
    }
      validateField() {
        let fieldValidationErrors = this.state.formErrors;
        let ProductNameValid = this.state.emailValid;
        let ProductPriceValid = this.state.passwordValid;
        let ProductImageValid=this.state.ProductImageValid;
        let ProductDescriptionValid=this.state.ProductDescriptionValid;
            ProductNameValid=this.state.ProductName.value.length>0;
            fieldValidationErrors.ProductName = ProductNameValid ? '' : ' is empty';
                ProductPriceValid=this.state.ProductPrice.value.length<0;
                fieldValidationErrors.ProductPrice = ProductPriceValid ? '' : ' must have a value';
                ProductImageValid=this.state.ProductImage.value>0;
                fieldValidationErrors.ProductImage =ProductImageValid ? '' : ' must choose an image';
                ProductDescriptionValid=this.state.ProductDescription.value.length>0;
                fieldValidationErrors.ProductDescription =ProductDescriptionValid ? '' : ' is empty';
        this.setState({formErrors: fieldValidationErrors,
                        ProductNameValid: ProductNameValid,
                        ProductPriceValid: ProductPriceValid,
                        ProductImageValid: ProductImageValid,
                        ProductDescriptionValid: ProductDescriptionValid
                      }, this.validateForm);
      }
   handleduplicate=(e)=>{
       this.productcount=this.productcount+1;
       e.preventDefault();
       var original=document.getElementById("dup");
       var clone = original.cloneNode(true); // "deep" clone
    clone.id ="";
    // or clone.id = ""; if the divs don't need an ID
    original.parentNode.appendChild(clone);
   }
    render (){
        return (
            <div>
                <Breadcrumb title={'Add product'}/>
                <section className="section-b-space">
                    <div className="container padding-cls">
                        <div className="checkout-page">
                            <div className="checkout-form" >
                                <form onSubmit={this.validateField}>
                                    <div className="checkout row">
                                    <div className="form-group col-md-12 col-sm-12 col-xs-12">
                                                    <button type="submit" className="btn btn-solid" onClick={this.handleduplicate} >Add Product</button>
                                                </div>
                                        <div className="col-lg-6 col-sm-12 col-xs-12" id="dup">
                                            <div className="checkout-title">
                                                <h3>Product</h3>
                                            </div>
                                            <div className="row check-out">
                                                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                    <div className="field-label">ProductName</div>
                                                    <input type="text" name="ProductName"  />
                                                    {/* <FormErrors formErrors={this.state.formErrors} /> */}
                                                    <div style={{color:'red' , fontSize:'13'}}>{this.state.formErrors.ProductName}</div>
                                                </div>
                                                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                    <div  className="field-label">ProductPrice</div>
                                                    <input  type="number" name="ProductPrice"  />
                                                    {/* <FormErrors formErrors={this.state.formErrors} /> */}
                                                    <div style={{color:'red' , fontSize:'13'}}>{this.state.formErrors.ProductPrice}</div>
                                                </div>
                                                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                    <div className="field-label">ProductImage</div>
                                                    <input type="file" name="ProductImage"   accept="image/*"  />
                                                    {/* <FormErrors formErrors={this.state.formErrors} /> */}
                                                    <div style={{color:'red' , fontSize:'13'}}>{this.state.formErrors.ProductImage}</div>
                                                </div>
                                                <div className="form-group col-md-12 col-sm-12 col-xs-12">
                                                    <div className="field-label">ProductDescription</div>
                                                    <textarea name="ProductDescription" rows="15" cols="30" ></textarea>
                                                    {/* <FormErrors formErrors={this.state.formErrors} /> */}
                                                    <div style={{color:'red' , fontSize:'13'}}>{this.state.formErrors.ProductDescription}</div>
                                                </div>                                        
                                            </div>
                                        </div>
                {/*Dashboard section*/}
                {/*<section className="faq-section section-b-space">
                <form onSubmit={this.handleduplicate}>
                    <div className="container" >
                        <div className="row" style={{border:'solid'}} id="dup">
                            <div className="col-sm-12">
                                            <h2 className="mb-0">
                                                Product
                                            </h2>
                                        </div>
                                        <div id="collapseOne"  aria-labelledby="headingOne"
                                             data-parent="#accordionExample">
                                            <div className="card-body" >
                                            <div>
                                            <label for="ProductName" style={this.labelstyle}>ProductName</label>
                                            <input type="text" name="Product Name" ></input>
                                            </div>     
                                            <div>
                                            <label for="ProductPrice" style={this.labelstyle}>ProductPrice</label>
                                            <input type="number" name="Product Price" ></input>
                                            </div>
                                            <div>
                                            <label for="ProductImage" style={this.labelstyle}>ProductImage</label>
                                            <input type="file" name="Product Image" accept="image/*" ></input>
                                            </div>
                                            <div>
                                            <label for="ProductDescription" style={this.labelstyle}>ProductDescription</label>
                                            <textarea rows="15" cols="30" name="Product Description" ></textarea>
                                            </div>
                                            </div>
                                            <div>
                                        <button type="submit" className="btn btn-solid" >Add Product</button>
                                        </div>
                                        </div>
                                    </div>           
                                    </div>
                                    <div>
                                        <a className="btn btn-solid" >Submit Products</a>
                                        </div>
                                        </form>
                </section>*/}
                </div>
                <div >
                    <button type="submit" className="btn btn-solid" disabled={!this.state.formValid} >Submit products</button>
                </div>
                </form>
            </div>
            </div>
            </div>
            </section>
            </div>
        )
    }
}
export default Addproduct