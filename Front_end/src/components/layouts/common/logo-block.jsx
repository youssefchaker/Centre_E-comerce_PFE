import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getStores } from '../../../actions/index'
import Slider from 'react-slick';

import {Slider2} from "../../../services/script";
import { toast } from 'react-toastify';

function LogoBlock ()  {





    const { loading, stores, error } = useSelector(state => state.stores) 
    const dispatch = useDispatch();


    useEffect(() => {
        if (error) {
             toast.error(error);
        }

        dispatch(getStores());


    }, [dispatch, alert,  error  ])

    
        return (
            <section className="section-b-space">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <Slider {...Slider2} className="slide-2 no-arrow">
                                
                                {stores && stores.map(store =>
                                    <div key={store._id}>
                                        <a href={null}>
                                        <img src={store.avatar.url} alt="store logo" style={{width:'200px',height:'160px',borderRadius:'3.5px'}} />

                                        </a>
                                    </div>
                                )}
                                
                                
                            </Slider>
                        </div>
                    </div>
                </div>
            </section>
        )
    
}

export default LogoBlock;