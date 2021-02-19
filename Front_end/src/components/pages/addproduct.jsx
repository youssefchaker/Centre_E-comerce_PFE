import React, {Component} from 'react';
import Breadcrumb from "../common/breadcrumb";
import SimpleReactValidator from 'simple-react-validator';
/* import FormErrors from './product validation/index'; */
class Addproduct extends Component {
    constructor(props){
    super(props);
    this.state = {
        ProductName:'',
        ProductPrice:'',
        ProductImage:null,
        ProductDescription:'',
        ProductNumber:null
        
        
        
    }
    this.validator = new SimpleReactValidator();

    }
    setStateFromInput = (event) => {
        var obj = {};
        obj[event.target.name] = event.target.value;
        this.setState(obj);

      }
      validation = (event) => {
    
    
        if(!this.validator.allValid())
        {
            this.validator.showMessages();
            this.forceUpdate();

        }
      }
      
   handleduplicate=(e)=>{
    
       
       this.productcount=this.productcount+1;
       e.preventDefault();
       var original=document.getElementById("dup");
       var clone = original.cloneNode(true); // "deep" clone
    clone.id ="";
    // or clone.id = ""; if the divs don't need an ID
    original.parentNode.appendChild(clone);
    this.setState({ProductNumber:this.state.ProductNumber+1});
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
                                                <h3>Product {this.state.ProductNumber}</h3>
                                            </div>
                                            <div className="row check-out">
                                                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                    <div className="field-label">Product Name</div>
                                                    <input type="text" name="ProductName" value={this.state.ProductName} onChange={this.setStateFromInput} />
                                                    {this.validator.message('ProductName', this.state.ProductName, 'required|alpha')}
                                                    {/* <FormErrors formErrors={this.state.formErrors} /> */}
                                                    <div style={{color:'red' , fontSize:'13'}}></div>
                                                </div>
                                                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                    <div  className="field-label">Product Price</div>
                                                    <input  type="text" name="ProductPrice" value={this.state.ProductPrice} onChange={this.setStateFromInput} />
                                                    {this.validator.message('ProductPrice', this.state.ProductPrice, 'required|integer')}
                                                    {/* <FormErrors formErrors={this.state.formErrors} /> */}
                                                    <div style={{color:'red' , fontSize:'13'}}></div>
                                                </div>
                                                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                    <div className="field-label">Product Image</div>
                                                    <input type="file" name="ProductImage" value={this.state.ProductImage}  accept="image/*" onChange={this.setStateFromInput} />
                                                    {this.validator.message('ProductImage', this.state.ProductImage, 'required')}
                                                    {/* <FormErrors formErrors={this.state.formErrors} /> */}
                                                    <div style={{color:'red' , fontSize:'13'}}></div>
                                                </div>
                                                <div className="form-group col-md-12 col-sm-12 col-xs-12">
                                                    <div className="field-label">Product Description</div>
                                                    <textarea name="ProductDescription" rows="15" cols="30" value={this.state.ProductDescription} onChange={this.setStateFromInput} ></textarea>
                                                    {this.validator.message('ProductDescription', this.state.ProductDescription, 'required|alpha')}
                                                    {/* <FormErrors formErrors={this.state.formErrors} /> */}
                                                    <div style={{color:'red' , fontSize:'13'}}></div>
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
                <div style={{marginTop:'15px'}} >
                    <button type="submit" className="btn btn-solid" name="validate" onChange={this.validation} >Submit products</button>
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