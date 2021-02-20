import React, {Component} from 'react';
import Breadcrumb from "../common/breadcrumb";
import SimpleReactValidator from 'simple-react-validator';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
class Addproduct extends Component {
    constructor(props){
    super(props);
    this.state = {
        ProductName:'',
        ProductPrice:null,
        ProductImage:null,
        ProductDescription:'',
        Productnumber:1
    }
    this.validator = new SimpleReactValidator();
    }
    setStateFromInput = (event) => {
        var obj = {};
        obj[event.target.name] = event.target.value;
        this.setState(obj);
      }
      handlesubmit=(e)=>{
        e.preventDefault(); 
          if(!this.validator.allValid()){
            this.validator.showMessages();
            this.forceUpdate();
          }
          else{
            toast.success("product added !");
          }
 
      }
  /* handleduplicate=(e)=>{
       e.preventDefault();
       var original=document.getElementById("1");
       this.setState({Productnumber:this.state.Productnumber+1});
       var clone = original.cloneNode(true); // "deep" clone
    clone.hidden=false;
    original.parentNode.appendChild(clone);
   }*/
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
                                        <div className="col-lg-6 col-sm-12 col-xs-12" id="1">
                                            <div className="checkout-title">
                                                <h3>Product {this.state.Productnumber}</h3>
                                            </div>
                                            <div className="row check-out">
                                                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                    <div className="field-label">ProductName</div>
                                                    <input type="text" name="ProductName" onChange={this.setStateFromInput} value={this.state.ProductName} />
                                                    {this.validator.message('ProductName', this.state.ProductName, 'required|alpha')}
                                                </div>
                                                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                    <div  className="field-label">ProductPrice</div>
                                                    <input  type="text" name="ProductPrice" onChange={this.setStateFromInput} value={this.state.ProductPrice} />
                                                    {this.validator.message('ProductPrice', this.state.ProductPrice, 'required|integer')}
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
                    <button type="submit" className="btn btn-solid" onClick={this.handlesubmit}>Submit products</button>
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