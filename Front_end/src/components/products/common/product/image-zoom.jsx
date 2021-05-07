import React, { Component } from 'react';

export default class ImageZoom extends Component {
    render() {
        const {image} = this.props;

        return (
            <img src={`${image}`}  style={{width:'300px',height:'300px'}}  className="img-fluid image_zoom_cls-0" alt="product" />
        );
    }
}