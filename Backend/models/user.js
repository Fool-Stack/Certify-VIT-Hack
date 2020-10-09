const mongoose = require("mongoose");
const Event = require('./event');
const Admin = require('./admin');


const userSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	user_type: { type: String, default: "User" },
  name: { type: String, required: true },
  google_id: { type: Number },
	email: {
		type: String,
		required: true,
		match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
  events: [{
    event_id: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
    certificate_link: { type: String }
  }],
	password: { type: String},
  token: { type: String,},
	pass_reset_key: { type: String },
	pass_key_expires: { type: Number },
	verification_key: { type: String },
	verification_key_expires: { type: Number },
	is_email_verified: { type: Boolean, default: false },
});

module.exports = mongoose.model("User", userSchema);
