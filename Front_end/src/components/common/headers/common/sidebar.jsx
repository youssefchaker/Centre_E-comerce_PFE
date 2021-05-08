import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {getBuisnessDomaines} from '../../../../services';
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
        const {categories}=this.props;
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
                        {categories.map((category)=>(
                        <li>
                            <Link style={{fontSize:"small",marginBottom:"-5px"}} to="#" onClick={(e) => this.handleMegaSubmenu(e)}>
                            {category}
                                <span className="sub-arrow"></span>
                            </Link>
                            <ul className="mega-menu clothing-menu">
                            {stores && stores.map((store,index)=>(
                                <li key={index}>
                                    <div className="row m-0">
                                        <div className="col-xl-4">
                                            <div className="Link-section">
                                                {store.buisnessDomaine===category?<Link style={{fontSize:"small",marginBottom:"-5px"}} to={`${process.env.PUBLIC_URL}/store/${store._id}`} ><h5>{store.name}</h5></Link>:''}
                                            </div>   
                                        </div>
                                    </div>
                                </li>
                                ))}
                            </ul>
                        </li>
                        ))}
                    </ul>
                </nav>
            </div>

        )
    }
}

function mapStateToProps(state) {
    return {
        stores:state.stores,
        categories:getBuisnessDomaines(state.stores.stores)
    }
}
export default connect(mapStateToProps) (SideBar);