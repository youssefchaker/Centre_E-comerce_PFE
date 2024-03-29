import React, {Component} from 'react';
import { withTranslate } from 'react-redux-multilingual'
import { BrowserRouter as Router, Route } from 'react-router-dom';


// Custom Components
import HeaderTwo from './common/headers/header-two';
import FooterFour from "./common/footers/footer-four";

// ThemeSettings
import ThemeSettings from "./common/theme-settings"



class App extends Component {

    render() {
        return (
            <div>
                <HeaderTwo logoName={'logo2.png'}/>
                {this.props.children}
                <FooterFour logoName={'logo2.png'}/>
                <ThemeSettings />


            </div>
        );
    }
}

export default withTranslate(App);
