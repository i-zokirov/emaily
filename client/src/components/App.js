import React from "react";
import {Route, BrowserRouter} from "react-router-dom";

import {connect} from "react-redux";
import * as actions from "../actions";

import Header from "./Header";
import LandingPage from "./LandingPage";
import Dashboard from "./Dashboard";
import SurveyNew from "./surveys/SurveyNew";


class App extends React.Component{
    
    componentDidMount(){
        this.props.fetchUser()
    }
    
    render(){
        return (
            <div>
                <BrowserRouter>
                <Header/>
                    <div className="container" style={{marginTop: '20px'}}>
                        <Route path="/" exact component={LandingPage}/>
                        <Route path="/surveys" exact component={Dashboard}/>
                        <Route path="/surveys/new" exact component={SurveyNew}/>
                    </div>
                </BrowserRouter>
            </div>
        )
    }
}

export default connect(null, actions)(App)