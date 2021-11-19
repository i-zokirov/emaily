const sendgrid = require('sendgrid');
const helper = sendgrid.mail;

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY


class Mailer extends helper.Mail{
    constructor({subject, recipients}, content){
        super()

        this.sgAPI = sendgrid(SENDGRID_API_KEY)

        this.from_email = new helper.Email('emaily.app.2021@gmail.com')
        this.subject = subject
        this.body = new helper.Content('text/html', content)
        this.recipients = this.formatAddresses(recipients)

        this.addContent(this.body)
        
        this.addClickTracking()
        this.addRecipients()
    }
    formatAddresses(recipients){
        return recipients.map(({email})=> new helper.Email(email))
    }  
    addClickTracking(){
        const trackingSettings = new helper.TrackingSettings()
        const clickTracking = new helper.ClickTracking(true, true)
        
        trackingSettings.setClickTracking(clickTracking)
        this.addTrackingSettings(trackingSettings)

    }
    addRecipients(){
        const personalize = new helper.Personalization();
        this.recipients.forEach(recipient =>{
            personalize.addTo(recipient)
        });
        this.addPersonalization(personalize)
    }

    async send(){
        const request = this.sgAPI.emptyRequest({
            method: "POST",
            path: '/v3/mail/send',
            body: this.toJSON()
        });

        // actual sending 
        const response = await this.sgAPI.API(request)
        return response
    }
  
}

module.exports = Mailer;