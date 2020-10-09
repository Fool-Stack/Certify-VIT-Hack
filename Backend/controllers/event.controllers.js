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
const htmlTemplates = require('../templates/html-1');
var AWS = require('aws-sdk');
var s3 = new AWS.S3();

sgMail.setApiKey(process.env.SendgridAPIKey);

const addEvent = async (req , res)=>{
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

const deleteEvent = async(req, res) => {
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

const getEventByID = async (req, res) => {
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

const updateEvent = async(req, res) => {
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

const getCertificates = async (req, res) => {
  const html = [];
  const event_id = req.body.event_id
  const users = await csv().fromFile(req.file.path);
  fs.unlinkSync(req.file.path);
  console.log(users)
  for(let i = 0; i < users.length; i++){
    html.push(htmlTemplates.TEMPLATE_1(users[i]))
  }
  console.log('html DOne')

  for(let i = 0; i < users.length; i++){
    
     const filename = 'gg' + Date.now()
    pdf.create(html[i], {}).toStream(function(err, stream) {
      if (err) return console.log(err)
      if(i==users.length-1){
      uploadToS3(res,stream, filename,users[i].email,event_id,true)
      }
      else{
        uploadToS3(res,stream, filename,users[i].email,event_id,false)
      }

    });
  }
  console.log(users)
}

const uploadToS3 = async (res,body, filename,email,event_id,isLast) => {
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
   await User.updateOne({email:email},{$push:{events:{event_id:event_id,certificate_link:data.Location}}}).then(()=>{
      console.log("lolgg")
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
