import React, { Component } from 'react';
import { Link, NavLink} from 'react-router-dom';
import { IntlActions } from 'react-redux-multilingual'
import Pace from 'react-pace-progress'
import { Redirect } from "react-router-dom";

// Import custom components
import store from '../../../store';
import NavBar from "./common/navbar";
import SideBar from "./common/sidebar";
import CartContainer from "./../../../containers/CartContainer";
import TopBar from "./common/topbar";
import LogoImage from "./common/logo";
import {connect} from "react-redux";
import TopBarDark from './common/topbar-dark';
import SimpleReactValidator from 'simple-react-validator';
import {changeCurrency, getSearchedProducts} from '../../../actions/productActions'
import Searchresult from '../../pages/searchresult';
import { toast } from 'react-toastify';

class HeaderTwo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading:false,
            search:null,
            loadsearch:null,
            lang:"en",
            curr:'€',
            test:null
        }
        this.validator=new SimpleReactValidator();
    }

    /*=====================
         Pre loader
         ==========================*/
    componentDidMount() {
        setTimeout(function() {
            document.querySelector(".loader-wrapper").style = "display: none";
        }, 2000);
    }

    componentWillMount(){
        window.addEventListener('scroll', this.handleScroll);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = () => {
        let number = window.pageXOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

        if (number >= 300) {
            if (window.innerWidth < 576) {
                document.getElementById("sticky").classList.remove('fixed');
            }else
                document.getElementById("sticky").classList.add('fixed');
        } else {
            document.getElementById("sticky").classList.remove('fixed');
        }
    }

    changeLanguage(lang) {
        this.handlelang(lang);
        store.dispatch(IntlActions.setLocale(lang))
    }
    handlelang(lang){
        if(lang=="en"){
            this.state.lang="en";
        }
        else if(lang=="fn"){
            this.state.lang="fr";
        }
    }
    handleCurrency(curr){
        if(curr=='€'){
            this.setState({curr:'€'});
            this.props.changeCurrency('€');
        }
        else{
            this.setState({curr:'DT'});
            this.props.changeCurrency('DT')
        }
    }
    

    openNav() {
        var openmyslide = document.getElementById("mySidenav");
        if(openmyslide){
            openmyslide.classList.add('open-side')
        }
    }
    openSearch() {
        document.getElementById("search-overlay").style.display = "block";

    }

    closeSearch() {
        document.getElementById("search-overlay").style.display = "none";
    }

    load = ()=>{
        this.setState({isLoading: true});
        fetch().then(()=>{
            // deal with data fetched
            this.setState({isLoading: false})
        })
    };
    handlesubmit=(e)=>{
        e.preventDefault(); 
          if(!this.validator.allValid()){
            this.validator.showMessages();
            this.forceUpdate();
          }
          else{
              this.props.getSearchedProducts(this.state.search);
              this.setState({loadsearch:"load"})
          }
      }
    setStateFromInput = (event) => {
        var obj = {};
        obj[event.target.name] = event.target.value;
        this.setState(obj);
      }

    render() {
        return (
            <div>
                <header >
                    {this.state.isLoading ? <Pace color="#27ae60"/> : null}
                    <div className="mobile-fix-option"></div>
                    {/*Top Header Component*/}
                    <TopBar />

                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="main-menu border-section border-top-0">
                                    <div className="menu-left">
                                        <div className="navbar">
                                            <a href="javascript:void(0)" onClick={this.openNav}>
                                                <div className="bar-style"> <i className="fa fa-bars sidebar-bar" aria-hidden="true"></i></div>
                                            </a>
                                            {/*SideBar Navigation Component*/}
                                            <SideBar/>
                                        </div>
                                    </div>
                                    <div className="brand-logo layout2-logo">
                                        <LogoImage logo={this.props.logoName} />
                                    </div>
                                    <div className="menu-right pull-right">
                                        <div>
                                            <div className="icon-nav">
                                                <ul>
                                                    <li className="onhover-div mobile-search">
                                                        <div><img src={`${process.env.PUBLIC_URL}/assets/images/icon/search.png`} onClick={this.openSearch} className="img-fluid" alt="" />
                                                            <i className="fa fa-search" onClick={this.openSearch}></i></div>
                                                    </li>
                                                    <li className="onhover-div mobile-setting">
                                                        <div><img src={`${process.env.PUBLIC_URL}/assets/images/icon/setting.png`} className="img-fluid" alt="" />
                                                            <i className="fa fa-cog"></i></div>
                                                        <div className="show-div setting">
                                                            <h6>language</h6>
                                                            <ul>
                                                                <li>{this.state.lang=="en"?<a href={null} onClick={() => this.changeLanguage('en')} style={{color:"red"}} >English</a>:<a href={null} onClick={() => this.changeLanguage('en')} style={{color:"black"}} >English</a>} </li>
                                                                <li>{this.state.lang=="fr"?<a href={null} onClick={() => this.changeLanguage('fn')} style={{color:"red"}} >French</a>:<a href={null} onClick={() => this.changeLanguage('fn')} style={{color:"black"}} >French</a>} </li>
                                                            </ul>
                                                            <h6>currency</h6>
                                                            <ul className="list-inline">
                                                                <li>{this.state.curr=='€'?<a href={null} onClick={() => this.handleCurrency('€')} style={{color:"red"}} >euro</a>:<a href={null} onClick={() => this.handleCurrency('€')} style={{color:"black"}} >euro</a>}</li>
                                                                <li>{this.state.curr=='DT'?<a href={null} onClick={() => this.handleCurrency('DT')} style={{color:"red"}}>tunisian dinar</a>:<a href={null} onClick={() => this.handleCurrency('DT')} style={{color:"black"}}>tunisian dinar</a>}</li>
                                                            </ul>
                                                        </div>
                                                        
                                                    </li>
                                                    {/*Header Cart Component */}
                                                    <CartContainer/>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="main-nav-center" id="sticky" className="sticky  " style={{textAlign:'center'}}>
                                    <NavBar/>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <div id="search-overlay" className="search-overlay">
                    <div>
                        <span className="closebtn" onClick={this.closeSearch} title="Close Overlay">×</span>
                        <div className="overlay-content">
                            <div className="container">
                                <div className="row">
                                    <div className="col-xl-12">
                                    {this.state.loadsearch=="load"?
                                                <Searchresult products={this.props.searchedproducts} />
                                            :<form>
                                            <div className="form-group">
                                                <input type="text" name="search" className="form-control" placeholder="Search a Product" onChange={this.setStateFromInput} value={this.state.search} />
                                                {this.validator.message('search', this.state.search, 'required')}
                                            </div>
                                            <button type="submit" onClick={this.handlesubmit} className="btn btn-primary"><i className="fa fa-search"></i></button>
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

const mapDispatchToProps = dispatch => {
    return {
        getSearchedProducts: (keyword) => dispatch(getSearchedProducts(keyword)),
        changeCurrency:(currency)=>dispatch(changeCurrency(currency))
    }
}

const mapStateToProps=state=>{
    return {
        searchedproducts:state.searchedproducts,
        symbol:state.symbol
      }
}

export default connect(mapStateToProps,mapDispatchToProps
)(HeaderTwo);