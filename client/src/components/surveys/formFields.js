const FIELDS = [
    {label: "Campaign Title", name: "title",  htmlType:"input" , id:"title", noValueError: "You must provide a title"},
    {label: "Subject Line", name: "subject",  htmlType:"input" , id:"subject", noValueError: "You must provide a subject line to your email"},
    {label: "Email Body", name: "body",  htmlType:"textArea" , id:"body", noValueError: "You must body text/message of your email"},
    {label: "Recipients List", name: "recipients",  htmlType:"textArea" , id:"recipients", noValueError: "You must provide recipients"},
]


export default FIELDS