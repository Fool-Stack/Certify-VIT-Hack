const shortid = require('shortid')
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config()
const sgMail = require('@sendgrid/mail');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Event = require('../models/event');
const emailTemplates = require('../emails/email');

sgMail.setApiKey(process.env.SendgridAPIKey);

const addEvent = (req , res)=>{
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
          event.admins.push(req.user.userId)
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

module.exports= {
  addEvent
}
