import React, {Component} from 'react';
import {connect} from 'react-redux'
import Breadcrumb from "../common/breadcrumb";
import SimpleReactValidator from 'simple-react-validator';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Link} from 'react-router-dom';
import {newProduct, clearErrors} from '../../actions/productActions'
import Loader from "react-loader-spinner";
import { NEW_PRODUCT_RESET } from '../../constants/productConstants';
class Addproduct extends Component {
    constructor(props){
    super(props);
    this.state = {
        StoreName:'',
        ProductName:'',
        ProductPrice:0,
        ProductImages:[],
        ProductImage:null,
        ProductDescription:'',
        Productnumber:1,
        ProductStock:0,
        ProductCategory:"Electronics",
        ProductDetail:"",
        ProductDetailValue:"",
        ProductDetails:[],
        ProductDetailsValues:[],
        ProductDiscount:0,
        details:[],
        
    }
    this.validator = new SimpleReactValidator();
    this.validator2 = new SimpleReactValidator();
    this.validator3 = new SimpleReactValidator();
    }
    componentWillMount(){
        this.props.productreset();

    }
    
    componentDidUpdate(){
        if(this.props.newproduct.success){
            
            toast.success("New Product Added !");
            this.props.history.push('/pages/myproducts');
            this.props.productreset();
        }
        if ( this.props.newproduct.error ) {
            toast.error(" Size Error ! Images size must be under 2mb ");
            this.props.clearErrors();
            this.props.history.push('/pages/myproducts');
        }
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
            this.setState({ProductDetail:""});
            this.setState({ProductDetailValue:""});
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
            var i=0;
            this.state.ProductDetails.push(this.state.ProductDetail);
            this.state.ProductDetailsValues.push(this.state.ProductDetailValue);
            while(i<this.state.ProductDetails.length){
                this.state.details.push({"detailname":this.state.ProductDetails[i],"value":this.state.ProductDetailsValues[i]});
                i++;
            }
            if(this.state.ProductImages.length>3){
                toast.warn("Only a maximum of 3 images are allowed for 1 product");
            }
            else if(this.state.ProductPrice<0){
                toast.warn("The product Price must be a positive number")
            }
            else if(this.state.ProductStock<0){
                toast.warn("The product Stock must be a positive number")
            }
            else{
                const formData = new FormData();
                formData.set('mystore', this.props.userStore.store._id);
                formData.set('name', this.state.ProductName);
                formData.set('price', this.state.ProductPrice);
                formData.set('description', this.state.ProductDescription);
                formData.set('stock', this.state.ProductStock);
                formData.set('category', this.state.ProductCategory);
                formData.set('discount', this.state.ProductDiscount);
                formData.append('details', JSON.stringify(this.state.details))
                this.state.ProductImages.forEach(image => {
                    formData.append('images', image)
                })
            this.props.newProduct(formData);
            }
          }
      }
      handlelist=(e)=>{
        this.setState({ProductCategory:e.target.value});
      }
      handleimages=(e)=>{
        
        const files = Array.from(e.target.files)
            this.setState({ProductImages:[]})
        files.forEach(file => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    this.state.ProductImages.push(reader.result)
                }
            }
            reader.readAsDataURL(file)
        }) 
      }
    render (){
        const {loading}=this.props.newproduct
        return (
            <div>
                <Breadcrumb title={'Add product'}/>
                {loading ? <div style={{ textAlign: "center" }}><Loader
                             type="Rings"
                             color="#cc2121"
                             height={200}
                             width={300}
                /></div> :
                <section className="section-b-space">
                    <div className="container padding-cls">
                        <div className="checkout-page">
                            <div className="checkout-form" >
                            <form>
                                    <div className="checkout row">
                                        <div className="col-lg-6 col-sm-12 col-xs-12">
                                            <div className="checkout-title">
                                                <h3>New Product Information</h3>
                                            </div>
                                            <div className="row check-out">
                                    <div className="form-group col-md-12 col-sm-12 col-xs-12">
                                        <div className="field-label">Product Name *</div>
                                        <input type="text" name="ProductName" onChange={this.setStateFromInput} value={this.state.ProductName} />
                                                    {this.validator.message('ProductName', this.state.ProductName, 'required')}
                                    </div>
                                    <div className="form-group col-md-12 col-sm-12 col-xs-12">
                                        <div className="field-label">Product Price(€) *</div>
                                        <input  type="number" name="ProductPrice" onChange={this.setStateFromInput} value={this.state.ProductPrice} min="0"  />
                                                    {this.validator.message('ProductPrice', this.state.ProductPrice, 'required|min:0')}
                                    </div>
                                    <div className="form-group col-md-12 col-sm-12 col-xs-12">
                                        <div className="field-label">Product Stock *</div>
                                        <input type="number" name="ProductStock" onChange={this.setStateFromInput} value={this.state.ProductStock} min="0" />
                                                    {this.validator.message('ProductStock', this.state.ProductStock, 'required|min:0')}
                                    </div>
                                    <div className="form-group col-md-12 col-sm-12 col-xs-12">
                                        <div className="field-label">Product Category *</div>
                                        <select name="ProductCategory" onChange={(e)=>this.handlelist(e)} value={this.state.ProductCategory}>
                                                    <option defaultValue>Electronics</option>
                                                    <option>Cameras</option>
                                                    <option>Laptops</option>
                                                    <option>Accessories</option>
                                                    <option>Phones&Tablets</option>
                                                    <option>Food</option>
                                                    <option>Books</option>
                                                    <option>Fashion</option>
                                                    <option>Beauty&Health</option>
                                                    <option>Sports</option>
                                                    <option>Outdoor</option>
                                                    <option>Home</option>
                                                    <option>Other</option>
                                                    </select>
                                    </div>
                                    <div className="form-group col-md-12 col-sm-12 col-xs-12">
                                        <div className="field-label">Product Discount(%)</div>
                                        <select  name="ProductDiscount" onChange={this.setStateFromInput} value={this.state.ProductDiscount}>
                                                        <option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option><option value="24">24</option><option value="25">25</option><option value="26">26</option><option value="27">27</option><option value="28">28</option><option value="29">29</option><option value="30">30</option><option value="31">31</option><option value="32">32</option><option value="33">33</option><option value="34">34</option><option value="35">35</option><option value="36">36</option><option value="37">37</option><option value="38">38</option><option value="39">39</option><option value="40">40</option><option value="41">41</option><option value="42">42</option><option value="43">43</option><option value="44">44</option><option value="45">45</option><option value="46">46</option><option value="47">47</option><option value="48">48</option><option value="49">49</option><option value="50">50</option><option value="51">51</option><option value="52">52</option><option value="53">53</option><option value="54">54</option><option value="55">55</option><option value="56">56</option><option value="57">57</option><option value="58">58</option><option value="59">59</option><option value="60">60</option><option value="61">61</option><option value="62">62</option><option value="63">63</option><option value="64">64</option><option value="65">65</option><option value="66">66</option><option value="67">67</option><option value="68">68</option><option value="69">69</option><option value="70">70</option><option value="71">71</option><option value="72">72</option><option value="73">73</option><option value="74">74</option><option value="75">75</option><option value="76">76</option><option value="77">77</option><option value="78">78</option><option value="79">79</option><option value="80">80</option><option value="81">81</option><option value="82">82</option><option value="83">83</option><option value="84">84</option><option value="85">85</option><option value="86">86</option><option value="87">87</option><option value="88">88</option><option value="89">89</option><option value="90">90</option><option value="91">91</option><option value="92">92</option><option value="93">93</option><option value="94">94</option><option value="95">95</option><option value="96">96</option><option value="97">97</option><option value="98">98</option><option value="99">99</option><option value="100">100</option>
                                                    </select>
                                    </div>
                                    
                                    <div className="form-group col-md-12 col-sm-12 col-xs-12">
                                        <div className="field-label">Product Description *</div>
                                        <textarea name="ProductDescription" rows="4" cols="50" onChange={this.setStateFromInput} value={this.state.ProductDescription} ></textarea>       
                                        {this.validator.message('ProductDescription', this.state.ProductDescription, 'required')}
                                    </div>
                                    <div className="form-group col-md-12 col-sm-12 col-xs-12">
                                    <form id="detailsform">
                                        <div className="field-label">Product Details *</div>
                                        <label htmlFor="ProductDetail">Product Detail </label>
                                        <input type="text" name="ProductDetail" onChange={this.setStateFromInput} value={this.state.ProductDetail} id="1" /><br></br>
                                                    {this.validator.message('ProductDetail', this.state.ProductDetail, 'required')}
                                                    {this.validator2.message('ProductDetail', this.state.ProductDetail, 'required')}    
                                        <label htmlFor="ProductDetailValue">Product Detail Value </label>
                                        <input type="text" name="ProductDetailValue" onChange={this.setStateFromInput} value={this.state.ProductDetailValue} id="2" />
                                                    {this.validator.message('ProductDetailValue', this.state.ProductDetailValue, 'required')}
                                                    {this.validator2.message('ProductDetailValue', this.state.ProductDetailValue, 'required')}
                                        <button  className="btn btn-solid" name="submitdetail" type="submit" onClick={this.handleDetails}>submit and add Details</button>
                                        
                                    </form>
                                    </div>
                                    <div className="form-group col-md-12 col-sm-12 col-xs-12">
                                        <div className="field-label">Product Images *</div>
                                        <div className="field-label" style={{border: '1px solid #ccc',display: 'inline-block', padding: '15px 20px', cursor: 'pointer', borderRadius: '3px', margin: '0.4em auto'}}>Maximum Image Dimensions :   <span><small> "1920 x 1080"</small></span> <h6>*A maximum of 3 Images under 2mb are allowed for 1 product</h6></div>
                                        <input type="file" id="img" name="ProductImages" accept="image/*" onChange={this.handleimages} multiple />
                                                    {this.validator.message('ProductImages', this.state.ProductImages, 'required')}
                                    </div>
                                    </div>
                                        </div>
                </div>
                <div>
                    <button type="submit" className="btn btn-solid" style={{marginTop:"25px"}} onClick={this.handlesubmit}>Submit Product</button>
                </div>
                </form>
                                
            </div>
            </div>
            </div>
            
            </section>
        }
            </div>
        )
    }
    
}

const mapStateToProps=state=>{
    return {
        newproduct:state.newproduct,
        userStore:state.userStore
      }
}

const mapDispatchToProps = dispatch => {
    return {
        newProduct: (productData) => dispatch(newProduct(productData)),
        productreset:()=> dispatch({type:NEW_PRODUCT_RESET}),
        clearErrors: () => dispatch(clearErrors())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Addproduct)
