const shortid = require('shortid')
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config()
const sgMail = require('@sendgrid/mail');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Event = require('../models/event');
const emailTemplates = require('../emails/email');

