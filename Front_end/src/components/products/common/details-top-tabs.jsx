import React, {Component} from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.scss';
import {connect} from 'react-redux'
import {  toast } from 'react-toastify';
import SimpleReactValidator from 'simple-react-validator';
import ReactStars from "react-rating-stars-component";
import { deleteReview,  getProductReviews,  newReview, updateReview } from '../../../actions/productActions';
import RatingDisplay from './product/ratingDisplay';
import Loader from "react-loader-spinner";
import { DELETE_REVIEW_RESET, NEW_REVIEW_RESET, UPDATE_REVIEW_RESET } from '../../../constants/productConstants';
class DetailsTopTabs extends Component {
    constructor(props){
        super(props);
        this.state={
            Rating:3,
            Comment:'',
            updatevalue:null,
            updatefield:null,
            inputtype:null,
            other:null,
            reviewid:null,
            userid:null,
            newrating:3

        }
        this.validator = new SimpleReactValidator();
        this.validator2 = new SimpleReactValidator();
    }
    componentWillMount() {
        this.props.getProductReviews(this.props.product._id);
    }
    componentDidUpdate(){
        if(this.props.newreview.success){
            
            toast.success("Review added !");
            setTimeout("location.reload(true);",500);
            this.props.reviewtreset();
        }
        if(this.props.deleteproductreview.isDeleted){
            toast.error("Review deleted !");
            setTimeout("location.reload(true);",500);
            this.props.deletereviewreset();
        }
        if(this.props.updateproductreview.isUpdated){
            
            toast.success("The review has been updated!!");
            setTimeout("location.reload(true);",500);
            this.props.updatereset();
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
            this.props.newReview(this.props.product._id,{"userid":this.props.auth.user._id,"rating":this.state.Rating,"comment":this.state.Comment});
          }
          
 
      }
       ratingChanged = (newRating) => {
        this.setState({Rating:newRating});
      };
      ratingChangedNew = (newRating) => {
        this.setState({newrating:newRating});
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
              }
              else if(this.state.updatefield=="rating"){
                if(this.state.newrating>5 || this.state.newrating<1){
                    toast.warn("the new rating value must be between 0 and 5!!");
                }
                else{
                    this.props.updateReview(this.state.reviewid,{"rating":parseInt(this.state.newrating,10),"comment":this.state.other});
                    }  
            }    
          }
      }
      handledelete=(reviewid,productid)=>{
        this.props.deleteReview(reviewid,productid);
    }
    render (){
        const {isAuthenticated}=this.props.auth;
        const {reviews,loading}=this.props.productreviews
        const usernames=reviews.usernames;
        const loadingdel=this.props.deleteproductreview.loading;
        const loadingup=this.props.updateproductreview.loading
        const loadingnew=this.props.newreview.loading
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
                                {this.props.product.details.map((detail,index)=>(
                                    <tbody key={index}>
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
                            {!isAuthenticated ?loading  ? <div style={{ textAlign: "center" }}><Loader
                             type="Rings"
                             color="#cc2121"
                             height={200}
                             width={300}
                /></div> : <table className="table table-striped mb-0">
                                <thead>
                                    <tr>
                                        
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                {reviews.reviews.map((review,index)=>(
                                    
                                    <tbody key={index}>
                                    <tr>
                                        <td>{usernames[index].firstname}{' '}{usernames[index].lastname}</td>
                                        <td>{review.comment}</td>
                                        <td><RatingDisplay rating={review.rating}></RatingDisplay></td>
                                        
                                    </tr>
                                    </tbody>
                                ))}      
                                </table> :loading ||loadingdel ? <div style={{ textAlign: "center" }}><Loader
                             type="Rings"
                             color="#cc2121"
                             height={200}
                             width={300}
                /></div> :reviews.reviews.length!=0?
                                <table className="table table-striped mb-0">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                {reviews.reviews.map((review,index)=>(                                
                                    <tbody key={index}>
                                    <tr>
                                        <td>{usernames[index].firstname}{' '}{usernames[index].lastname}</td>
                                        <td>{review.comment}</td>
                                        <td><RatingDisplay rating={review.rating}></RatingDisplay></td>

                                        {this.props.auth.user._id==review.user?<td>
                                        <button className="fa fa-pencil btn btn-primary py-1 px-2 ml-2" onClick={()=>this.openSearch("comment",review._id,review.rating)} style={{borderRadius:'4px'}}></button>
                                        <button className="fa fa-star btn btn-secondary py-1 px-2 ml-2" onClick={()=>this.openSearch("rating",review._id,review.comment)} style={{borderRadius:'4px'}}></button>
                                        <button className="btn btn-danger py-1 px-2 ml-2"  onClick={()=>this.handledelete(review._id,this.props.product._id)} style={{borderRadius:'4px'}}><i className="fa fa-trash"></i></button>
                                        </td>:''}
                                    </tr>
                                    </tbody>
                                ))}      
                                </table>
                            :<h3>No current Reviews for this product</h3>}
                            
                            </TabPanel>
                            
                            <TabPanel>
                            {isAuthenticated?loadingnew ? <div style={{ textAlign: "center" }}><Loader
                             type="Rings"
                             color="#cc2121"
                             height={200}
                             width={300}
                /></div> :<form className="theme-form mt-4">
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
                                </form>:<h3>You must have an account to be able to add a review for this product!!</h3>}
                                
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
                                                {loadingup ? <div style={{ textAlign: "center" }}><Loader
                             type="Rings"
                             color="#cc2121"
                             height={200}
                             width={300}
                /></div> :
                                                <form>
                                                    <div className="form-group">
                                                    {this.state.inputtype=="text"?<input type="text" name="updatevalue" className="form-control" placeholder="Enter new value" onChange={this.setStateFromInput} value={this.state.updatevalue} />
                                                     :<ReactStars
                                                    name="rating"
                                                    onChange={this.setStateFromInput} value={this.state.newrating}
                                                        count={5}
                                                        onChange={this.ratingChangedNew}
                                                        size={24} 
                                                        activeColor="#ffd700" />}  

                                                    {this.state.inputtype=="text"?this.validator2.message('new value', this.state.updatevalue, 'required'):''}
                                                    </div>
                                                <button type="submit" onClick={this.handleupdate} style={{marginRight:"-35px"}} className="btn btn-primary"><i className="fa fa-check"></i></button>
                                                </form>}
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
        getProductReviews:(id)=>dispatch(getProductReviews(id)),
        updatereset:()=>dispatch({type:UPDATE_REVIEW_RESET}),
        deletereviewreset:()=>dispatch({type:DELETE_REVIEW_RESET}),
        reviewtreset:()=>dispatch({type:NEW_REVIEW_RESET})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(DetailsTopTabs);
