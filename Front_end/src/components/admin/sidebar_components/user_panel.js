import React, { Component } from 'react'

export class User_panel extends Component {
    render() {
        return (
            <div>
                <div className="sidebar-user text-center">
                    <div><img className="img-60 rounded-circle lazyloaded blur-up" src={`${process.env.PUBLIC_URL}/assets/images/dashboard/man.png`} alt="#" />
                    </div>
                    <h6 className="mt-3 f-14">JOHN</h6>
                    <p>general manager.</p>
                </div>
            </div>
        )
    }
}

export default User_panel