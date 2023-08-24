const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  new_no: Number,
  new_pages: [Number],
  current_end: Number,
  current_str: Number,
  past: Number,
  old: [Number],
  shekh: {
    type: String,
    enum: [
      "عيسى محمد",
      "مازن عثمان",
      "عبدالرحيم اسماعيل",
      "مصعب محمد الحسن",
      "عمر عثمان",
      "احمد ادم",
      "ابوبكر عبدالغفار",
      "فيصل ازهري",
      "محمد ربيع",
      "حسام الاحدب",
    ],
  },
});

module.exports = mongoose.model("Report", reportSchema);
