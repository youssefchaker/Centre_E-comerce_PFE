import React, {Component} from 'react';

class RatingDisplay extends Component {

    constructor (props) {
        super (props)
    }

    render (){
        const {rating} = this.props
        let tab=[];
        switch(rating){
            case 1:
                tab.push(<i className="fa fa-star"></i>)
                tab.push(<i className="fa fa-star-o"></i>)
                tab.push(<i className="fa fa-star-o"></i>)
                tab.push(<i className="fa fa-star-o"></i>)
                tab.push(<i className="fa fa-star-o"></i>)
                break;
            case 2:
                tab.push(<i className="fa fa-star"></i>)
                tab.push(<i className="fa fa-star"></i>)
                tab.push(<i className="fa fa-star-o"></i>)
                tab.push(<i className="fa fa-star-o"></i>)
                tab.push(<i className="fa fa-star-o"></i>)
                break;
            case 3:
                tab.push(<i className="fa fa-star"></i>)
                tab.push(<i className="fa fa-star"></i>)
                tab.push(<i className="fa fa-star"></i>)
                tab.push(<i className="fa fa-star-o"></i>)
                tab.push(<i className="fa fa-star-o"></i>)
                break;
            case 4:
                tab.push(<i className="fa fa-star"></i>)
                tab.push(<i className="fa fa-star"></i>)
                tab.push(<i className="fa fa-star"></i>)
                tab.push(<i className="fa fa-star"></i>)
                tab.push(<i className="fa fa-star-o"></i>)
                break;
            case 5:
                tab.push(<i className="fa fa-star"></i>)
                tab.push(<i className="fa fa-star"></i>)
                tab.push(<i className="fa fa-star"></i>)
                tab.push(<i className="fa fa-star"></i>)
                tab.push(<i className="fa fa-star"></i>)
                break;
        }
        return (
            <div>{tab}</div>
        )
    }
}


export default RatingDisplay;