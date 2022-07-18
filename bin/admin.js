'use strict'

const
    Utils = require('./utils'),
    request = require('request'),
    UIDGenerator = require('uid-generator'),
    uidgen = new UIDGenerator(),
    path = require('path'),
    fs = require('fs')
;

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


        const sgMail = require('@sendgrid/mail');
        // sgMail.setApiKey(process.env.SENDGRID_API_KEY)
        sgMail.setApiKey('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');
        const msg = {
            to: 'test@example.com', // Change to your recipient
            from: 'test@example.com', // Change to your verified sender
            subject: 'Sending with SendGrid is Fun',
            text: 'and easy to do anywhere, even with Node.js',
            html: '<strong>and easy to do anywhere, even with Node.js</strong>',
        }
        sgMail.send(msg).then(() => {
            console.log('Email sent');
        })
        .catch((error) => {
            console.error(error);
        });
    }
}
