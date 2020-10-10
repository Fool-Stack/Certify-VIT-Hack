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

const viewCertificateDetailsFromQrCode = (req, res) => {
  const { certificate_params } = req.params
  const certificate = await Certificate.findOne({ auth_link: "https://certify.jugaldb.com/?id=" + certificate_params})
  if(certificate){
    res.status(200).json({
      message: "This certificate is valid",
      certificate,
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