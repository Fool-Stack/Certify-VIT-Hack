const shortid = require('shortid')
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const sgMail = require('@sendgrid/mail');
const jwt = require('jsonwebtoken');
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
                        // res.status(500).json({
                        //   message: err.toString()
                        // })
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


const adminLogin = (req, res) => {
	Admin.find({ email: req.body.email })
		.exec()
		.then((user) => {
      console.log(user)
			if (user.length < 1) {
				return res.status(401).json({
					message: "Auth failed: Email not found probably",
				});
			}
			// if (user[0].is_email_verified === false) {
      //   console.log("Please Verify your Email")
			// 	return res.status(409).json({
			// 		message: "Please verify your email",
			// 	});
			// }
			bcrypt.compare(req.body.password, user[0].password, (err, result) => {
				if (err) {
          console.log(err)
					return res.status(401).json({
						message: "Auth failed",
					});
				}
				if (result) {
					const token = jwt.sign(
						{
							userType: user[0].userType,
							userId: user[0]._id,
							email: user[0].email,
							name: user[0].name,
							mobileNumber: user[0].mobileNumber,
						},
						process.env.jwtSecret,
						{
							expiresIn: "1d",
						}
          );
          console.log(user[0])
					return res.status(200).json({
						message: "Auth successful",
						userDetails: {
							userType: user[0].userType,
							userId: user[0]._id,
							name: user[0].name,
							email: user[0].email,
							mobileNumber: user[0].mobileNumber,
						},
						token: token,
					});
				}
				res.status(401).json({
					message: "Auth failed1",
				});
			});
		})
		.catch((err) => {
			res.status(500).json({
				error: err,
			});
		});
}

module.exports = {
  adminRegister,
  adminLogin,
}