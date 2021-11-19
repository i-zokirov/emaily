import React from "react";

const SurveyField = ({input, label, htmlType, id, meta: {error, touched}}) =>{
    
    return (
        <>
            
            <input type="text" className="validate" id={id} {...input} />
            <label  htmlFor={id}>{label}</label>
            <div className="red-text" style={{ marginBottom: '20px' }}>
                {touched && error}
            </div>
            
        </>
    )
    // const textAreaType = (
    //     <div>
    //         <label htmlFor={id}>{label}</label>
    //         <textarea rows="4" cols="50" placeholder={`${id === "recipients" ? 'Enter your recipient emails as comma seperated. Ex: example1@email.com, example2@email.com' : ''}`} className="validate materialize-textarea" id={id}></textarea>
    //         <div className="red-text" style={{fontSize: "14px"}}>
    //             {touched && error}
    //         </div>
    //     </div>
    // )
    // return htmlType === "input" ? inputType : textAreaType
}

export default SurveyField