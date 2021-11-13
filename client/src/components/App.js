import React from "react";
import {Route, BrowserRouter} from "react-router-dom";

import {connect} from "react-redux";
import * as actions from "../actions";

import Header from "./Header";
import LandingPage from "./LandingPage";
const Dashboard = () => <h2>Dashboard</h2>
const SurveyNew = () => <h2>SurveyNew</h2>


class App extends React.Component{
    
    componentDidMount(){
        this.props.fetchUser()
    }
    
    render(){
        return (
            <div>
                <BrowserRouter>
                <Header/>
                    <React.Fragment>
                        <Route path="/" exact component={LandingPage}/>
                        <Route path="/surveys" exact component={Dashboard}/>
                        <Route path="/surveys/new" exact component={SurveyNew}/>
                    </React.Fragment>
                </BrowserRouter>
            </div>
        )
    }
}

export default connect(null, actions)(App)