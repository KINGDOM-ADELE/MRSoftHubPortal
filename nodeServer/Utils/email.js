const nodemailer = require('nodemailer') 

const sendEmail = async (option) => {
    //CREATE TRANSPORTER 
    // use mail trap to test sending emails
    // www.mailtrap.io
    let transporter
    const Dev_transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.DeV_EMAIL_USER,
            pass: process.env.Dev_EMAIL_PASSWORD,
        }  
    })

    const Pro_transporter = nodemailer.createTransport({
        service: process.env.PROD_EMAIL_HOST,
        auth: {
            user: process.env.PROD_EMAIL_USER,
            pass: process.env.PROD_EMAIL_Password,
        } 
      });

      if(process.env.NODE_ENV === "development"){

        transporter = Dev_transporter
    }else{
        transporter = Pro_transporter

    }

// DEFINE EMAIL OPTIONS
const emailOptions = { 
    from: 'MRSOFT SUPPORT<support@mrsoft_training.com>',
    to: option.email,
    subject: option.subject,
    // text: option.message
    html: option.message
}


//sending the mail
console.log("SENDING EMAIL")
await transporter.sendMail(emailOptions)

}

module.exports = sendEmail 

