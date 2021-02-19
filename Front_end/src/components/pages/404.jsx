import React, {Component} from 'react';
import Slider from 'react-slick';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

import Breadcrumb from "../common/breadcrumb";

class PageNotFound extends Component {

    constructor (props) {
        super (props)

    }

    render (){

        return (
            <div>
                <Breadcrumb title={'404 Page'}/>

                <section className="p-0">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="error-section">
                                    <h1>404</h1>
                                    <h2>page not found</h2>

                                    
                                    <Link to="/"><a className="btn btn-solid">back to home</a></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default PageNotFound