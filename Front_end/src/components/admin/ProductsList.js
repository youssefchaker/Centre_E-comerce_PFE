import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'
import Breadcrumb from "../common/breadcrumb";
import {Helmet} from 'react-helmet'
import Sidebar from './sidebar_components/sidebar'
import Loader from "react-loader-spinner";
import { useDispatch, useSelector } from 'react-redux'
import { getAdminProducts, deleteAdminProduct, clearErrors } from '../../actions/productActions'
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants'

const ProductsList = ({ history }) => {

    const dispatch = useDispatch();

    const { loading, error, adminProducts } = useSelector(state => state.adminproducts);
    const { error: deleteError, isDeleted } = useSelector(state => state.deleteproduct)
    const { symbol} = useSelector(state => state.symbol);
    const {currencydiff} = useSelector(state => state);


    useEffect(() => {
        dispatch(getAdminProducts());

        if (error) {
            alert(error);
            dispatch(clearErrors())
        }

        if (deleteError) {
            alert(deleteError);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            alert('Product deleted successfully');
            history.push('/admin/products');
            dispatch({ type: DELETE_PRODUCT_RESET })
        }

    }, [dispatch, alert, error, deleteError, isDeleted, history])

    const setProducts = () => {
        const data = {
            columns: [
                {
                    label: 'Image',
                    field: 'image',
                    sort: 'asc'
                },
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Price',
                    field: 'price',
                    sort: 'asc'
                },
                {
                    label: 'Discount',
                    field: 'discount',
                    sort: 'asc'
                },
                {
                    label: 'Category',
                    field: 'category',
                    sort: 'asc'
                },
                {
                    label: 'Stock',
                    field: 'stock',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }
        if (adminProducts) {
        adminProducts.forEach(product => {
            data.rows.push({
                image:<img src = {product.images[0].url} style = {{width:'80px',height:'80px'}}></img>,
                id: product._id,
                name: product.name,
                price: `${symbol}${symbol=="€"? product.price:Math.round(currencydiff*product.price)}`,
                discount: product.discount,
                category: product.category,
                stock: product.stock,
                actions: <Fragment>
                    <Link to={`/admin/product/${product._id}`} className="btn btn-success py-1 px-2" style={{borderRadius:'4px'}}>
                        <i className="fa fa-pencil"></i>
                    </Link>
                    <button className="btn btn-danger py-1 px-2 ml-2" style={{borderRadius:'4px'}}  onClick={() => deleteProductHandler(product._id)}>
                        <i className="fa fa-trash"></i>
                    </button>
                </Fragment>
            })
        })
    }

        return data;
    }

    const deleteProductHandler = (id) => {
        dispatch(deleteAdminProduct(id))
    }

    return (
        <Fragment>
            
            {/*SEO Support*/}
            <Helmet>
                <title>Mall</title>
                <meta name="description" content=" online mall." />
            </Helmet>
            {/*SEO Support End */}

            <Breadcrumb  title={'Dashboard'}/>
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-5">All Products</h1>

                        {loading ? <div style={{ textAlign: "center" }}><Loader
                             type="Rings"
                             color="#cc2121"
                             height={200}
                             width={300}
                /></div> : (
                            <MDBDataTable
                                data={setProducts()}
                                className="px-3"
                                bordered
                                striped
                                hover
                            />
                        )}

                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}

export default ProductsList