import React, {Component} from 'react';
import Breadcrumb from "../common/breadcrumb";
import SimpleReactValidator from 'simple-react-validator';
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
      handlesubmit=(e)=>{

          if(!this.validator.allValid()){
            this.validator.showMessages();
          }
          e.preventDefault();  

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
                                <form onSubmit={this.handlesubmit}>
                                    <div className="checkout row">
                                    <div className="form-group col-md-12 col-sm-12 col-xs-12">
                                                    <button type="submit" className="btn btn-solid" onClick={this.handleduplicate}>Add Product</button>
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
                                                    <div className="field-label">ProductName</div>
                                                    <input type="text" name="ProductName" onChange={this.setStateFromInput} value={this.state.ProductName} />
                                                    {this.validator.message('ProductName', this.state.first_name, 'required|alpha')}
                                                </div>
                                                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                    <div  className="field-label">ProductPrice</div>
                                                    <input  type="number" name="ProductPrice" onChange={this.setStateFromInput} value={this.state.ProductPrice} />
                                                    {this.validator.message('ProductPrice', this.state.ProductPrice, 'required|number')}
                                                </div>
                                                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                    <div className="field-label">ProductImage</div>
                                                    <input type="file" name="ProductImage" accept="image/*" onChange={this.setStateFromInput} value={this.state.ProductImage}  />
                                                    {this.validator.message('ProductImage', this.state.ProductImage, 'required')}
                                                </div>
                                                <div className="form-group col-md-12 col-sm-12 col-xs-12">
                                                    <div className="field-label">ProductDescription</div>
                                                    <textarea name="ProductDescription" rows="15" cols="30" onChange={this.setStateFromInput} value={this.state.ProductDescription} ></textarea>
                                                    {this.validator.message('ProductDescription', this.state.ProductDescription, 'required|alpha')}

                                                </div>                                        
                                            </div>
                                        </div>
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