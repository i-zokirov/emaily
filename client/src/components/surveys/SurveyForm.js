import React from "react";
import {reduxForm, Field} from "redux-form";
import {Link} from "react-router-dom"
import _ from "lodash"
import SurveyField from "./SurveyField";
import validateEmails from "../../utils/validateEmails";
import FIELDS from "./formFields";
import M from "materialize-css";

class SurveyForm extends React.Component{
    componentDidMount() {
        // Auto initialize all the things!
     
        M.updateTextFields()
        
        
    }
    componentDidUpdate(){
     
        M.updateTextFields()
    }
    renderFields(){
        return _.map(FIELDS, ({label, name, htmlType, id}) => {
            return (
                <div className="input-field" key={id} >
                    <Field component={SurveyField} type="text" label={label} name={name} htmlType={htmlType} id={id} />
                </div>
            )
        })
    
    }
    
    render(){
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)} className="col s12">
                    <h5>Create a new survey campaign</h5>
                    {this.renderFields()}

                    <Link to="/surveys" type="submit" className="red btn-flat left white-text">
                        Cancel
                        <i className="material-icons left">cancel</i>
                    </Link>
                    <button type="submit" className="teal btn-flat right white-text">
                        Next
                        <i className="material-icons right">arrow_forward</i>
                    </button>
                </form>   
            </div>
        )
    }
}

const validate = (values)=>{

    const errors = {}
    errors.recipients = validateEmails(values.recipients || '')

    _.each(FIELDS, ({name, noValueError})=>{
        if(!values[name]){
            errors[name] = noValueError
        }
    });
    return errors
}

export default reduxForm({
    validate: validate,
    form: 'surveyForm',
    destroyOnUnmount: false
})(SurveyForm) 