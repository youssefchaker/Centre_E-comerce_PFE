import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {getCategories} from '../../../../services';
import {connect} from 'react-redux';
class SideBar extends Component {


    closeNav() {
        var closemyslide = document.getElementById("mySidenav");
        if (closemyslide)
            closemyslide.classList.remove('open-side');
    }

    handleSubmenu = (event) => {
        if (event.target.classList.contains('sub-arrow'))
            return;

        if(event.target.nextElementSibling.classList.contains('opensub1'))
            event.target.nextElementSibling.classList.remove('opensub1')
        else{
            document.querySelectorAll('.opensub1').forEach(function (value) {
                value.classList.remove('opensub1');
            });
            event.target.nextElementSibling.classList.add('opensub1')
        }
    }
    handleSubTwoMenu = (event) => {
        if (event.target.classList.contains('sub-arrow'))
            return;

        if(event.target.nextElementSibling.classList.contains('opensub2'))
            event.target.nextElementSibling.classList.remove('opensub2')
        else{
            document.querySelectorAll('.opensub2').forEach(function (value) {
                value.classList.remove('opensub2');
            });
            event.target.nextElementSibling.classList.add('opensub2')
        }
    }
    handleSubThreeMenu = (event) => {
        if (event.target.classList.contains('sub-arrow'))
            return;

        if(event.target.nextElementSibling.classList.contains('opensub3'))
            event.target.nextElementSibling.classList.remove('opensub3')
        else{
            document.querySelectorAll('.opensub3').forEach(function (value) {
                value.classList.remove('opensub3');
            });
            event.target.nextElementSibling.classList.add('opensub3')
        }
    }
    handleSubFourMenu = (event) => {
        if (event.target.classList.contains('sub-arrow'))
            return;

        if(event.target.nextElementSibling.classList.contains('opensub4'))
            event.target.nextElementSibling.classList.remove('opensub4')
        else{
            document.querySelectorAll('.opensub4').forEach(function (value) {
                value.classList.remove('opensub4');
            });
            event.target.nextElementSibling.classList.add('opensub4')
        }
    }

    handleMegaSubmenu = (event) => {
        if (event.target.classList.contains('sub-arrow'))
            return;

        if(event.target.nextElementSibling.classList.contains('opensidesubmenu'))
            event.target.nextElementSibling.classList.remove('opensidesubmenu')
        else{
            event.target.nextElementSibling.classList.add('opensidesubmenu')
        }
    }

