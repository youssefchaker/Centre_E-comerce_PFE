import React, {Component} from 'react';
import { withTranslate } from 'react-redux-multilingual'

// Custom Components
import HeaderOne from './common/headers/header-one';
import HeaderTwo from './common/headers/header-two';
import HeaderThree from './common/headers/header-three';
import HeaderFour from './common/headers/header-four';
import HeaderFive from './common/headers/header-five';

import FooterOne from "./common/footers/footer-one";
import FooterTwo from "./common/footers/footer-two";
import FooterThree from "./common/footers/footer-three";
import FooterFour from "./common/footers/footer-four";

// ThemeSettings
import ThemeSettings from "./common/theme-settings"
import Searchresult from './pages/searchresult';


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            search:''
        }
    }
    componentDidMount=()=>{
        {this.setState({search:''})}
      }
handlesearch = (data) => {
      this.setState({search: data})
}

    render() {
        if(this.state.search==''){
            return (
                <div>
                    <HeaderTwo logoName={'logo2.png'} search={this.handlesearch}/>
                    {this.props.children}
                    <FooterThree logoName={'logo2.png'}/>
                    <ThemeSettings />
    
    
                </div>
            );
            
        }
        else{
            return(
                <div>
                <HeaderTwo logoName={'logo2.png'} search={this.handlesearch}/>
                <Searchresult products={this.state.search}></Searchresult>
                <FooterThree logoName={'logo2.png'}/>
                <ThemeSettings />
                </div>
                
            )
        
    }
    }
}

export default withTranslate(App);
