import React, {Component} from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

import Breadcrumb from "../common/breadcrumb";

class ErrorPage extends Component {

    constructor (props) {
        super (props)

    }

    render (){

        return (
            <div>

                <section className="p-0">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="error-section">
                                    <h1>Error 404 </h1>
                                    <h2>An Error has occurred try later </h2>
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

export default ErrorPage