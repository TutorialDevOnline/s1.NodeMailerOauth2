const nodemailer = require('nodemailer');
const {google} = require("googleapis");
const clientId = "1042945478172-l998pdj77d3kigjkdebq7enbbgo6nss3.apps.googleusercontent.com";
const clientSecret = "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";
const redirectUri="https://developers.google.com/oauthplayground";
const refreshToken = "1//04QoArUCVlisxCgYIARAAGAQSNwF-L9IrOMuEpbVJXGSDGYzwDl47pCvRmhUv6l8JHIxUK9AVRtqaKYdjarMEzUaDlipxyVpTuLI";

const oAuth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);
oAuth2Client.setCredentials({refresh_token: refreshToken});
async function main(){    
    try {
        const accessToken = await oAuth2Client.getAccessToken();
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type:"OAuth2", 
                clientId,
                clientSecret,
                refreshToken,
                accessToken,
                user:"tutorial.dev.online@gmail.com"
            },
          });
        
          // send mail with defined transport object
          const options = {
            from: '"Fred Foo 👻" <tutorial.dev.online@gmail.com>', // sender address
            to: "phongnguyendx@gmail.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
          }
          
          transporter.sendMail(options).
          then(res => {
              console.log(res);
          })
          .catch(err => {
            throw err
          })

    } catch (error) {
        console.log(error.message || error);
    }
}
main();