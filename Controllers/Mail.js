const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const clientId =
  "869490705352-09vka5de0lcsh68rcp92fv0odammi0tt.apps.googleusercontent.com";
const clientSecret = "8hfKkTJ5fqDRNyafkgCtUpUz";
const redirectUri = "https://developers.google.com/oauthplayground";
const refreshToken =
  "1//04ol69nemV0oiCgYIARAAGAQSNwF-L9Irb9ZRSIgD5h9XrzjliItr31jN4-D-e8gnWGZ0HQmPpkXaat-DONHJOJ4srfNJvx86nWI";

const oAuth2Client = new google.auth.OAuth2(
  clientId,
  clientSecret,
  redirectUri
);

oAuth2Client.setCredentials({ refresh_token: refreshToken });

exports.sendMail = async function (reciever) {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "mohamedfarhan1424@gmail.com",
        clientId: clientId,
        clientSecret: clientSecret,
        refreshToken: refreshToken,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: "COMPANY DETAILS <mohamedfarhan1424@gmail.com>",
      to: reciever,
      subject: "Login Credentials",
      text:
        "Your Login credentials Username: " +
        reciever +
        " Password:" +
        reciever.split("@")[0] +
        "@123 login url : http://localhost:3000/employeelogin",
      html:
        "<h1>Your Login credentials<br/> Username :" +
        reciever +
        " <br/> Password:" +
        reciever.split("@")[0] +
        "@123 login url : http://localhost:3000/employeelogin </h1>",
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error.message;
  }
};