    render() {
        const {stores}=this.props.stores
        return (
            <div id="mySidenav" className="sidenav">
                <a href="javascript:void(0)" className="sidebar-overlay" onClick={this.closeNav}></a>
                <nav>
                    <a onClick={this.closeNav}>
                        <div className="sidebar-back text-left">
                            <i className="fa fa-angle-left pr-2" aria-hidden="true"></i> Back
                        </div>
                    </a>
                    
                        <ul id="sub-menu" className="sidebar-menu">
                        <li>
                            <Link style={{fontSize:"small",marginBottom:"-5px"}} to="#" onClick={(e) => this.handleMegaSubmenu(e)}>
                            Electronics
                                <span className="sub-arrow"></span>
                            </Link>
                            <ul className="mega-menu clothing-menu">
                            {stores.map((store,index)=>(
                                <li>
                                    <div className="row m-0">
                                        <div className="col-xl-4">
                                            <div className="Link-section">
                                                {store.buisnessDomaine=="Electronics"?<Link style={{fontSize:"small",marginBottom:"-5px"}} to={`${process.env.PUBLIC_URL}/store/${store._id}`} ><h5>{store.name}</h5></Link>:''}
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                ))}
                            </ul>
                        </li>
                        <li>
                            <Link style={{fontSize:"small",marginBottom:"-5px"}} to="#" onClick={(e) => this.handleMegaSubmenu(e)}>
                            Cameras
                                <span className="sub-arrow"></span>
                            </Link>
                            <ul className="mega-menu clothing-menu">
                            {stores.map((store,index)=>(
                                <li>
                                    <div className="row m-0">
                                        <div className="col-xl-4">
                                            <div className="Link-section">
                                                {store.buisnessDomaine=="Cameras"?<Link style={{fontSize:"small",marginBottom:"-5px"}} to={`${process.env.PUBLIC_URL}/store/${store._id}`} ><h5>{store.name}</h5></Link>:''}
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                ))}
                            </ul>
                        </li>
                        <li>
                            <Link style={{fontSize:"small",marginBottom:"-5px"}} to="#" onClick={(e) => this.handleMegaSubmenu(e)}>
                            Laptops
                                <span className="sub-arrow"></span>
                            </Link>
                            <ul className="mega-menu clothing-menu">
                            {stores.map((store,index)=>(
                                <li>
                                    <div className="row m-0">
                                        <div className="col-xl-4">
                                            <div className="Link-section">
                                                {store.buisnessDomaine=="Laptops"?<Link style={{fontSize:"small",marginBottom:"-5px"}} to={`${process.env.PUBLIC_URL}/store/${store._id}`} ><h5>{store.name}</h5></Link>:''}
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                ))}
                            </ul>
                        </li>
                        <li>
                            <Link style={{fontSize:"small",marginBottom:"-5px"}} to="#" onClick={(e) => this.handleMegaSubmenu(e)}>
                            Accessories
                                <span className="sub-arrow"></span>
                            </Link>
                            <ul className="mega-menu clothing-menu">
                            {stores.map((store,index)=>(
                                <li>
                                    <div className="row m-0">
                                        <div className="col-xl-4">
                                            <div className="Link-section">
                                                {store.buisnessDomaine=="Accessories"?<Link style={{fontSize:"small",marginBottom:"-5px"}} to={`${process.env.PUBLIC_URL}/store/${store._id}`} ><h5>{store.name}</h5></Link>:''}
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                ))}
                            </ul>
                        </li>
                        <li>
                            <Link style={{fontSize:"small",marginBottom:"-5px"}} to="#" onClick={(e) => this.handleMegaSubmenu(e)}>
                            Phones&Tablets
                                <span className="sub-arrow"></span>
                            </Link>
                            <ul className="mega-menu clothing-menu">
                            {stores.map((store,index)=>(
                                <li>
                                    <div className="row m-0">
                                        <div className="col-xl-4">
                                            <div className="Link-section">
                                                {store.buisnessDomaine=="Phones&Tablets"?<Link style={{fontSize:"small",marginBottom:"-5px"}} to={`${process.env.PUBLIC_URL}/store/${store._id}`} ><h5>{store.name}</h5></Link>:''}
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                ))}
                            </ul>
                        </li>
                        <li>
                            <Link style={{fontSize:"small",marginBottom:"-5px"}} to="#" onClick={(e) => this.handleMegaSubmenu(e)}>
                            Food
                                <span className="sub-arrow"></span>
                            </Link>
                            <ul className="mega-menu clothing-menu">
                            {stores.map((store,index)=>(
                                <li>
                                    <div className="row m-0">
                                        <div className="col-xl-4">
                                            <div className="Link-section">
                                                {store.buisnessDomaine=="Food"?<Link style={{fontSize:"small",marginBottom:"-5px"}} to={`${process.env.PUBLIC_URL}/store/${store._id}`} ><h5>{store.name}</h5></Link>:''}
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                ))}
                            </ul>
                        </li>
                        <li>
                            <Link style={{fontSize:"small",marginBottom:"-5px"}} to="#" onClick={(e) => this.handleMegaSubmenu(e)}>
                            Books
                                <span className="sub-arrow"></span>
                            </Link>
                            <ul className="mega-menu clothing-menu">
                            {stores.map((store,index)=>(
                                <li>
                                    <div className="row m-0">
                                        <div className="col-xl-4">
                                            <div className="Link-section">
                                                {store.buisnessDomaine=="Books"?<Link style={{fontSize:"small",marginBottom:"-5px"}} to={`${process.env.PUBLIC_URL}/store/${store._id}`} ><h5>{store.name}</h5></Link>:''}
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                ))}
                            </ul>
                        </li>
                        <li>
                            <Link style={{fontSize:"small",marginBottom:"-5px"}} to="#" onClick={(e) => this.handleMegaSubmenu(e)}>
                            Fashion
                                <span className="sub-arrow"></span>
                            </Link>
                            <ul className="mega-menu clothing-menu">
                            {stores.map((store,index)=>(
                                <li>
                                    <div className="row m-0">
                                        <div className="col-xl-4">
                                            <div className="Link-section">
                                                {store.buisnessDomaine=="Fashion"?<Link style={{fontSize:"small",marginBottom:"-5px"}} to={`${process.env.PUBLIC_URL}/store/${store._id}`} ><h5>{store.name}</h5></Link>:''}
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                ))}
                            </ul>
                        </li>
                        <li>
                            <Link style={{fontSize:"small",marginBottom:"-5px"}} to="#" onClick={(e) => this.handleMegaSubmenu(e)}>
                            Beauty&Health
                                <span className="sub-arrow"></span>
                            </Link>
                            <ul className="mega-menu clothing-menu">
                            {stores.map((store,index)=>(
                                <li>
                                    <div className="row m-0">
                                        <div className="col-xl-4">
                                            <div className="Link-section">
                                                {store.buisnessDomaine=="Beauty&Health"?<Link style={{fontSize:"small",marginBottom:"-5px"}} to={`${process.env.PUBLIC_URL}/store/${store._id}`} ><h5>{store.name}</h5></Link>:''}
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                ))}
                            </ul>
                        </li>
                        <li>
                            <Link style={{fontSize:"small",marginBottom:"-5px"}} to="#" onClick={(e) => this.handleMegaSubmenu(e)}>
                            Sports
                                <span className="sub-arrow"></span>
                            </Link>
                            <ul className="mega-menu clothing-menu">
                            {stores.map((store,index)=>(
                                <li>
                                    <div className="row m-0">
                                        <div className="col-xl-4">
                                            <div className="Link-section">
                                                {store.buisnessDomaine=="Sports"?<Link style={{fontSize:"small",marginBottom:"-5px"}} to={`${process.env.PUBLIC_URL}/store/${store._id}`} ><h5>{store.name}</h5></Link>:''}
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                ))}
                            </ul>
                        </li>
                        <li>
                            <Link style={{fontSize:"small",marginBottom:"-5px"}} to="#" onClick={(e) => this.handleMegaSubmenu(e)}>
                            Outdoor
                                <span className="sub-arrow"></span>
                            </Link>
                            <ul className="mega-menu clothing-menu">
                            {stores.map((store,index)=>(
                                <li>
                                    <div className="row m-0">
                                        <div className="col-xl-4">
                                            <div className="Link-section">
                                                {store.buisnessDomaine=="Outdoor"?<Link style={{fontSize:"small",marginBottom:"-5px"}} to={`${process.env.PUBLIC_URL}/store/${store._id}`} ><h5>{store.name}</h5></Link>:''}
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                ))}
                            </ul>
                        </li>
                        <li>
                            <Link style={{fontSize:"small",marginBottom:"-5px"}} to="#" onClick={(e) => this.handleMegaSubmenu(e)}>
                            Home
                                <span className="sub-arrow"></span>
                            </Link>
                            <ul className="mega-menu clothing-menu">
                            {stores.map((store,index)=>(
                                <li>
                                    <div className="row m-0">
                                        <div className="col-xl-4">
                                            <div className="Link-section">
                                                {store.buisnessDomaine=="Home"?<Link style={{fontSize:"small",marginBottom:"-5px"}} to={`${process.env.PUBLIC_URL}/store/${store._id}`} ><h5>{store.name}</h5></Link>:''}
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                ))}
                            </ul>
                        </li>
                        <li>
                            <Link style={{fontSize:"small",marginBottom:"-5px"}} to="#" onClick={(e) => this.handleMegaSubmenu(e)}>
                            Other
                                <span className="sub-arrow"></span>
                            </Link>
                            <ul className="mega-menu clothing-menu">
                            {stores.map((store,index)=>(
                                <li>
                                    <div className="row m-0">
                                        <div className="col-xl-4">
                                            <div className="Link-section">
                                                {store.buisnessDomaine=="Other"?<Link style={{fontSize:"small",marginBottom:"-5px"}} to={`${process.env.PUBLIC_URL}/store/${store._id}`} ><h5>{store.name}</h5></Link>:''}
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                ))}
                            </ul>
                        </li>
                        
                    </ul>
                    
                    
                </nav>
            </div>

        )
    }
}

function mapStateToProps(state) {
    return {
        stores:state.stores
    }
}
export default connect(mapStateToProps) (SideBar);