import React, {Component} from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.scss';
import {Link} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import SimpleReactValidator from 'simple-react-validator';
import ReactStars from "react-rating-stars-component";
class DetailsTopTabs extends Component {
    constructor(props){
        super(props);
        this.state={
            Rating:3,
            Comment:null
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
            toast.success("Review added !");
          }
          
 
      }
       ratingChanged = (newRating) => {
        console.log(newRating);
      };
    render (){
        

        return (
            <section className="tab-product m-0">
                <div className="row">
                    <div className="col-sm-12 col-lg-12">
                        <Tabs className="tab-content nav-material">
                            <TabList className="nav nav-tabs nav-material">
                                <Tab className="nav-item">
                                    <span className="nav-link active">
                                        <i className="icofont icofont-ui-home"></i>Description</span>
                                    <div className="material-border"></div>
                                </Tab>
                                <Tab className="nav-item">
                                    <span className="nav-link" ><i className="icofont icofont-man-in-glasses"></i>Details</span>
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
                                    <tbody>
                                    <tr>
                                        <th>Ideal For :</th>
                                        <td>Women's</td>
                                    </tr>
                                    <tr>
                                        <th>Pattern :</th>
                                        <td>Embroidered</td>
                                    </tr>
                                    <tr>
                                        <th>Dress Fabric :</th>
                                        <td>Silk</td>
                                    </tr>
                                    <tr>
                                        <th>Type :</th>
                                        <td>Ghagra, Choli, Dupatta Set</td>
                                    </tr>
                                    <tr>
                                        <th>Neck :</th>
                                        <td>Round Neck</td>
                                    </tr>
                                    <tr>
                                        <th>Sleeve :</th>
                                        <td>3/4 Sleeve</td>
                                    </tr>
                                    <tr>
                                        <th>Work :</th>
                                        <td>N/A</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </TabPanel>
                            <TabPanel>
                                <p className="mt-4 p-0">
                                    Lorem Ipsum is simply dummy text of the printing and
                                    typesetting industry. Lorem Ipsum has been the industry's
                                    standard dummy text ever since the 1500s, when an unknown
                                    printer took a galley of type and scrambled it to make a
                                    type specimen book. It has survived not only five centuries,
                                    but also the leap into electronic typesetting, remaining
                                    essentially unchanged. It was popularised in the 1960s with
                                    the release of Letraset sheets containing Lorem Ipsum
                                    passages, and more recently with desktop publishing software
                                    like Aldus PageMaker including versions of Lorem Ipsum.
                                </p>
                            </TabPanel>
                            <TabPanel>
                                <div className="mt-4 text-center">
                                    <div className="embed-responsive embed-responsive-16by9">
                                        <iframe
                                            src="https://www.youtube.com/embed/BUWzX78Ye_8"
                                            allow="autoplay; encrypted-media"
                                            allowFullScreen>
                                        </iframe>
                                    </div>
                                </div>
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
        )
    }
}

export default DetailsTopTabs;