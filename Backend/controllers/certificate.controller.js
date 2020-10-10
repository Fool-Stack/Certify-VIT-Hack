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
var AWS = require('aws-sdk');
var s3 = new AWS.S3();

const viewCertificateDetailsFromQrCode = async (req, res, next) => {
  const { auth_params } = req.params
  const certificateDoc = await Certificate.findOne({ auth_params}).populate('event_id')
  console.log(certificateDoc)
  if(certificateDoc){
    res.status(200).json({
      message: "This certificate is valid",
      certificateDoc,
    })
  } else { 
    res.status(403).json({
      message: "This is not a valid certificate"
    })
  }
}

module.exports = {
  viewCertificateDetailsFromQrCode,
}