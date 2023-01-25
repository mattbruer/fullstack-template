// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region
AWS.config.update({ region: 'us-east-2' });

function sendPasswordResetEmail(email, resetToken) {
  var params = {
    Destination: {
      /* required */
      CcAddresses: [],
      ToAddresses: [
        email,
        /* more items */
      ],
    },
    Message: {
      /* required */
      Body: {
        /* required */
        Html: {
          Charset: 'UTF-8',
          Data: `<a href='http://localhost:3000/forgot-password/${resetToken}'>click</a> `,
        },
        Text: {
          Charset: 'UTF-8',
          Data: `${resetToken}`,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'Test email',
      },
    },
    Source: 'mbruer@gmail.com' /* required */,
    ReplyToAddresses: [
      // 'mbruer@gmail.com',
      /* more items */
    ],
  };
  var sendPromise = new AWS.SES({ apiVersion: '2010-12-01' })
    .sendEmail(params)
    .promise();

  // Handle promise's fulfilled/rejected states
  return sendPromise;
}

module.exports = { sendPasswordResetEmail };
