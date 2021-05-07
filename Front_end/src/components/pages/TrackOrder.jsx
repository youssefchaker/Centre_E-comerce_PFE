import React, {Component} from 'react';

import Breadcrumb from "../common/breadcrumb";

class TrackOrder  extends Component {
    render (){
        return (
            <div>
                <Breadcrumb title={'track your order'}/>
                <section className="authentication-page section-b-space">
                    <div className="container">
                        <section className="search-block">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-6 offset-lg-3">
                                        <form className="form-header">
                                            <div className="input-group">
                                                <input type="text" className="form-control"
                                                       aria-label="Amount (to the nearest dollar)"
                                                       placeholder="track your order......" />
                                                    <div className="input-group-append">
                                                        <button className="btn btn-solid"><i
                                                            className="fa fa-search"></i>Track order
                                                        </button>
                                                    </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </section>

            </div>
        )
    }
}

export default TrackOrder