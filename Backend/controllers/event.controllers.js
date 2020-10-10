const shortid = require('shortid')
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config()
const sgMail = require('@sendgrid/mail');
const jwt = require('jsonwebtoken');
const pdf = require('html-pdf');
const csv = require('csvtojson');
const fs = require('fs');
const User = require('../models/user');
const Event = require('../models/event');
const Certificate = require('../models/certificate')
const emailTemplates=require('../emails/email')
const htmlTemplates = require('../templates/html-1');
var qrcode = require('qrcode')
sgMail.setApiKey(process.env.SendgridAPIKey);
const AWS=require('aws-sdk')
AWS.config.update({
  accessKeyId: process.env.AWS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS
});




const addEvent = async (req , res, next)=>{
  if(req.body.secret==null){
    return res.status(403).json({
      message: "Only admins can create an event"
    })
  }
  else{
      if(!(req.body.secret==process.env.AdminSignupCode)){
        return res.status(403).json({
          message: "Only admins can create an event"
        })
      }
    const { name , date } = req.body;
    const created_by= req.user.userId
    const event = new Event({
      _id:  new mongoose.Types.ObjectId(),
      name ,
      date,
      created_by
    }) 
    event
      .save()
        .then(async (event)=>{
          await User.updateOne({_id:created_by},{$push:{events:{event_id:event._id,is_admin:true}}});
          event.admins.push({admin_id: req.user.userId})
          await event
                  .save();
          console.log(event)
          res.status(201).json({
            event
          })
        })
        .catch((err)=>{
          res.status(400).json({
            error:err.toString()
          })
        })  
      }
}

const deleteEvent = async(req, res, next) => {
  const { event_id } = req.body
  await Event.deleteOne({_id: event_id})
  .then((result)=>{
    console.log('Deleted')
    res.status(200).json({
      message: 'Sucessfully Deleted'
    })
  }).catch((err)=>{
    console.log(err.toString())
    res.status(400).json({
      message: err.toString()
    })
  })
}

const getEventByID = async (req, res, next) => {
  const event_id = req.params.id
  const event = await Event.findById(event_id)
  if(event){
    console.log(event)
    res.status(200).json({
      message: 'Event Found',
      event
    })
  }
  else{
    res.status(404).json({
      message: 'Event not Found'
    })
  }
}

const updateEvent = async(req, res, next) => {
  await Event.updateOne({ _id: req.body._id }, req.body).then((result)=>{
    console.log(req.body)
    return res.status(200).json({
      message: 'Event Updated'
    })
  }).catch((err)=>{
    return res.status(400).json({
      message: 'Check your body'
    })
  })
}

// const convertToPDF = (data) => {
//   const html = htmlTemplates.TEMPLATE_1(data)
//   pdf.create(html, {}).toFile('./businesscard.pdf', function(err, res) {
//   if (err) return console.log(err);
//   console.log(res); // { filename: '/app/businesscard.pdf' }
// });
// }

// convertToPDF({
//   name:"Jugal",
//   event: "GG",
//   grade: "10",
//   date: "10-10-2002"
// })

const getCertificates = async (req, res, next) => {
  let html = [];
  const event_id = req.body.event_id
  const users = await csv().fromFile(req.file.path);
  fs.unlinkSync(req.file.path);
  console.log(users)
  for(let i = 0; i < users.length; i++){
    const QRCodeLINK = 'https://certify.jugaldb.com/?id=' + shortid.generate()
  //   users[i].link = await qrcode.toDataURL(QRCodeLINK)
  //   console.log(QRCodeLINK)
  //  // var base64Data = users[i].link.replace(/^data:image\/png;base64,/, "");
  //   buff = Buffer.from(users[i].link.replace(/^data:image\/\w+;base64,/, ""),'base64')
   
  // var params = {
  //   ACL: 'public-read',
  //   Bucket: process.env.AWS_S3_BUCKET,
  //   Key: users[i].name +'.jpeg'
  // };
  // //  var params = {
  //   ACL: 'public-read',
  //   Bucket: process.env.AWS_S3_BUCKET,
  //   KEY: 'qr'
  // };
  // var s3Bucket = new AWS.S3( { params} );
  // var data = { 
  //   Body: buff,
  //   ContentEncoding: 'base64',
  //   ContentType: 'image/jpeg'
  // };
  // await s3Bucket.upload(data, async function(err, data){

        // console.log('succesfully uploaded the image!',data.Location);
        html.push(htmlTemplates.TEMPLATE_1(users[i]))
        const filename = 'gg' + Date.now()
        await pdf.create(html[i], { timeout: '100000' }).toStream(async function(err, stream) {
          if (err) return console.log(err)
          if(i==users.length-1){
         await  uploadToS3(res,stream, filename,users[i].email,event_id,true, users[i].name, QRCodeLINK)
          }
          else{
          await   uploadToS3(res,stream, filename,users[i].email,event_id,false, users[i].name, QRCodeLINK)
          }
    
        });
      
  // });
    // await fs.writeFile("out.png", base64Data, 'base64', function(err) {
    //   console.log(err);
    // });

    
   
  }
  console.log(users)
}

const uploadToS3 = async (res,body, filename,email,event_id,isLast, name, QRCodeLINK) => {
  AWS.config.update({
    accessKeyId: process.env.AWS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS
  });

  var s3 = new AWS.S3();

  var params = {
    Body: body,
    ACL: 'public-read',
    Bucket: process.env.AWS_S3_BUCKET,
    Key: filename +'.pdf'
  };
  await s3.upload(params, async function(err, data) {
    console.log(err, data);
    const user = await User.findOne({email})
    if(!user){
      bcrypt.hash(email, 10, (err, hash) => {
        if (err) {
          return res.status(500).json({
            error: err,
          });
        } else {
          const user = new User({
            _id: new mongoose.Types.ObjectId(),
            email: email,
            password: hash,
            name: name,
            isEmailVerified: true,
          });
          user
            .save()
            .then(async (result) => {
                  const msg = {
                    to: result.email,
                    from: process.env.sendgridEmail,
                    subject: "Certify: Certificate Generation",
                    text: " ",
                    html: emailTemplates.VERIFY_EMAIL(result),//////change email
                  };
                  sgMail
                    .send(msg)
                    .then((result) => {
                      console.log("Email sent");
                    })
                    .catch((err) => {
                      console.log(err)
                      res.status(500).json({
                        message: err.toString()
                      })
                    });
                    console.log(`User created ${result}`)
                    res.status(201).json({
                      userDetails: {
                        userId: result._id,
                        email: result.email,
                        name: result.name,
                        mobileNumber: result.mobileNumber,
                      },
                    })
                .catch((err) => {
                  console.log(err)
                  res.status(400).json({
                    message: err.toString()
                  })
                });
            })
            .catch((err) => {
              console.log(err)
              res.status(500).json({
                message: err.toString()
              })
            });
        }
      });
    }
   await User.updateOne({email:email},{$push:{events:{event_id:event_id,certificate_link:data.Location}}}).then(async()=>{
    const certificate= new Certificate({
      _id:new mongoose.Types.ObjectId(),
       certificate_link: data.Location,
       auth_link: QRCodeLINK,
       user_name: name,
       user_email: email,
     })
     await certificate.save()
      console.log(certificate)
      if(isLast){
         return res.status(200).json({
            message : "chintu koding"
          })
      }
      else{
      return;
      }
    }).catch((err)=>{
     throw err
    })
  });
}

module.exports= {
  addEvent,
  deleteEvent,
  getEventByID,
  updateEvent,
  getCertificates
}
