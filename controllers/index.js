// utils functsiotn
const generateExcel = require("../utils/write_to_excel");

// models
const User = require("../models/users");
const Report = require("../models/reports");

const register = async (req, res) => {
  try {
    const { username, passkey, fullname, group } = req.body;
    let usersWithSameUsername = await User.count({ username });
    if (usersWithSameUsername > 0) return res.sendStatus(400);

    let user = await User.create({
      username,
      passkey,
      fullname,
      group,
    });

    console.log(user);
    res.end();
  } catch (error) {
    console.log(error);
  }
};

const report = async (req, res) => {
  try {
    const {
      username,
      passkey,
      awjoh,
      safhat,
      current_end,
      current_str,
      past,
      old,
      shekh,
      date,
    } = req.body;

    //if user not register return error 400
    let usersWithSameUsername = await User.count({ username });
    if (usersWithSameUsername == 0) return res.sendStatus(400);
    let user = await User.findOne({ username }, ["_id", "passkey"]);

    if (user.passkey != passkey) return res.sendStatus(401);

    let report_body = {
      user: user._id,
      new_no: awjoh,
      date,
      new_pages: safhat,
      current_str,
      current_end,
      past,
      old,
    };
    if (shekh) report_body.shekh = shekh;

    //if there a report with the same date replace it
    let report = await Report.findOneAndUpdate(
      {
        date,
        user: user._id,
      },
      report_body,
      {
        new: true,
        upsert: true,
      }
    );

    res.end();
  } catch (error) {
    res.end();
    console.log(error);
  }
};

const generateWeekReport = async (req, res) => {
  try {
    let { group } = req.body;
    await generateExcel(group);
    res.sendStatus(200)
    
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  register,
  report,
  generateWeekReport,
};
