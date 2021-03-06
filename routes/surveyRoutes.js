const mongoose = require('mongoose')
const _ = require('lodash')
const {Path} = require('path-parser')
const {URL} = require('url')
const requireLogin = require('../middlewares/requireLogin')
const requireCredits = require('../middlewares/requireCredits')
const Mailer = require('../services/Mailer')
const surveyTemplate = require('../services/emailTemplates/surveyTemplate')
const Survey = mongoose.model("surveys");

module.exports = (app) => {
    app.get('/api/surveys/:survey_id/:answer', (req, res)=>{
        res.send('Thanks for your feedback!')
    });

    app.get('/api/surveys', requireLogin, async(req, res)=>{
        const surveys = await Survey.find({_user: req.user.id})
            .select({recipients: false});
        res.send(surveys)
    });

    app.post('/api/surveys', requireLogin, requireCredits, async(req, res)=>{
        const {title, subject, body, recipients} = req.body;
        const survey = new Survey({
            title,
            subject,
            body,
            recipients: recipients.split(',').map(email => ({ email: email.trim() })),
            _user: req.user.id
        });

        // sending email via sendgrid
        const mailer = new Mailer(survey, surveyTemplate(survey))

        try {
            await mailer.send()

            await survey.save()
            req.user.credits -= 1;
            const user = await req.user.save()
    
            res.send(user)
        
        } catch (error) {
            res.status(422).send(error)            
        }
    });

    app.post('/api/surveys/webhooks', (req, res)=>{
        const p = new Path('/api/surveys/:surveyId/:choice')
        _.chain(req.body)
            .map(({url, email})=>{
                const match = p.test(new URL(url).pathname)
                if(match){
                    return {email, surveyId: match.surveyId, choice: match.choice}
                }
            })
            .compact() // <=removing undefined vaules to return compact array of objects
            .uniqBy( 'email', 'surveyId') // <= checking uniques by email and surveyId
            .each(({surveyId, choice, email}) =>{
                Survey.updateOne({
                    _id: surveyId,
                    recipients: {
                        $elemMatch: {
                            email, 
                            responded: false
                        }
                    }
                }, {
                    $inc: {[choice]: 1},
                    $set: {'recipients.$.responded': true},
                    lastResponded: Date.now()
                }).exec() // <= issued a query to find the record of survey and update its values based on the click event
            })
            .value() // <= returning final value to events

        res.send({})
    })

}