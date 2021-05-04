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
import { toast } from 'react-toastify';

const ProductsList = ({ history }) => {

    const dispatch = useDispatch();

    const { loading, error, adminProducts } = useSelector(state => state.adminproducts);
    const { error: deleteError, isDeleted } = useSelector(state => state.deleteAdminProduct)
    const { symbol} = useSelector(state => state.symbol);
    const {currencydiff} = useSelector(state => state);


    useEffect(() => {
        dispatch(getAdminProducts());

        if (error) {
            toast.error(error, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            dispatch(clearErrors())
        }

        if (deleteError) {
            alert(deleteError);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            toast.success('Product deleted successfully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            
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
                    label: 'Store',
                    field: 'store',
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
                    label: 'Creation Date',
                    field: 'creationdate',
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
        adminProducts.products.forEach((product,index) => {
            data.rows.push({
                image:<img src = {product.images[0].url} style = {{width:'80px',height:'80px'}}></img>,
                store: adminProducts.storenames[index],
                name: product.name,
                price: `${symbol}${symbol=="€"? product.price:Math.round(currencydiff*product.price)}`,
                discount: product.discount,
                category: product.category,
                stock: product.stock,
                creationdate:product.creationdate.slice(0,10),
                actions: <Fragment>

                    
                     {/* if you want to add edit product feature
            
                    <Link to={`/admin/product/${product._id}`} className="btn btn-success py-1 px-2" style={{borderRadius:'4px'}}>
                        <i className="fa fa-pencil"></i>
                    </Link>
                    
                    */}
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
        dispatch(deleteAdminProduct(id));
        toast.success('Product deleted successfully');
        setTimeout("location.reload(true);",2000);
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