import React, {Fragment,Component} from 'react';
import Breadcrumb from "../common/breadcrumb";
import {connect} from 'react-redux'
import SimpleReactValidator from 'simple-react-validator';
import 'react-toastify/dist/ReactToastify.css';
import { getStoreProducts, updateProduct,deleteProduct, updateProductDetails } from '../../actions/productActions';
import {Link} from 'react-router-dom'
import { toast } from 'react-toastify';
import Loader from "react-loader-spinner";
import { MDBDataTable } from 'mdbreact'
import { UPDATE_PRODUCT_DETAIL_RESET, UPDATE_PRODUCT_RESET,DELETE_PRODUCT_RESET } from '../../constants/productConstants';

class MyProducts extends Component {
    constructor(props){
    super(props);
    this.state = {
        isLoading:false,
        updatefield:null,
        updatevalue:null,
        updatevaluetext:null,
        updatevalueimage:null,
        updatevaluenumber:null,
        updatevaluecategory:null,
        updatevaluediscount:null,
        productid:null,
        inputfield:null,
        detail:null,
        detailid:null,
        ProductImages:[],
        
    }
    this.validator=new SimpleReactValidator();
      }
      componentWillMount=()=>{
        this.props.getStoreProducts(this.props.userStore.store._id);
        
      }
      componentDidUpdate(){
        if(this.props.updateproduct.isUpdated){
            
            toast.success("Product has been updated!!");
            this.props.history.push('/pages/mystore');
            this.props.updatereset();
        }
        if(this.props.updateproductdetail.isUpdated){
            toast.success("Product Detail has been updated!!");
            this.props.history.push('/pages/mystore');
            this.props.updatedetailreset();
        }
        if(this.props.deleteproduct.isDeleted){
            toast.error("Product has been deleted!!");
            this.props.history.push('/pages/mystore');
            this.props.deleteproductreset();
        }
    }
      openSearch=(field,id,detail="",detailid="")=> {
        document.getElementById("update-overlay").style.display = "block";
        if(field=="name"||field=="desc" || field=="detailname" || field=="detailvalue"){
            this.setState({inputtype:"text"});
        }
        else if(field=="price"||field=="stock"){
            this.setState({inputtype:"number"}); 
        }
        else if(field=="discount"){
            this.setState({inputtype:"discount"}); 
        }
        else if(field=="category"){
            this.setState({inputtype:"category"}); 
        }
        else if(field=="image"){
            this.setState({inputtype:"image"}); 
        }
        this.setState({updatefield:field});
        this.setState({productid:id});
        this.setState({detail:detail});
        this.setState({detailid:detailid});
    }

    closeSearch() {
        document.getElementById("update-overlay").style.display = "none";
    }

    handledelete=id=>{
        this.props.deleteProduct(id);
    }

