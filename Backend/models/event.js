const mongoose = require("mongoose");
const User = require('./user');

const eventSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  admins: [{
    admin_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  }],
  participants: [{
    participant_email: { type: String, },
    participant_name: { type: String},
    certificate_link: { type: String }
  }],
  created_by :{ type: mongoose.Schema.Types.ObjectId, ref: "User" },
  date: { type: Date },
  admin_access_code: { type: String },
});

module.exports = mongoose.model("Event", eventSchema);
