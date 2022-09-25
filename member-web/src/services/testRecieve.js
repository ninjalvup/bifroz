
require('dotenv').config();  
const accountSid = process.env.TWILIO_ACCOUNT_SID;
console.log(accountSid);
const authToken = process.env.TWILIO_AUTH_TOKEN;
console.log(authToken);

const verifyservice = process.env.TWILIO_VERIFY_SERVICE_SID;

const twilio = require('twilio');
const client = new twilio(accountSid, authToken);



// Check code validation
  client.verify.services(verifyservice)
      .verificationChecks
      .create({to: '+66818997220', code: '00182'})
      .then(verification_check => console.log(verification_check.status));


