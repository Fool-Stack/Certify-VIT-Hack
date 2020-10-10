const mongoose = require("mongoose");
const User = require('./user');

const certificateSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
  certificate_link: { type: String },
  event_id:{ type: mongoose.Schema.Types.ObjectId, ref: "Event" },
  auth_link: {type: String},
  auth_params: {type: String},
  user_name: { type: String },
  user_email: { type: String }, 
});

module.exports = mongoose.model("Certficate", certificateSchema);
