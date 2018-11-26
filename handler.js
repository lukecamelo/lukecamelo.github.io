const CONTACT_ADDRESS = 'llukecamelo@gmail.com'
const querystring = require('querystring')
require('dotenv').config()

const mailer = require('nodemailer').createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.GMAIL_ADDRESS,
    pass: process.env.GMAIL_PASSWORD
  }
})

module.exports.contact = (event, context, callback) => {
  let body = JSON.parse(event.body)
  mailer.sendMail(
    {
      from: body.name,
      to: [CONTACT_ADDRESS],
      subject: body.name + ' - ' + body.subject || '[No subject]',
      html: body.message || '[No message]'
    },
    function(err, info) {
      if (err) return callback(err)
      callback(null, { statusCode: 200, body: 'Success!' })
    }
  )
  const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({ message: 'Success!' })
  }
  callback(null, response)
}
