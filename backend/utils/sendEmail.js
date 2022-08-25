const nodeMailer = require('nodemailer');
const { google } = require('googleapis');
const { OAuth2 } = google.auth;

const sendEmail = async (options) => {
    
    const {
        OAUTH_PLAYGROUND,
        MAILING_SERVICE_CLIENT_ID,
        MAILING_SERVICE_CLIENT_SECRET,
        MAILING_SERVICE_REFRESH_TOKEN,
        SENDER_EMAIL_ADDRESS,
    } = process.env;

    const oauth2Client = new OAuth2(
        MAILING_SERVICE_CLIENT_ID,
        MAILING_SERVICE_CLIENT_SECRET,
        OAUTH_PLAYGROUND
    );

    oauth2Client.setCredentials({
        refresh_token: MAILING_SERVICE_REFRESH_TOKEN,
    });

    const accessToken = oauth2Client.getAccessToken();
    const smtpTransport = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: SENDER_EMAIL_ADDRESS,
            clientId: MAILING_SERVICE_CLIENT_ID,
            clientSecret: MAILING_SERVICE_CLIENT_SECRET,
            refreshToken: MAILING_SERVICE_REFRESH_TOKEN,
            accessToken
        },
    });

    const mailOptions = {
        from: SENDER_EMAIL_ADDRESS,
        to: options.email,
        subject: options.subject,
        text: options.message
    }

    await smtpTransport.sendMail(mailOptions);
}

module.exports = sendEmail;