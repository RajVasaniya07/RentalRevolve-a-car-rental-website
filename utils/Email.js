const nodemailer = require('nodemailer');

const sendEmailToSeller = async (sellerEmail, renterName, carExists, /* other form fields */) => {
  try {
    // Setup Nodemailer transporter (replace with your email service details)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'meetvisodiya3@gmail.com',
        pass: 'Meet2004@',
      },
    });

    // Compose email
    const mailOptions = {
       from: 'meetvisodiya3@gmail.com',
      to: carExists.email, // Assuming there is a sellerEmail field in your Car model
      subject: 'Regarding your car listing',
      text: `Hello send,`};

    // Send email
    await transporter.sendMail(mailOptions);

    console.log('Email sent to seller');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = { sendEmailToSeller };