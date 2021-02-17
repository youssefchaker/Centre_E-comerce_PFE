import React, {Component} from 'react';
import Breadcrumb from "../common/breadcrumb";
class Faq extends Component {
    constructor(props){
    super(props);
  }
   labelstyle={
       fontWeight:'bold',
       marginRight:'20px'
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
                <Breadcrumb title={'Faq'}/>
                {/*Dashboard section*/}
                <section className="faq-section section-b-space">
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
                                            <label for="pn" style={this.labelstyle}>Product Name</label>
                                            <input type="text" name="pn" ></input>
                                            </div>     
                                            <div>
                                            <label for="pp" style={this.labelstyle}>Product Price</label>
                                            <input type="text" name="pp" ></input>
                                            </div>
                                            <div>
                                            <label for="img" style={this.labelstyle}>Product Image</label>
                                            <input type="file" name="img" accept="image/*" ></input>
                                            </div>
                                            <div>
                                            <label for="desc" style={this.labelstyle}>Product Description</label>
                                            <textarea rows="15" cols="30" name="desc" ></textarea>
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
                </section>
            </div>
        )
    }
}
export default Faq