import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import _ from "lodash";
import FIELDS from "./formFields";
import { submitSurvey } from "../../actions";


const SurveyFormReview = ({onCancel, formValues, submitSurvey, history})=>{
    const renderReviewFields = _.map(FIELDS, ({label, name}) =>{
        return(
            <div>
                <label>{label}</label>
                <div>
                    {formValues[name]}
                </div>
            </div>
        )
    })
    
    return (
        <div>
            <h5>Please confirm your entries:</h5>
            <div>
                {renderReviewFields}   
            </div> 
            <button onClick={onCancel} className="yellow darken-3 btn-flat left white-text">
                Back
                <i className="material-icons left">arrow_back</i>
            </button>
            <button onClick={() => submitSurvey(formValues, history)} className="teal btn-flat right white-text">
                Send
                <i className="material-icons right">email</i>
            </button>
        </div>
    )
}

const mapStateToProps = (state)=>{
    return {formValues: state.form.surveyForm.values}
}
export default connect(mapStateToProps, {submitSurvey})(withRouter(SurveyFormReview))