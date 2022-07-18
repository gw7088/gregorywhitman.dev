'use strict'

const
    Utils = require('./utils'),
    request = require('request'),
    UIDGenerator = require('uid-generator'),
    uidgen = new UIDGenerator(),
    path = require('path'),
    fs = require('fs'),
    sgMail = require('@sendgrid/mail')
;

// Set sendGrid Creds
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


module.exports = class Admin extends Utils{

    getToken(callback){
        if (typeof callback!='function') callback = function(){};
        uidgen.generate((err, uid) => {
            if (err) throw err;
            callback(uid);
        });
    }

    lets_test_socketIO(options,callback){
        if (typeof callback!='function') callback = function(){};

        return callback(options);
    }

    send_contact_email(data, callback){
        let self=this;
        if (typeof callback!='function') callback = function(){};

        // console.log('Message contents');
        // console.log(data);
        const msg = {
            // to: 'gw@gregorywhitman.dev',
            to: 'gwhitman55@gmail.com',
            from: 'gw@gregorywhitman.dev',
            subject: 'Message From gregorywhitman.dev site',
            text: `${data.fname}
                    ${data.lname}

                    ${data.message}
                `,
            html: `<strong>${data.fname} : ${data.lname}</strong>
                    <p>${data.message}</p>
                `,
        }
        sgMail.send(msg).then(() => {
            // console.log('Email sent');
            return callback(self.simpleSuccess('Successfully sent contact email'));
        })
        .catch((error) => {
            // console.error(error);
            // console.log(error.response.body);
            return callback(self.simpleFail('Failed sending contact email'));
        });
    }
}
