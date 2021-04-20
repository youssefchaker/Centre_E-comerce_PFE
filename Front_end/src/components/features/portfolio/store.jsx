import React from 'react'
import { Link } from 'react-router-dom'

const Store = ({ store, columns }) => {
    
    return (
        
        <div className={`isotopeSelector filter fashion ${columns}`} >
                                            <div className="overlay">
                                                <div className="border-portfolio">
                                                <Link to={`/store/${store._id}`}>
                                                    <div className="overlay-background"  >
                                                        <i className="fa fa-plus" aria-hidden="true"></i>
                                                    </div></Link>
                                                    <img src={store.avatar.url} className="img-fluid blur-up lazyload bg-img" />
                                                </div>
                                            </div>
                                        </div>
          
    )
}

export default Store
