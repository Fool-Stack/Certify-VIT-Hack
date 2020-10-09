const shortid = require('shortid')
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const sgMail = require('@sendgrid/mail');
const JWT = require('jsonwebtoken');
const Admin = require('../models/admin');
const User = require('../models/user');
const Event = require('../models/event');

const adminRegister = (req, res) => {
	Admin.find({ email: req.body.email })
		.exec()
		.then((user) => {
			if (user.length >= 1) {
        res.status(409).json({
          message:"Email Exists"
        })
			} else {
				bcrypt.hash(req.body.password, 10, (err, hash) => {
					if (err) {
						return res.status(500).json({
							error: err,
						});
					} else {
						const user = new Admin({
							_id: new mongoose.Types.ObjectId(),
							email: req.body.email,
							password: hash,
							name: req.body.name,
							isEmailVerified: false,
						});
						user
							.save()
							.then(async (result) => {
								result.verificationKey = shortid.generate();
								result.verificationKeyExpires =
									new Date().getTime() + 20 * 60 * 1000;
								await result
									.save()
									.then((result1) => {
										// const msg = {
										// 	to: result.email,
										// 	from: process.env.sendgridEmail,
										// 	subject: "Certify: Email Verification",
										// 	text: " ",
										// 	html: emailTemplates.VERIFY_EMAIL(result1),
										// };
										// sgMail
										// 	.send(msg)
										// 	.then((result) => {
										// 		console.log("Email sent");
										// 	})
										// 	.catch((err) => {
                    //     console.log(err)
                    //     const code = HTTPStatus['500']
                    //     const message = HTTPStatus['500_MESSAGE']
                    //     return sendJSONResponse(res, code, message)
                    //   });
                      console.log(`User created ${result}`)
                      res.status(201).json({
                        userDetails: {
                          userId: result._id,
                          email: result.email,
                          name: result.name,
                          mobileNumber: result.mobileNumber,
                        },
                      })
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
		})
		.catch((err) => {
      console.log(err)
      res.status(500).json({
        message: err.toString()
      })
    });
}

module.exports = {
  adminRegister
}