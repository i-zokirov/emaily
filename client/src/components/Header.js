import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import Payments from "./Payments";

class Header extends React.Component{
    renderActionButtons(){
        switch(this.props.auth){
            case null:
                return ""
            case false:
                return(
                    <ul className="right">
                        <li >
                            <a className="waves-effect waves-light btn" href="/auth/google">Continue with G</a>
                        </li>
                    </ul>
                )
            default: 
                return (
                    <ul className="right">
                        <li>
                            <Link className="waves-effect waves-light btn" to="/surveys">Dahboard</Link>
                        </li>
                        <li>
                            <Payments/>
                        </li>
                        <li>
                            <span style={{marginLeft: "10px"}} className="waves-effect waves-light btn">Credits: {this.props.auth.credits}</span>
                        </li>
                        <li>
                            <a className="waves-effect waves-light btn" href="/api/logout">Logout</a>
                        </li>
                    </ul>
                )
        }
    }
    
    render(){
        
        return(
            <nav>
                <div className="nav-wrapper">
                    <Link to="/" style={{marginLeft: "10px"}} className="left brand-logo">
                        Emaily
                    </Link>
                    {this.renderActionButtons()}
                </div>
            </nav>
        )
    }
}

const mapStateToProps = ({auth})=>{
    return {auth}
}
export default connect(mapStateToProps)(Header)