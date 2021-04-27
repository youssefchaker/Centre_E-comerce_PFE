import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Modal from 'react-responsive-modal';


class ProductItem extends Component {

    constructor(props){
        super(props)

        this.state = {
            open: false,
            stock: 'InStock',
            quantity: 1,
            image: ''
        }
    }

    onClickHandle(img) {
        this.setState({ image : img} );
    }
    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

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

    render() {
        const {product, onAddToCartClicked,storename} = this.props;
        const symbol=this.props.symbol;
        const currencydiff=this.props.currencydiff;
        let RatingStars = []
        for(var i = 0; i < product.nbreviews; i++) {
            RatingStars.push(<i className="fa fa-star" key={i}></i>)
        }
        const datenow = new Date();
        const datep= product.creationdate.slice(0,10);
        const dateproduct=new Date(datep);
        const diffTime = datenow.getTime()-dateproduct.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        return (
                <div className="product-box">
                    <div className="img-wrapper">
                        <div className="lable-block">
                            {(diffDays <8)? <span className="lable3">new</span> : ''}
                            {(product.discount != 0)? <span className="lable4">on sale</span> : ''}
                        </div>
                        <div className="front">
                            <Link to={`${process.env.PUBLIC_URL}/left-sidebar/product/${product._id}`} ><img
                                src={`${product.images[0].url}`}
                                style={{width:'200px',height:'200px'}} 
                                className="img-fluid"
                                alt="" /></Link>
                        </div>
                        {product.nbreviews<10?
                                            <div >
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star-o"></i>
                                            <i className="fa fa-star-o"></i>
                                            <i className="fa fa-star-o"></i>
                                            <i className="fa fa-star-o"></i>
                                            </div>:
                                            product.nbreviews>10 && product.nbreviews<20 ?
                                            <div>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star-o"></i>
                                            <i className="fa fa-star-o"></i>
                                            <i className="fa fa-star-o"></i>
                                            </div>:
                                            product.nbreviews>20 && product.nbreviews<30?
                                            <div>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star-o"></i>
                                            <i className="fa fa-star-o"></i>
                                            </div>:
                                            product.nbreviews>30 && product.nbreviews<40?
                                            <div>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star-o"></i>
                                            </div>:
                                            <div>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            </div>}
                        <div className="cart-info cart-wrap">
                            <button title="Add to cart" onClick={() => onAddToCartClicked(product, 1)}>
                                <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                            </button>
                            <a href="javascript:void(0)" data-toggle="modal"
                               data-target="#quick-view"
                               title="Quick View"
                               onClick={this.onOpenModal}><i className="fa fa-search" aria-hidden="true"></i></a>
                        </div>
                    </div>
                    <div className="product-detail">
                        <div>
                            <Link to={`${process.env.PUBLIC_URL}/left-sidebar/product/${product._id}`}>
                                <h6>{product.name}</h6>
                            </Link>
                            {symbol=="€"?(product.discount != 0)?
                            <h4>{symbol}{product.price-(product.price*product.discount/100)}
                                 <del><span className="money">{symbol}{product.price}</span></del> 
                            </h4>:<h4>{symbol}{product.price}</h4>
                            :(product.discount != 0)?
                            <h4>{symbol}{Math.round((currencydiff*(product.price-(product.price*product.discount/100)) + Number.EPSILON) * 100) / 100}
                                 <del><span className="money">{symbol}{Math.round((currencydiff*(product.price) + Number.EPSILON) * 100) / 100}</span></del> 
                            </h4>:<h4>{symbol}{Math.round((currencydiff*(product.price) + Number.EPSILON) * 100) / 100}</h4>}
                        </div>
                    </div>
                    <Modal open={this.state.open} onClose={this.onCloseModal} center>
                        <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                            <div className="modal-content quick-view-modal">
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-lg-6  col-xs-12">
                                            <div className="quick-view-img">
                                                <img src={product.images[0].url} alt="" className="img-fluid" style={{width:'500px',height:'500px'}}   />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 rtl-text">
                                            <div className="product-right">
                                                <h2> {product.name} </h2>
                                                <Link to={`${process.env.PUBLIC_URL}/store/${product.store}`} onClick={this.forceUpdate}><h4 style={{"textDecoration":"underline"}} className="sname">Product By:{storename}</h4></Link>
                                                {symbol=="€"?(product.discount != 0)?
                            <h4>{symbol}{product.price-(product.price*product.discount/100)}
                                 <del><span className="money">{symbol}{product.price}</span></del> 
                            </h4>:<h4>{symbol}{product.price}</h4>
                            :(product.discount != 0)?
                            <h4>{symbol}{Math.round((currencydiff*(product.price-(product.price*product.discount/100)) + Number.EPSILON) * 100) / 100}
                                 <del><span className="money">{symbol}{Math.round((currencydiff*(product.price) + Number.EPSILON) * 100) / 100}</span></del> 
                            </h4>:<h4>{symbol}{Math.round((currencydiff*(product.price) + Number.EPSILON) * 100) / 100}</h4>}
                                                <div className="product-description border-product">
                                                    <h6 className="product-title">quantity</h6>
                                                    <div className="qty-box">
                                                        <div className="input-group">
                                                              <span className="input-group-prepend">
                                                                <button type="button" className="btn quantity-left-minus" onClick={this.minusQty} data-type="minus" data-field="">
                                                                 <i className="fa fa-angle-left"></i>
                                                                </button>
                                                              </span>
                                                            <input type="text" name="quantity" value={this.state.quantity}  onChange={this.changeQty} className="form-control input-number" />
                                                                <span className="input-group-prepend">
                                                                <button type="button" className="btn quantity-right-plus" onClick={this.plusQty} data-type="plus" data-field="">
                                                                <i className="fa fa-angle-right"></i>
                                                                </button>
                                                               </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="product-buttons">
                                                    <button  className="btn btn-solid" onClick={() => onAddToCartClicked(product, this.state.quantity)} >add to cart</button>
                                                    <Link to={`${process.env.PUBLIC_URL}/left-sidebar/product/${product._id}`} className="btn btn-solid">view detail</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal>
                </div>
        )
    }
}

export default ProductItem;