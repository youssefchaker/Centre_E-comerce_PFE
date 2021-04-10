import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import Slider from 'react-slick';
import Modal from 'react-responsive-modal';


class DetailsWithPrice extends Component {

    constructor (props) {
        super (props)
        this.state = {
            open:false,
            quantity:1,
            stock: 'InStock',
            nav3: null
        }
    }

    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

    componentDidMount() {
        this.setState({
            nav3: this.slider3
        });
    }

    minusQty = () => {
        if(this.state.quantity > 1) {
            this.setState({stock: 'InStock'})
            this.setState({quantity: this.state.quantity - 1})
        }
    }

    plusQty = () => {
        if(this.props.product.stock >= this.state.quantity) {
            this.setState({quantity: this.state.quantity+1})
        }else{
            this.setState({stock: 'Out of Stock !'})
        }
    }
    changeQty = (e) => {
        this.setState({ quantity: parseInt(e.target.value) })
    }

    render (){
        const {symbol, product, addToCartClicked, BuynowClicked,currencydiff} = this.props
        var colorsnav = {
            slidesToShow: 6,
            swipeToSlide:true,
            arrows: false,
            dots: false,
            focusOnSelect: true
        };

        return (
            <div className="col-lg-6 rtl-text">
                <div className="product-right">
                    <h2> {product.name} </h2>
                    {symbol=="€"?(product.discount != 0)?
                            <h4>{symbol}{product.price-(product.price*product.discount/100)}
                                 <del><span className="money">{symbol}{product.price}</span></del> 
                            </h4>:<h4>{symbol}{product.price}</h4>
                            :(product.discount != 0)?
                            <h4>{symbol}{Math.round((currencydiff*(product.price-(product.price*product.discount/100)) + Number.EPSILON) * 100) / 100}
                                 <del><span className="money">{symbol}{currencydiff*product.price}</span></del> 
                            </h4>:<h4>{symbol}{Math.round((currencydiff*(product.price) + Number.EPSILON) * 100) / 100}</h4>}
                        {/* <del></del> */}
                        {/* <span>{product.discount}% off</span> */}
                    {/* <h3>{symbol}{product.price-(product.price*product.discount/100)} </h3> */}
                    {/* {product.details?
                    <ul >
                        <Slider {...colorsnav} asNavFor={this.props.navOne} ref={slider => (this.slider1 = slider)} className="color-variant">
                            {product.details.map((vari, i) => {
                                return <ul>
                                <li className={vari.detailname} key={i} title={vari.detailname}></li>
                                <li className={vari.value} key={i} title={vari.value}></li>
                                </ul> 
                            })}
                        </Slider>
                    </ul>:''} */}
                    <div className="product-description border-product">
                        {/* {product.size?
                            <div>
                                <h6 className="product-title size-text">select size
                                    <span><a href="#" data-toggle="modal"
                                             data-target="#sizemodal" onClick={this.onOpenModal} >size chart</a></span></h6>
                                <div className="modal fade" id="sizemodal" tabIndex="-1"
                                     role="dialog" aria-labelledby="exampleModalLabel"
                                     aria-hidden="true">
                                    <div className="modal-dialog modal-dialog-centered"
                                         role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title"
                                                    id="exampleModalLabel">Sheer Straight
                                                    Kurta</h5>
                                                <button type="button" className="close"
                                                        data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div className="modal-body">
                                                <img src={`${process.env.PUBLIC_URL}/assets/images/size-chart.jpg`} alt="" className="img-fluid"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="size-box">
                            <ul>
                                {product.size.map((size, i) => {
                                    return <li key={i}><a href="#">{size}</a></li>
                                })}
                            </ul>
                        </div>
                            </div>:''} */}
                        <span className="instock-cls">{this.state.stock}</span>
                        <h6 className="product-title">quantity</h6>
                        <div className="qty-box">
                            <div className="input-group">
                                  <span className="input-group-prepend">
                                    <button type="button" className="btn quantity-left-minus" onClick={this.minusQty} data-type="minus" data-field="">
                                     <i className="fa fa-angle-left"></i>
                                    </button>
                                  </span>
                                <input type="text" name="quantity" value={this.state.quantity} onChange={this.changeQty} className="form-control input-number" />
                                <span className="input-group-prepend">
                                <button type="button" className="btn quantity-right-plus" onClick={this.plusQty} data-type="plus" data-field="">
                                <i className="fa fa-angle-right"></i>
                                </button>
                               </span>
                            </div>
                        </div>
                    </div>
                    <div className="product-buttons" >
                        <a className="btn btn-solid" onClick={() => addToCartClicked(product, this.state.quantity)}>add to cart</a>
                        <Link to={`${process.env.PUBLIC_URL}/checkout`} className="btn btn-solid" onClick={() => BuynowClicked(product, this.state.quantity)} >buy now</Link>
                    </div>
                </div>
                <Modal open={this.state.open} onClose={this.onCloseModal} center>
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Sheer Straight Kurta</h5>
                            </div>
                            <div className="modal-body">
                                <img src={`${process.env.PUBLIC_URL}/assets/images/size-chart.jpg`} alt="" className="img-fluid" />
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}


export default DetailsWithPrice;