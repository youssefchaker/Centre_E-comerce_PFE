import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'
import Breadcrumb from "../common/breadcrumb";
import {Helmet} from 'react-helmet'
import Sidebar from './sidebar_components/sidebar'
import Loader from "react-loader-spinner";
import { useDispatch, useSelector } from 'react-redux'
import { getAdminReviews, deleteAdminReview, clearErrors } from '../../actions/productActions'
import { toast } from 'react-toastify';

const ReviewsList = ({ history }) => {

    const dispatch = useDispatch();

    const { loading, error, reviews } = useSelector(state => state.adminreviews);
    const { error: deleteError, isDeleted } = useSelector(state => state.deleteadminproductreview)

    useEffect(() => {
        dispatch(getAdminReviews());

        if (error) {
            alert(error);
            dispatch(clearErrors())
        }

        if (deleteError) {
            alert(deleteError);
            dispatch(clearErrors())
        }

    }, [dispatch, alert, error, deleteError, isDeleted, history])

    const setReviews = () => {
        const data = {
            columns: [
                {
                    label: 'Product',
                    field: 'product',
                    sort: 'asc'
                },
                {
                    label: 'User',
                    field: 'user',
                    sort: 'asc'
                },
                {
                    label: 'Comment',
                    field: 'comment',
                    sort: 'asc'
                },
                {
                    label: 'Rating',
                    field: 'rating',
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
            reviews.reviews.forEach((review,index) => {
            data.rows.push({
                product:review.product,
                user: review.user,
                comment: review.comment,
                rating:review.rating,
                actions: <Fragment>
                    <button className="btn btn-danger py-1 px-2 ml-2" style={{borderRadius:'4px'}}  onClick={() => deleteReviewHandler(review.productid,review.reviewid)}>
                        <i className="fa fa-trash"></i>
                    </button>
                </Fragment>
            })
        })
    }

        return data;
    }

    const deleteReviewHandler = (productid,reviewid) => {
        dispatch(deleteAdminReview(reviewid,productid));
        toast.success('Review deleted successfully');
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
                        <h1 className="my-5">All Reviews</h1>

                        {loading ? <div style={{ textAlign: "center" }}><Loader
                             type="Rings"
                             color="#cc2121"
                             height={200}
                             width={300}
                /></div> : (
                            <MDBDataTable
                                data={setReviews()}
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

export default ReviewsList