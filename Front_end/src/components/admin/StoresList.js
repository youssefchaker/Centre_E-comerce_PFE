import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'
import Breadcrumb from "../common/breadcrumb";
import {Helmet} from 'react-helmet'
import Sidebar from './sidebar_components/sidebar'
import Loader from "react-loader-spinner";
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors } from '../../actions/index'
import { toast } from 'react-toastify';



const StoresList = ({ history }) => {

    const dispatch = useDispatch();

    const { loading, stores, error } = useSelector(state => state.stores)
    const { symbol} = useSelector(state => state.symbol);
    const {currencydiff} = useSelector(state => state);

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

       

    }, [dispatch, alert, error, history])

   

    const setStores = () => {
        const data = {
            columns: [
                {
                    label: 'Store ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Image',
                    field: 'image',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Address',
                    field: 'address',
                    sort: 'asc'
                },
                {
                    label: 'Creation Date',
                    field: 'date',
                    sort: 'asc'
                },
                
                {
                    label: 'Buisness Domaine',
                    field: 'buisnessDomaine',
                    sort: 'asc'
                },
               
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }
        
        {stores &&
        stores.forEach(store => {
            data.rows.push({
                id: store._id,
                date: store.createdAt.slice(0,10),
                name: store.name,
                address: store.address + store.city + ',' +'\n'+ store.postalCode +'\n'+ store.country,
                buisnessDomaine: store.buisnessDomaine,
                image: <img src={store.avatar.url} style = {{width:'80px',height:'72px'}} alt="store avatar" />,
                actions: <Fragment>
                    <Link to={`/store/${store._id}`} className="btn btn-primary py-1 px-2" style={{borderRadius:'4px'}}>
                        <i className="fa fa-eye"></i>
                    </Link>
                </Fragment>
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
                        <h1 className="my-5">All Stores</h1>

                        <div className="row pr-4">
                                <div className="col-xl-12 col-sm-12 mb-3">
                                    <div className="card text-white bg-primary o-hidden h-100 " style={{borderRadius: '60px'}}>
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Total Subsciptions Amount<br /> <b>{symbol}{symbol==="€"?(stores[0].subscriptionPrice*stores.length).toFixed(2):Math.round((stores[0].subscriptionPrice*currencydiff)*stores.length)}</b>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        {loading ? <div style={{ textAlign: "center" }}><Loader
                             type="Rings"
                             color="#cc2121"
                             height={200}
                             width={300}
                /></div> : (
                            <MDBDataTable
                                data={setStores()}
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

export default StoresList