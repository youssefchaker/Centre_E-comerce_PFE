import React, { Fragment, useEffect } from 'react'
import { MDBDataTable } from 'mdbreact'

import Breadcrumb from "../common/breadcrumb";
import {Helmet} from 'react-helmet'
import Sidebar from './sidebar_components/sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { getAdminReviews, deleteAdminReview, clearErrors } from '../../actions/productActions'
import { DELETE_ADMIN_REVIEW_RESET } from '../../constants/productConstants'
import { toast } from 'react-toastify';


const ProductReviews = ({ history }) => {

    

    
    const dispatch = useDispatch();

    const { error, reviews } = useSelector(state => state.adminReviews);
    const { isDeleted, error: deleteError } = useSelector(state => state.review)
    
    useEffect(() => {

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

        
            dispatch(getAdminReviews())
        

        if (isDeleted) {
            toast.success('Review deleted successfully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });

                history.push('/admin/reviews');
            dispatch({ type: DELETE_ADMIN_REVIEW_RESET })
        }



    }, [dispatch, alert, error, isDeleted, deleteError])

    const deleteReviewHandler = (id) => {
        dispatch(deleteAdminReview(id))
    }

    

    const setReviews = () => {
        const data = {
            columns: [
                {
                    label: 'Review ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Product',
                    field: 'product',
                    sort: 'asc'
                },
                
                {
                    label: 'Rating',
                    field: 'rating',
                    sort: 'asc'
                },
                {
                    label: 'Comment',
                    field: 'comment',
                    sort: 'asc'
                },
                {
                    label: 'User ID',
                    field: 'user',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }
        if (reviews) {
            
                 reviews.forEach(review => {
                     review.productreviews.forEach(object => {

                        data.rows.push({

                            id: object._id,
                            product: review.productname,
                            rating: object.rating,
                            comment: object.comment,
                            user: object.user,
            
                            actions:
                                <button className="btn btn-danger py-1 px-2 ml-2" style={{borderRadius:'4px'}} onClick={() => deleteReviewHandler(object._id)}>
                                    <i className="fa fa-trash"></i>
                                </button>  


                     })
               


                })
                
            })
        }
     
        return data;
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
                        

                        
                    {reviews && reviews.length > 0 ? (
                            <MDBDataTable
                                data={setReviews()}
                                className="px-3"
                                bordered
                                striped
                                hover
                            />
                        ) : (
                                <p className="mt-5 text-center">No Reviews.</p>
                            )}
                      


                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}

export default ProductReviews