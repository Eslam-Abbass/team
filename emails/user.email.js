const nodemailer = require("nodemailer");

module.exports.sendEmail = async (options) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "an6800962@gmail.com",
      pass: "wqjsymqxuyqwvafl",
    },
  });

  transporter.sendMail(
    {
      from: '"SWVL TEAMS" <an6800962@gmail.com>', // sender address
      to: options.email, // list of receivers
      subject: "Hello ✔", // Subject line
      html: `
      
      <div style='background:#bbf;color:#fff;padding:20px'>
          <h1>${options.message}</h1>
          <a href ='http://localhost:3000/api/v1/users/verfiy/${options.token}'>click to verfiyed your email</a>
      </div>
      `, // html body
    },
    (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log(info);
      }
    }
  );

};
