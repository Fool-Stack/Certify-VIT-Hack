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

const userRegister = (req, res, next) => {
	User.find({ email: req.body.email })
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
						const user = new User({
							_id: new mongoose.Types.ObjectId(),
							email: req.body.email,
							password: hash,
							name: req.body.name,
							isEmailVerified: false,
						});
						user
							.save()
							.then(async (result) => {
								result.verification_key = shortid.generate();
								result.verification_key_expires =
									new Date().getTime() + 20 * 60 * 1000;
								await result
									.save()
									.then((result1) => {
										const msg = {
											to: result.email,
											from: process.env.sendgridEmail,
											subject: "Certify: Email Verification",
											text: " ",
											html: emailTemplates.VERIFY_EMAIL(result1),
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


const userLogin = (req, res, next) => {
	User.find({ email: req.body.email })
		.exec()
		.then((user) => {
      console.log(user)
			if (user.length < 1) {
				return res.status(401).json({
					message: "Auth failed: Email not found probably",
				});
			}
			//if (user[0].is_email_verified === false) {
     //   console.log("Please Verify your Email")
				//return res.status(409).json({
				//	message: "Please verify your email",
				//});
		//	}
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
              userId: user[0]._id,
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


const verifyEmail = async (req, res, next) => {
  const { verification_key } = req.body;
	await User.findOne({ verification_key })
		.then(async (user) => {
			if (Date.now() > user.verification_key_expires) {
				res.status(401).json({
					message: "Pass key expired",
				});
			}
			user.verification_key = null;
			user.verification_key_expires = null;
			user.is_email_verified = true;
			await user
				.save()
				.then((result1) => {
					res.status(200).json({
						message: "User verified",
					});
				})
				.catch((err) => {
					res.status(400).json({
						message: "Some error",
						error: err.toString(),
					});
				});
		})
		.catch((err) => {
			res.status(409).json({
				message: "Invalid verification key",
				error: err.toString(),
			});
    });
}

const resendVerifyMail = async (req, res, next) => {
  const { email } = req.body;
	const user = await User.findOne({ email });
	if (user) {
    user.verification_key = shortid.generate();
		user.verification_key_expires = new Date().getTime() + 20 * 60 * 1000;
		await user
			.save()
			.then((result) => {
        console.log(result)
				const msg = {
					to: email,
					from: process.env.sendgridEmail,
					subject: "Quzzie: Email Verification",
					text: " ",
					html: emailTemplates.VERIFY_EMAIL(result),
				};

				sgMail
					.send(msg)
					.then((result) => {
						res.status(200).json({
							message: "Email verification key sent to email",
						});
					})
					.catch((err) => {
            console.log(err)
						res.status(500).json({
							// message: "something went wrong1",
							error: err.toString(),
						});
					});
			})
			.catch((err) => {
        console.log(err)
				res.status(400).json({
					message: "Some error occurred",
					error: err.toString(),
				});
			});
	}
}

const seeAllEvents = async (req, res, next) => {
  const _id = req.user.userId
  const user = await User.findById( _id )      
  .populate({
    path: "events",
    select: "name participants date",
    populate:"event_id"
  })
  conaole.log(user.events)
  if(user){
    return res.status(200).json({
      message: 'Events found',
      events: user.events
    })
  }
  else{
    return res.status(404).json({
      message: 'User not found'
    })
  }
}

const forgotPassword = async (req, res, next) => {
  var email = req.body.email;
	User.findOne({ email: email }, (err, userData) => {
		if (!err && userData != null) {
			userData.pass_reset_key = shortid.generate();

			userData.pass_key_expires = new Date().getTime() + 20 * 60 * 1000; // pass reset key only valid for 20 minutes
			userData.save().then((x) => {
				const html = emailTemplates.FORGOT_PASSWORD(x);
			//	console.log(html);
				if (!err) {
					const msg = {
						to: email,
						from: process.env.sendgridEmail,
						subject: "Quizzie: Password Reset Request",
						text: " ",
						html: html,
					};

					sgMail
						.send(msg)
						.then((result) => {
							res.status(200).json({
								message: "Password reset key sent to email",
							});
						})
						.catch((err) => {
							res.status(500).json({
								// message: "something went wrong1",
								error: err.toString(),
							});
						});
				}
			});
		} else {
			res.status(400).send("email is incorrect");
		}
	});
}

const resetPassword = async (req, res, next) => {
  let resetKey = req.body.resetKey;
	let newPassword = req.body.newPassword;

	await User.findOne({ passResetKey: resetKey })
		.then(async (result) => {
			if (Date.now() > result.passKeyExpires) {
				res.status(401).json({
					message: "Pass key expired",
				});
			}
			result.password = bcrypt.hashSync(newPassword, 10);
			result.pass_reset_key = null;
			result.pass_key_expires = null;
			await result
				.save()
				.then((result1) => {
					res.status(200).json({
						message: "Password updated",
					});
				})
				.catch((err) => {
					res.status(403).json({
						message: "Unusual error",
						err: err.toString(),
					});
				});
		})
		.catch((err) => {
			res.status(400).json({
				message: "Invalid pass key",
			});
		});
}

const changePassword = async (req, res, next) => {
  await User.findOne({ _id: req.user.userId })
  .then(async (result) => {
    bcrypt.compare(req.body.password, result.password, (err, result1) => {
      if (err) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }
      if (result1) {
        bcrypt.hash(req.body.newPassword, 10, (err, hash) => {
          if (err) {
            res.status(400).json({
              err,
            });
          }
          User.updateOne(
            { _id: req.user.userId },
            { $set: { password: hash } }
          )
            .then((result) => {
              res.status(200).json({
                message: "Password changed",
              });
            })
            .catch((err) => {
              res.status(400).json({
                message: "error",
                error: err.toString(),
              });
            });
        });
      } else {
        return res.status(401).json({
          message: "Auth failed",
        });
      }
    });
  })
  .catch((err) => {
    res.status(400).json({
      error: err.toString(),
    });
  });
}

module.exports = {
  userRegister,
  userLogin,
  verifyEmail,
  resendVerifyMail,
  seeAllEvents,
  resetPassword,
  forgotPassword,
  changePassword,
}
