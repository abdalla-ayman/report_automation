const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  username: { type: String, required: true },
  passkey: { type: String, required: true },
  group: {
    type: String,
    enum: [
      "الحافظين الجدد ١",
      "الحافظين الجدد ٢",
      "الحافظين الجدد ٣",
      "الحافظين الجدد ٤",
      "الحافظين القدامى",
      "الخاتمين القدامى",
      "الخاتمين الجدد",
    ],
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
