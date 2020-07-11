const express = require('express');
const bodyParser = require('body-parser');
const expressHandlebars = require('express-handlebars');
const nodeMailer = require('nodemailer');
const path = require('path');
const templateDesign = require('./views/template');

const app = express();

// PORT
const port = 3000;


// VIEW ENGINE SETUP
// app.engine('handlebars',expressHandlebars());
//set default engine, and provide [handlebars as] extension
// app.set('views engine', 'handlebars');

app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'))


// Static folder
app.use(express.static(path.join(__dirname,'public')));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());


// app.use('/',(req,res)=>{
// 	res.json({
// 		message: 'hello',
// 	});
// });

app.get('/',(req,res)=>{
	res.render('form');
});
app.post('/send',(req,res)=>{
	console.log(req.body);
	const output = `${templateDesign}`;


// async..await is not allowed in global scope, must use a wrapper
async function main() {
  const userEmail = `arnabbanerjee.db@gmail.com`;
  const userPassword = `banra#1997`;
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodeMailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      // user: `newton.bode@ethereal.email`, // generated ethereal user
      user: userEmail, // generated ethereal user
      pass: userPassword, // generated ethereal password
    },
    // debug: true, // show debug output
    // logger: true, // log information in console
    // tls:{
    // 	rejectUnauthorized: false,
    // }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `"From Rahul Tiwari 👻 ✔`, // sender address
    to: `${req.body.email}`, // list of receivers
    subject: `${req.body.subject} ✔`, // Subject line
    text: `${req.body.text}`, // plain text body
    html: output, // html body
     dsn: {
        id: 'some random message specific id',
        return: 'headers',
        notify: ['failure', 'delay'],
        recipient: `${req.body.email}`,
    },
      // attachments: [
      //   {
      //     filename: 'mailtrap.png',
      //     path: __dirname + '/mailtrap.png',
      //     cid: 'uniq-mailtrap.png' 
      //   },
            //  {   // utf-8 string as an attachment
            //   filename: 'text.txt',
            //   content: 'Attachments'
            //   },
            // {
            //   filename: 'logo',
            //   path: 'newlogo.png'
            // }
      // ]
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodeMailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      transporter.sendMail(info, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
        console.log('Email sent: ' + info.dsn.id);
      }
    }); 
}

main().catch(console.error);



	res.end();
});

app.listen(port,()=>{
	console.log(`Linstning port is : ${port}`);
});