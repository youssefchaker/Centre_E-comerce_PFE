import React, {Component} from 'react';
import { withTranslate } from 'react-redux-multilingual'
import HeaderTwo from './common/headers/header-two';
import FooterThree from "./common/footers/footer-three";
import ThemeSettings from "./common/theme-settings"



class App extends Component {

    render() {
        return (
            <div>
                <HeaderTwo logoName={'logo2.png'}/>
                {this.props.children}
                <FooterThree logoName={'logo2.png'}/>
                <ThemeSettings />
            </div>
        );
    }
}

export default withTranslate(App);
