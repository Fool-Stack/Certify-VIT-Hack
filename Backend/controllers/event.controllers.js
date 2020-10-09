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
  const {event_id} = req.body
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


module.exports= {
  addEvent,
  deleteEvent,
  getEventByID,
  updateEvent
}
