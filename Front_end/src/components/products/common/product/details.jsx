import React, {Component} from 'react';
import {connect} from 'react-redux'



class Details extends Component {

    render (){
        const {item, addToWishlistClicked} = this.props

        return (
            <div className="col-lg-4">
                <div className="product-right product-description-box">
                    <h2> {item.name} </h2>
                    <div className="border-product">
                        <h6 className="product-title">product details</h6>
                        <p>{item.shortDetails}</p>
                    </div>
                    <div className="single-product-tables border-product detail-section">
                        <table>
                            <tbody><tr>
                                <td>Febric:</td>
                                <td>Chiffon</td>
                            </tr>
                            <tr>
                                <td>Color:</td>
                                <td>{item.variants[0].color}</td>
                            </tr>
                            <tr>
                                <td>Avalibility:</td>
                                <td>InStock</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}


export default Details;