import React from "react";
import StripeCheckout from "react-stripe-checkout";
import {connect} from "react-redux";
import * as actions from "../actions";


class Payments extends React.Component{
    render(){
        
        return (
            <StripeCheckout 
            amount={500} 
            name="Emaily"
            description="$5 for 5 survey credits"
            token={token => this.props.handleToken(token)} 
            stripeKey={process.env.REACT_APP_ST_PUBLISHABLE_KEY}>
                <button className="waves-effect waves-light btn">Add credits</button>
            </StripeCheckout>

        )
    }
}

export default connect(null, actions)(Payments)
