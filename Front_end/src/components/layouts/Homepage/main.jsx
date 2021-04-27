import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'

import {Helmet} from 'react-helmet'
import '../../common/index.scss';
import Slider from 'react-slick';
import {Link} from 'react-router-dom';
import { getProducts } from '../../../actions/productActions';




// Import custom components

import TopCollection from './top-collection';
import SpecialProducts from "../common/products";
import EventSection from "../common/eventssection";
import LogoBlock from "../common/logo-block";
import {
    svgFreeShipping,
    svgservice,
    svgoffer
} from "../../../services/script";






function  Fashion()  {



    const dispatch = useDispatch();



    useEffect(() => {
        document.getElementById("color").setAttribute("href", `#` );


        dispatch(getProducts());

           

            
        
        
       


      },[]);

	

      //Slider settings
      const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 1000,
        cssEase: "linear"
      };
		return (
			<div>
                <Helmet>
                    <title>Mall</title>
                    <meta name="description" content="mall by mouhib and youssef" />
                </Helmet>
                {/*Home Slider*/}
                <section className="p-0">
                    <Slider  className="slide-1 home-slider" {...settings}>
                        <div>
                            <div className="home home1 text-center">
                                <div className="container">
                                    <div className="row">
                                        <div className="col">
                                            <div className="slider-contain">
                                                <div>
                                                    <h4>welcome to Mall</h4>
                                                    <h1>clothes store</h1>
                                                    <Link to={`${process.env.PUBLIC_URL}/left-sidebar/collection`} className="btn btn-solid">shop now</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="home home2 text-center">
                                <div className="container">
                                    <div className="row">
                                        <div className="col">
                                            <div className="slider-contain">
                                                <div>
                                                    <h4>welcome to Mall</h4>
                                                    <h1>makeup store</h1>
                                                    <Link to={`${process.env.PUBLIC_URL}/left-sidebar/collection`} className="btn btn-solid">shop now</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Slider>
                </section>
                {/*Home Section End*/}

                {/*collection banner*/}
                <section className="pb-0">
                    <div className="container">
                        <div className="row partition2">
                            <div className="col-md-6">
                                <Link to={`${process.env.PUBLIC_URL}/left-sidebar/collection`}>
                                    <div className="collection-banner p-right text-center">
                                        <img src={`${process.env.PUBLIC_URL}/assets/images/sub-banner1.jpg`} className="img-fluid" alt=""/>
                                            <div className="contain-banner">
                                                <div>
                                                    <h4>save 30%</h4>
                                                    <h2>men</h2>
                                                </div>
                                            </div>
                                    </div>
                                </Link>
                            </div>
                            <div className="col-md-6">
                                <Link to={`${process.env.PUBLIC_URL}/left-sidebar/collection`}>
                                    <div className="collection-banner p-right text-center">
                                        <img src={`${process.env.PUBLIC_URL}/assets/images/sub-banner2.jpg`} className="img-fluid" alt=""/>
                                            <div className="contain-banner">
                                                <div>
                                                    <h4>save 60%</h4>
                                                    <h2>women</h2>
                                                </div>
                                            </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
                {/*collection banner end*/}

                <TopCollection type={'women'} />

                {/*Parallax banner*/}
                <section className="p-0">
                    <div className="full-banner parallax-banner1 parallax text-center p-left">
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <div className="banner-contain">
                                        <h2>2021</h2>
                                        <h3>fashion trends</h3>
                                        <h4>special offer</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/*Parallax banner End*/}

                <SpecialProducts />

                {/*service layout*/}
                <div className="container">
                    <section className="service border-section small-section ">
                        <div className="row">
                            <div className="col-md-4 service-block">
                                <div className="media">
                                    <div dangerouslySetInnerHTML={{ __html: svgFreeShipping }} />
                                    <div className="media-body">
                                        <h4>free shipping</h4>
                                        <p>free shipping world wide</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 service-block">
                                <div className="media">
                                    <div dangerouslySetInnerHTML={{ __html: svgservice }} />
                                    <div className="media-body">
                                        <h4>24 X 7 service</h4>
                                        <p>online service for new customer</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 service-block">
                                <div className="media">
                                    <div dangerouslySetInnerHTML={{ __html: svgoffer }} />
                                    <div className="media-body">
                                        <h4>festival offer</h4>
                                        <p>new online special festival offer</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                {/*Blog Section end*/}
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="title1 section-t-space">
                                <h2 className="title-inner1">Ongoing Events</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="blog p-t-0">
                    <EventSection />
                </section>
                {/*Blog Section End*/}

                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="title1 section-t-space">
                                <h2 className="title-inner1">Featured Stores</h2>
                            </div>
                        </div>
                    </div>
                </div>
                {/*logo section*/}
                <LogoBlock />
                {/*logo section end*/}



			</div>
			)


	
}

export default Fashion;