import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import Slider from 'react-slick';
import ig from 'fetch-instagram';

import {Slider5, Slider7} from "../../../services/script"

class Instagram extends Component {

    constructor (props) {
        super (props)

        this.state = {
            InstaData: []
        }
    }

    componentWillMount() {
        const instagram = ig({
            accessToken: 'dd29d65bfd56221185c0106b09f523ae',
        });

        const users = instagram.media();
        users.then(res => this.setState({InstaData:res.data}));

    }

    render (){

        const {InstaData} = this.state;
        const {type} = this.props;

        var Sliders = {};
        if(type === 'watch'){
            Sliders = Slider5;
        }else{
            Sliders = Slider7;
        }


        return (
            <section className={`instagram`}>
                <div className={`container${(type === 'watch')?'':'-fluid'}`}>
                    <div className="row">
                        <div className="col-md-12 p-0">
                            <h2 className="title-borderless">Featured Stores
                                </h2>
                                <Slider {...Sliders} className="slide-7 no-arrow slick-instagram">
                                    {InstaData.map((pic,i) =>
                                        <div key={i}>
                                            <a href={pic.link} target="_blank">
                                                <div className="instagram-box">
                                                    <img src={`${pic.images.standard_resolution.url}`} alt="Avatar" className="w-100" />
                                                    <div className="overlay">
                                                        <i className="fa fa-instagram" aria-hidden="true"></i>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    )}
                                </Slider>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default Instagram;