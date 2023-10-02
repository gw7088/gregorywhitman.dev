'use strict'

const
    Utils = require('./utils'),
    request = require('request'),
    UIDGenerator = require('uid-generator'),
    uidgen = new UIDGenerator(),
    path = require('path'),
    fs = require('fs'),
    sgMail = require('@sendgrid/mail'),
    nodemailer = require('nodemailer')
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

    async send_contact_email(data, callback){
        let self=this;
        if (typeof callback!='function') callback = function(){};

        // console.log('Message contents');
        // console.log(data);
        // const msg = {
        //     // to: 'gw@gregorywhitman.dev',
        //     to: 'gwhitman55@gmail.com',
        //     from: 'gw@gregorywhitman.dev',
        //     subject: 'Message From gregorywhitman.dev site',
        //     text: `${data.fname} : ${data.email}

        //             ${data.message}
        //         `,
        //     html: `<strong>${data.fname} : ${data.email}</strong>
        //             <p>${data.message}</p>
        //         `,
        // }

        let transporter = nodemailer.createTransport({
            host: "email-smtp.us-east-1.amazonaws.com",
            port: 587,
            secure: false,
            auth:{
                user: process.env.NODEMAILER_AWS_SMTP_USER,
                pass: process.env.NODEMAILER_AWS_SMTP_PASS,
            },
        });

        // Define email data
        const mailOptions = {
            from: 'gwhitman55@gmail.com', // Sender's email address
            to: 'gwhitman55@gmail.com', // Recipient's email address
            subject: 'Message From gregorywhitman.dev site', // Subject line
            html: `<strong>${data.fname} : ${data.email}</strong><p>${data.message}</p>`,
            text: `${data.fname} : ${data.email}
                    ${data.message}`

        };

        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('wt', error);
                return callback(self.simpleFail('Failed sending contact email'));
            } else {
                console.log('Email sent:', info.response);
                return callback(self.simpleSuccess('Successfully sent contact email'));
            }
        });
    }
}
