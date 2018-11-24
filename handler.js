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
console.log(mailer.transporter)

module.exports.contact = (event, context, callback) => {
  let body = querystring.parse(event.body)
  mailer.sendMail(
    {
      from: body.from,
      to: [CONTACT_ADDRESS],
      subject: body.subject || '[No subject]',
      html: body.message || '[No message]'
    },
    function(err, info) {
      if (err) return callback(err)
      callback(null, { statusCode: 200, body: 'Success!' })
    }
  )
}
