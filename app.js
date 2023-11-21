const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');

// These id's and secrets should come from .env file.
const CLIENT_ID = '144515213214-munh5506v12c0qro91gg56g7tjglkmvc.apps.googleusercontent.com';
const CLEINT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04Il9FvhvH2SRCgYIARAAGAQSNAF-L9IrndBw9e0Pgz8XjwZsovUMPr9Yl-C-_k7-x0IXkNKFVhkSaFxfC8tCNbTNL5i4S6U';

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLEINT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const app = express();
const PORT = 3000; // Choose a port number

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Endpoint to handle form submission
app.post('/send-email', async (req, res) => {
  try {
    const { firstName, lastName, date, time, email } = req.body;

    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'camacholucinda@gmail.com',
        clientId: CLIENT_ID,
        clientSecret: CLEINT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: 'Lucinda Walker <camacholucinda@gmail.com>',
      to: `${email}`,
      subject: 'Successful Booking',
      text: `Congrats ${firstName} ${lastName}! Your appointment on ${date} at ${time} has been booked!`,
    };

    const result = await transport.sendMail(mailOptions);

    res.send('Email sent successfully');
  } catch (error) {
    res.status(500).send('Error sending email');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
