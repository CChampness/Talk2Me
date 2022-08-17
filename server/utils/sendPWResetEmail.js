const nodemailer = require("nodemailer");

const contactEmail = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "champnesschris@gmail.com",
    pass: "oeznrogdeulxhftl",
  },
});

contactEmail.verify((error) => {
  console.log("contactEmail.verify");
  if (error) {
    console.log(error);
  } else {
    console.log("Ready to Send");
  }
});

module.exports = {
  sendPWResetEmail: function (emailContent) {
    console.log("sendPWResetEmail emailContent:", emailContent);

    const {name, email, code} = emailContent;
    console.log("name,email,code:",name,email,code);
    const mail = {
      from: name,
      to: email,
      subject: "Password Reset",
      html: `<p>Name: ${name}</p>
             <p>Email: ${email}</p>
             <p>Security Code: ${code}`,
    };

    console.log("mail:",mail);
    contactEmail.sendMail(mail, (error) => {
      console.log("contactEmail.sendMail");
      if (error) {
        res.json({ status: "ERROR" });
      } else {
        res.json({ status: "Email Sent" });
      }
    });
  }
};
