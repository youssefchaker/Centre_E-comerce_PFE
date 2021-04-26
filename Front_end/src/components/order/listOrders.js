import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'
import {Helmet} from 'react-helmet'
import Breadcrumb from "../common/breadcrumb";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux'
import { myOrders, clearErrors } from '../../actions/orderActions'
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";


const ListOrders = () => {

    const dispatch = useDispatch();

    const { loading, error, orders } = useSelector(state => state.myOrders);
    const {symbol} = useSelector(state => state.symbol);
    const {currencydiff} = useSelector(state => state);

    useEffect(() => {
        dispatch(myOrders());

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
    }, [dispatch, alert, error])

    function setOrders ()  {

        const data = {
            columns: [
                {
                    label: 'Order ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Creation Date',
                    field: 'date',
                    sort: 'asc'
                },
                {
                    label: 'Num of Items',
                    field: 'numOfItems',
                    sort: 'asc'
                },
                {
                    label: 'Amount',
                    field: 'amount',
                    sort: 'asc'
                },
                {
                    label: 'Status',
                    field: 'status',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'asc'
                },
            ],
            rows: []
        }
        
        if (orders) {
        orders.forEach(order => {
            data.rows.push({
                id: order._id,
                date: order.createdAt.slice(0,10),
                numOfItems: order.orderItems.length,
                amount: `${symbol}${symbol=="€"? (Math.round(order.totalPrice)):Math.round((currencydiff*(order.totalPrice) + Number.EPSILON) )}`,
                status: order.orderStatus && String(order.orderStatus).includes('Delivered')
                    ? <p style={{ color: 'green' }}>{order.orderStatus}</p>
                    : <p style={{ color: 'red' }}>{order.orderStatus}</p>,
                actions:
                 <Link to={`/myorder/${order._id}`} className="btn btn-primary">
                        <i className="fa fa-eye"></i>
                    </Link>
            })
        })
    }
         

        return data;
    }

    return (
        <div>

             {/*SEO Support*/}
             <Helmet>
                    <title>Mall</title>
                    <meta name="description" content=" online mall." />
                </Helmet>
                {/*SEO Support End */}

                <Breadcrumb  title={'MY ORDERS'}/>
                
                {loading ? <div style={{ textAlign: "center" }}><Loader
                             type="Rings"
                             color="#cc2121"
                             height={200}
                             width={300}
                /></div> : (


                <MDBDataTable
                    data={setOrders()}
                    bordered
                    striped
                    className="px-3"
                    hover
                />
                )}

            </div>
    )
}

export default ListOrders