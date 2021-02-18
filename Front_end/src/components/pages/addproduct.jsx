import React, {Component} from 'react';
import Breadcrumb from "../common/breadcrumb";
import SimpleReactValidator from 'simple-react-validator';
class Addproduct extends Component {
    constructor(props){
    super(props);
    this.state = {
        ProductName:'',
        ProductPrice:0,
        ProductImage:null,
        ProductDescription:'',
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
                                <form onSubmit={this.handlesubmit}>
                                    <div className="checkout row">
                                    <div className="form-group col-md-12 col-sm-12 col-xs-12">
                                                    <button type="submit" className="btn btn-solid" onClick={this.handleduplicate}>Add Product</button>
                                                </div>
                                        <div className="col-lg-6 col-sm-12 col-xs-12" id="dup">
                                            <div className="checkout-title">
                                                <h3>Product</h3>
                                            </div>
                                            <div className="row check-out">
                                                <div className="form-group col-md-6 col-sm-6 col-xs-12">
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
                <div>
                    <button type="submit" className="btn btn-solid" >Submit products</button>
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