    handlesubmit=(e)=>{
        e.preventDefault(); 
          if(!this.validator.allValid()  && this.state.updatevaluetext==null && this.state.updatevaluecategory==null && this.state.updatevalueimage==null&& this.state.updatevaluediscount==null&& this.state.updatevaluenumber==null){
            this.validator.showMessages();
            this.forceUpdate();
          }
          else{
              if(this.state.updatefield=="name"){
                this.props.updateProduct(this.state.productid,{"name":this.state.updatevaluetext});
              }
              else if(this.state.updatefield=="price"){
                this.props.updateProduct(this.state.productid,{"price":this.state.updatevaluenumber});
              }
              else if(this.state.updatefield=="stock"){
                this.props.updateProduct(this.state.productid,{"stock":this.state.updatevaluenumber});
              }
              else if(this.state.updatefield=="desc"){
                this.props.updateProduct(this.state.productid,{"description":this.state.updatevaluetext});
              }     
              else if(this.state.updatefield=="discount"){
                this.props.updateProduct(this.state.productid,{"discount":this.state.updatevaluediscount});
              }  
              else if(this.state.updatefield=="category"){ 
                this.props.updateProduct(this.state.productid,{"category":this.state.updatevaluecategory});
              }
              else if(this.state.updatefield=="detailname"){ 
                this.props.updateProductDetails(this.state.detailid,{"detailname":this.state.updatevaluetext,"value":this.state.detail});
              }
              else if(this.state.updatefield=="detailvalue"){ 
                this.props.updateProductDetails(this.state.detailid,{"detailname":this.state.detail,"value":this.state.updatevaluetext});
              }
              else if(this.state.updatefield=="image"){ 
                
                
                this.props.updateProduct(this.state.productid,{"images":this.state.ProductImages});
            }
            
          }
      }
    setStateFromInput = (event) => {
        var obj = {};
        obj[event.target.name] = event.target.value;
        this.setState(obj);
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
        const {storeproducts,loading}=this.props;
        const loadingpr=this.props.updateProduct.loading
        const loadingdet=this.props.updateproductdetail.loading
        const loadingdel=this.props.updateproductdetail.loading
        const setProducts = () => {
        const data = {
            columns: [
                {
                    label: 'Image',
                    field: 'image',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Price',
                    field: 'price',
                    sort: 'asc'
                },
                {
                    label: 'Stock',
                    field: 'stock',
                    sort: 'asc'
                },
                {
                    label: 'Discount',
                    field: 'discount',
                    sort: 'asc'
                },
                {
                    label: 'Description',
                    field: 'description',
                    sort: 'asc'
                },

                {
                    label: 'Category',
                    field: 'category',
                    sort: 'asc'
                },
                {
                    label: 'Product Detail',
                    field: 'productdetail',
                    sort: 'asc'
                },
                {
                    label: 'Product Detail value',
                    field: 'productdetailvalue',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }
        if (storeproducts) {
            storeproducts.products.products.forEach(product => {
                data.rows.push({
                    image:<img className="update" onClick={()=>this.openSearch("image",product._id)} src = {product.images[0].url} style = {{width:'80px',height:'80px'}}></img>,
                    name: <div className="update" onClick={()=>this.openSearch("name",product._id)}>{product.name}</div>,
                    price: <div className="update" onClick={()=>this.openSearch("price",product._id)}>{product.price}</div>,
                    stock: <div className="update" onClick={()=>this.openSearch("stock",product._id)}>{product.stock}</div>,
                    discount: <div className="update" onClick={()=>this.openSearch("discount",product._id)} >{product.discount}</div>,
                    description:<div className="update" onClick={()=>this.openSearch("desc",product._id)}>{product.description}</div>,
                    category: <div className="update" onClick={()=>this.openSearch("category",product._id)} >{product.category}</div>,
                    productdetail:<div> {product.details.map((detail)=>(<div className="update" onClick={()=>this.openSearch("detailname",product._id,detail.value,detail._id)}  name="ProductDetail">{detail.detailname }</div>))} </div>,
                    productdetailvalue:<div>{product.details.map((detail)=>(<div className="update" onClick={()=>this.openSearch("detailvalue",product._id,detail.detailname,detail._id)}  name="ProductDetailValue">{detail.value }</div>))}</div>,
                    actions: <Fragment>
                        <button className="btn btn-danger py-1 px-2 ml-2" style={{borderRadius:'4px'}}  onClick={() => this.handledelete(product._id)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </Fragment>
                })
            })
        }
        return data;
    }
        return (
            <div>
                <Breadcrumb title={'My Store'}/>
                <section className="section-b-space">
                    <div className="container padding-cls">
                        <div className="checkout-page">
                            <div className="checkout-form" >
                                    <div className="checkout row">
                                    <div className="account-sidebar">

                                </div>
                                <div className="dashboard-left">
                                    <div className="block-content">
                                        <ul>
                                        <Link to={`${process.env.PUBLIC_URL}/pages/myprofile`}><li><a>My Profile</a></li></Link>
                                        <Link to={`${process.env.PUBLIC_URL}/pages/mystore`}><li><a>My Store</a></li></Link>
                                        <Link to={`${process.env.PUBLIC_URL}/orders/me`}><li><a>My Orders</a></li></Link>
                                        <Link to={`${process.env.PUBLIC_URL}/pages/myevents`}><li><a>My Events</a></li></Link>
                                        <Link to={`${process.env.PUBLIC_URL}/cart`}><li><a>My Cart</a></li></Link>
                                        <Link to={`${process.env.PUBLIC_URL}/`}><li className="last"><a href="#">Log Out</a></li></Link>
                                        </ul>
                                    </div>
                                    <div className="block-content">
                                        <ul>
                                        <Link to={`${process.env.PUBLIC_URL}/pages/myproducts`}><li className="active"><a>My Products</a></li></Link>   
                                        <Link to={`${process.env.PUBLIC_URL}/pages/addproduct`}><li><a>Add Product</a></li></Link>

                                        </ul>
                                    </div>
                                </div>
                                <Fragment>
            
            {/*SEO Support*/}

                <div className="col-10 col-md-10">
                    <Fragment>

                        {loading ||loadingdel ? <div style={{ textAlign: "center" }}><Loader
                             type="Rings"
                             color="#cc2121"
                             height={200}
                             width={300}
                /></div> : (
                            <MDBDataTable
                                data={setProducts()}
                                className="px-3"
                                bordered
                                striped
                                hover
                            />
                        )}

                    </Fragment>
                </div>

        </Fragment>
                              
                                        <div className="col-lg-8 col-sm-12 col-xs-12">
                                        
                                        <div id="update-overlay" className="search-overlay">
                                        <div>
                                        <span className="closebtn" onClick={this.closeSearch} title="Close Overlay">×</span>
                                                <div className="overlay-content">
                                                <div className="container">
                                                <div className="row">
                                                <div className="col-xl-12">
                                                {loadingdet || loadingpr ? <div style={{ textAlign: "center" }}><Loader
                             type="Rings"
                             color="#cc2121"
                             height={200}
                             width={300}
                /></div> :
                                                <form>
                                                    <div className="form-group">
                                                    {this.state.inputtype=="text"?<input type="text" name="updatevaluetext" className="form-control" placeholder="Enter new value" onChange={this.setStateFromInput} value={this.state.updatevaluetext} />
                                                    :this.state.inputtype=="number"?<input type="number" name="updatevaluenumber" className="form-control" placeholder="Enter new value" onChange={this.setStateFromInput} value={this.state.updatevaluenumber} min="0" />
                                                    :this.state.inputtype=="discount"?<select  name="updatevaluediscount" onChange={this.setStateFromInput} value={this.state.updatevaluediscount}>
                                                        <option>-----</option><option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option><option value="24">24</option><option value="25">25</option><option value="26">26</option><option value="27">27</option><option value="28">28</option><option value="29">29</option><option value="30">30</option><option value="31">31</option><option value="32">32</option><option value="33">33</option><option value="34">34</option><option value="35">35</option><option value="36">36</option><option value="37">37</option><option value="38">38</option><option value="39">39</option><option value="40">40</option><option value="41">41</option><option value="42">42</option><option value="43">43</option><option value="44">44</option><option value="45">45</option><option value="46">46</option><option value="47">47</option><option value="48">48</option><option value="49">49</option><option value="50">50</option><option value="51">51</option><option value="52">52</option><option value="53">53</option><option value="54">54</option><option value="55">55</option><option value="56">56</option><option value="57">57</option><option value="58">58</option><option value="59">59</option><option value="60">60</option><option value="61">61</option><option value="62">62</option><option value="63">63</option><option value="64">64</option><option value="65">65</option><option value="66">66</option><option value="67">67</option><option value="68">68</option><option value="69">69</option><option value="70">70</option><option value="71">71</option><option value="72">72</option><option value="73">73</option><option value="74">74</option><option value="75">75</option><option value="76">76</option><option value="77">77</option><option value="78">78</option><option value="79">79</option><option value="80">80</option><option value="81">81</option><option value="82">82</option><option value="83">83</option><option value="84">84</option><option value="85">85</option><option value="86">86</option><option value="87">87</option><option value="88">88</option><option value="89">89</option><option value="90">90</option><option value="91">91</option><option value="92">92</option><option value="93">93</option><option value="94">94</option><option value="95">95</option><option value="96">96</option><option value="97">97</option><option value="98">98</option><option value="99">99</option><option value="100">100</option>
                                                    </select>:this.state.inputtype=="category"?
                                                    <select name="updatevaluecategory" onChange={this.setStateFromInput} value={this.state.updatevaluecategory}>
                                                    <option>-----</option>
                                                    <option>Electronics</option>
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
                                                    </select>:
                                                    <div><input id="img" onChange={this.handleimages} type="file" name="updatevalueimage" accept="image/*" multiple /><div className="field-label" style={{border: '1px solid #ccc',display: 'inline-block', padding: '15px 20px', cursor: 'pointer', borderRadius: '3px', margin: '0.4em auto'}}>Maximum Image Dimensions :   <span><small> "512 x 512"</small></span></div>
</div>}
                                                    {this.state.inputtype=="text"?this.validator.message('new value', this.state.updatevaluetext, 'required'):this.state.inputtype=="number"?this.validator.message('new value', this.state.updatevaluenumber, 'required'):this.state.inputtype=="discount"?this.validator.message('new discount value', this.state.updatevaluediscount, 'required'):this.state.inputtype=="category"?this.validator.message('new category value', this.state.updatevaluecategory, 'required'):this.validator.message('new image', this.state.ProductImages, 'required')}
                                                    </div>
                                                <button type="submit" onClick={this.handlesubmit} className="btn btn-primary" style={{marginRight:"-35px"}}><i className="fa fa-check"></i></button>
                                                </form>}
                                                </div>
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
        deleteproduct:state.deleteproduct,
        updateproductdetail:state.updateproductdetail,
        userStore:state.userStore,
        symbol:state.symbol,
        currencydiff:state.currencydiff
      }
}
const mapDispatchToProps = dispatch => {
    return {
        getStoreProducts: (id) => dispatch(getStoreProducts(id)),
        updateProduct:(id,productdata)=>dispatch(updateProduct(id,productdata)),
        deleteProduct:(id)=>dispatch(deleteProduct(id)),
        updateProductDetails:(id,productdata)=>dispatch(updateProductDetails(id,productdata)),
        updatereset:()=>dispatch({type:UPDATE_PRODUCT_RESET}),
        updatedetailreset:()=>dispatch({type:UPDATE_PRODUCT_DETAIL_RESET}),
        deleteproductreset:()=>dispatch({type:DELETE_PRODUCT_RESET})
    }
}
export default connect(mapStateToProps,mapDispatchToProps) (MyProducts)
