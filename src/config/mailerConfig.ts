import dotenv from 'dotenv';
import exphbs from 'express-handlebars';

dotenv.config();
const environment = process.env;

const GmailTransport = {
  service: environment.GMAIL_SERVICE_NAME,
  host: environment.GMAIL_SERVICE_HOST,
  secure: environment.GMAIL_SERVICE_SECURE,
  port: environment.GMAIL_SERVICE_PORT,
  auth: {
    user: environment.GMAIL_USER_NAME,
    pass: environment.GMAIL_USER_PASSWORD
  }
};

const SMTPTransport = {
  host: environment.SMTP_SERVICE_HOST,
  port: environment.SMTP_SERVICE_PORT,
  secure: environment.SMTP_SERVICE_SECURE, // upgrade later with STARTTLS
  debug: true,
  auth: {
    user: environment.SMTP_USER_NAME,
    pass: environment.SMTP_USER_PASSWORD
  }
};


const MailDevTransport = {
  host: 'localhost',
  port: 1025,
  secure: false,
  ignoreTLS: true
};

export default {
  transportOptions : MailDevTransport,
  emailTemplatesOptions : {
    send: true,
    preview: false,
    views: {
      options: {
        extension: 'hbs',
      },
      root: 'src/templates/email',
    },
  }
}
