import React, {Component} from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.scss';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import SimpleReactValidator from 'simple-react-validator';
import ReactStars from "react-rating-stars-component";
import { deleteReview,  getProductReviews,  newReview, updateReview } from '../../../actions/productActions';
class DetailsTopTabs extends Component {
    constructor(props){
        super(props);
        this.state={
            Rating:3,
            Comment:null,
            updatevalue:null,
            updatefield:null,
            inputtype:null,
            other:null,
            reviewid:null,
            userid:null

        }
        this.validator = new SimpleReactValidator();
        this.validator2 = new SimpleReactValidator();
    }
    componentWillMount() {
        this.props.getProductReviews(this.props.product._id);
        if(this.props.auth.user!=undefined){
            this.setState({userid:this.props.auth.user._id})
        }
    }
    openSearch=(field,reviewid,other)=> {
        document.getElementById("update-overlay").style.display = "block";
        if(field=="comment"){
            this.setState({inputtype:"text"});
        }
        else if(field=="rating"){
            this.setState({inputtype:"number"}); 
        }
        this.setState({updatefield:field});
        this.setState({reviewid:reviewid});
        this.setState({other:other});

    }
    closeSearch() {
        document.getElementById("update-overlay").style.display = "none";
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
            this.props.newReview(this.props.product._id,{"userid":this.state.userid,"rating":this.state.Rating,"comment":this.state.Comment});
            toast.success("Review added !");
            setTimeout("location.reload(true);",2000);
          }
          
 
      }
       ratingChanged = (newRating) => {
        this.setState({Rating:newRating});
      };
      handleupdate=(e)=>{
        e.preventDefault(); 
          if(!this.validator2.allValid()){
            this.validator2.showMessages();
            this.forceUpdate();
          }
          else{
              if(this.state.updatefield=="comment"){
                this.props.updateReview(this.state.reviewid,{"rating":this.state.other,"comment":this.state.updatevalue});
                toast.success("review comment updated!!");
                setTimeout("location.reload(true);",2000);
              }
              else if(this.state.updatefield=="rating"){
                if(this.state.updatevalue>5 || this.state.updatevalue<0){
                    toast.warn("the new rating value must be between 0 and 5!!");
                }
                else{
                this.props.updateReview(this.state.reviewid,{"rating":parseInt(this.state.updatevalue,10),"comment":this.state.other});
                toast.success("review rating updated!!");
                setTimeout("location.reload(true);",2000);
                }
              }    
          }
      }
      handledelete=(reviewid,productid)=>{
        this.props.deleteReview(reviewid,productid);
        toast.error("Review deleted !");
        setTimeout("location.reload(true);",2000);
    }
    render (){
        const reviews=this.props.productreviews.reviews.reviews;
        const usernames=this.props.productreviews.reviews.usernames;
        return (
            <div>
            <section className="tab-product m-0">
                <div className="row">
                    <div className="col-sm-12 col-lg-12">
                        <Tabs className="tab-content nav-material">
                            <TabList className="nav nav-tabs nav-material">
                                <Tab className="nav-item">
                                    <span className="nav-link active">
                                        <i className="icofont icofont-ui-home"></i>Details</span>
                                    <div className="material-border"></div>
                                </Tab>
                                <Tab className="nav-item">
                                    <span className="nav-link" ><i className="icofont icofont-man-in-glasses"></i>Description</span>
                                    <div className="material-border"></div>
                                </Tab>
                                <Tab className="nav-item">
                                    <span className="nav-link" >
                                        <i className="icofont icofont-contacts"></i>Reviews</span>
                                    <div className="material-border"></div>
                                </Tab>
                                <Tab className="nav-item">
                                    <span className="nav-link" >
                                        <i className="icofont icofont-contacts"></i>Write Review</span>
                                    <div className="material-border"></div>
                                </Tab>
                            </TabList>
                            <TabPanel className="tab-pane fade mt-4 show active">
                                <table className="table table-striped mb-0">
                                {this.props.product.details.map((detail)=>(
                                    <tbody>
                                    <tr>
                                        <th>{detail.detailname}</th>
                                        <td>{detail.value}</td>
                                    </tr>
                                    </tbody>
                                ))}      
                                </table>
                            </TabPanel>
                            <TabPanel>
                            
                                <p className="mt-4 p-0">
                                    {this.props.product.description}
                                </p>
                            </TabPanel>
                            <TabPanel>
                            {this.props.product.reviews.length!==0?
                                <table className="table table-striped mb-0">
                                    <tr>
                                        <th>Delete Review</th>
                                        <th>Reviewer</th>
                                        <td>Update Comment</td>
                                        <th>Comment</th>
                                        <td>Update Rating</td>
                                        <th>Rating</th>
                                    </tr>
                                {reviews.map((review,index)=>(
                                    
                                    <tbody>
                                    <tr>
                                    <td><button  onClick={()=>this.handledelete(review._id,this.props.product._id)}><span>×</span></button></td>
                                        <td>{usernames[index].firstname}{' '}{usernames[index].lastname}</td>
                                        <td >{this.state.userid==review.user?<button className="fa fa-edit" onClick={()=>this.openSearch("comment",review._id,review.rating)}></button>:''}</td>
                                        <td>{review.comment}</td>
                                        <td >{this.state.userid==review.user?<button className="fa fa-edit" onClick={()=>this.openSearch("rating",review._id,review.comment)}></button>:''}</td>
                                        <td><b>{review.rating}/5</b></td>
                                    </tr>
                                    </tbody>
                                ))}      
                                </table>
                            :<h3>No current Reviews for this product</h3>}
                            
                            </TabPanel>
                            <TabPanel>
                                <form className="theme-form mt-4">
                                    <div className="form-row">
                                        <div className="col-md-12 ">
                                            <div className="media m-0">
                                            <div className="field-label" style={{marginTop:"7px"}}>Rating</div>
                                                    <ReactStars
                                                    name="rating"
                                                    onChange={this.setStateFromInput} value={this.state.Rating}
                                                        count={5}
                                                        onChange={this.ratingChanged}
                                                        size={24} 
                                                        activeColor="#ffd700" />
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <label htmlFor="review">Review Content</label>
                                            <textarea className="form-control" name="Comment" placeholder="Wrire Your Review Here" rows="6" onChange={this.setStateFromInput} value={this.state.Comment}></textarea>
                                            {this.validator.message('Comment', this.state.Comment, 'required')}
                                        </div>
                                        <div className="col-md-12">
                                            <button className="btn btn-solid" type="submit" onClick={this.handlesubmit}>Submit YOur Review</button>
                                        </div>
                                    </div>
                                </form>
                            </TabPanel>
                        </Tabs>
                    </div>
                </div>
            </section>
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
                                                     :<input type="number" name="updatevalue" className="form-control" placeholder="Enter new value" onChange={this.setStateFromInput} value={this.state.updatevalue} min="0" max="5" />}  

                                                    {this.state.inputtype=="text"?this.validator2.message('new value', this.state.updatevalue, 'required'):this.validator2.message('new value', this.state.updatevalue, 'required|between:0,5')}
                                                    </div>
                                                <button type="submit" onClick={this.handleupdate} style={{marginRight:"-35px"}} className="btn btn-primary"><i className="fa fa-check"></i></button>
                                                </form>
                                                </div>
                                                </div>
                                                </div>
                                                </div> 
                                        </div>
                                        </div>
                                        </div>
            
        )
    }
}

const mapStateToProps=state=>{
    return {
        newreview:state.newreview,
        deleteproductreview:state.deleteproductreview,
        updateproductreview:state.updateproductreview,
        productreviews:state.productreviews,
        auth:state.auth
      }
}
const mapDispatchToProps = dispatch => {
    return {
        newReview:(id,reviewData)=>dispatch(newReview(id,reviewData)),
        deleteReview:(reviewid,productid)=>dispatch(deleteReview(reviewid,productid)),
        updateReview:(id,reviewData)=>dispatch(updateReview(id,reviewData)),
        getProductReviews:(id)=>dispatch(getProductReviews(id))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(DetailsTopTabs);
