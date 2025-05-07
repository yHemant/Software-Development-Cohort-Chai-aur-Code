import nodemailer from "nodemailer";

// create transport
// mailOptions
// send mail

// 1. transport
const sendVerificationEmail = async (email, token) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
    
    // verification URL
    const verificationUrl = `${process.env.BASE_URL}/api/v1/users/verify/${token}`;
    console.log(`verification url created ${verificationUrl}`)

    // email content
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Please verify your email address",
      text: `
        Thank you for registering! Please verify your email address to complete your registration.
        ${verificationUrl}
        This verification link will expire in 10 mins.
        If you did not create an account, Please Ignore this email.
        `,
    };

      console.log(`mailOptions created ${mailOptions.from}`)
    // send email
    const info = await transporter.sendMail(mailOptions);
    console.log("Verification email sent: %s ", info.messageId);
    return true;

  } 
  catch (error) {
    console.error("Error sending verification email:", error);
    return false;
  }
};

export default sendVerificationEmail;