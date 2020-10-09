const mongoose = require("mongoose");
const Admin = require('./admin');
const User = require('./user');

const eventSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  admins: [{
    admin_id: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" }
  }],
  participants: [{
    participant_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    certificate_link: { type: String }
  }],
  date: { type: Date },
  no_of_participants: { type: Number },
  admin_access_code: { type: String },
});

module.exports = mongoose.model("Event", eventSchema);
