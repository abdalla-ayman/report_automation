let User = require("../models/users");
let Report = require("../models/reports");
let path = require("path");

var xl = require("excel4node");

// Create a new instance of a Workbook class

async function generateExcelSheet(group) {
  var wb = new xl.Workbook();

  // Add Worksheets to the workbook
  var options = {
    sheetView: {
      rightToLeft: true, // Flag indicating whether the sheet is in 'right to left' display mode. When in this mode, Column A is on the far right, Column B ;is one column left of Column A, and so on. Also, information in cells is displayed in the Right to Left format.
    },
  };
  var ws = wb.addWorksheet("Sheet 1", options);

  // Create a reusable style
  var style = wb.createStyle({
    font: {
      size: 10,
    },
    alignment: {
      horizontal: "center",
      vertical: "center",
    },
    border: {
      left: {
        style: "thin", //§18.18.3 ST_BorderStyle (Border Line Styles) ['none', 'thin', 'medium', 'dashed', 'dotted', 'thick', 'double', 'hair', 'mediumDashed', 'dashDot', 'mediumDashDot', 'dashDotDot', 'mediumDashDotDot', 'slantDashDot']
        color: "black", // HTML style hex value
      },
      right: {
        style: "thin", //§18.18.3 ST_BorderStyle (Border Line Styles) ['none', 'thin', 'medium', 'dashed', 'dotted', 'thick', 'double', 'hair', 'mediumDashed', 'dashDot', 'mediumDashDot', 'dashDotDot', 'mediumDashDotDot', 'slantDashDot']
        color: "black",
      },
      top: {
        style: "thin", //§18.18.3 ST_BorderStyle (Border Line Styles) ['none', 'thin', 'medium', 'dashed', 'dotted', 'thick', 'double', 'hair', 'mediumDashed', 'dashDot', 'mediumDashDot', 'dashDotDot', 'mediumDashDotDot', 'slantDashDot']
        color: "black",
      },
      bottom: {
        style: "thin", //§18.18.3 ST_BorderStyle (Border Line Styles) ['none', 'thin', 'medium', 'dashed', 'dotted', 'thick', 'double', 'hair', 'mediumDashed', 'dashDot', 'mediumDashDot', 'dashDotDot', 'mediumDashDotDot', 'slantDashDot']
        color: "black",
      },
    },
  });

  var header_style = wb.createStyle({
    font: {
      size: 10,
    },
    alignment: {
      horizontal: "center",
      vertical: "center",
    },
    border: {
      left: {
        style: "medium", //§18.18.3 ST_BorderStyle (Border Line Styles) ['none', 'thin', 'medium', 'dashed', 'dotted', 'thick', 'double', 'hair', 'mediumDashed', 'dashDot', 'mediumDashDot', 'dashDotDot', 'mediumDashDotDot', 'slantDashDot']
        color: "black", // HTML style hex value
      },
      right: {
        style: "medium", //§18.18.3 ST_BorderStyle (Border Line Styles) ['none', 'thin', 'medium', 'dashed', 'dotted', 'thick', 'double', 'hair', 'mediumDashed', 'dashDot', 'mediumDashDot', 'dashDotDot', 'mediumDashDotDot', 'slantDashDot']
        color: "black",
      },
      top: {
        style: "medium", //§18.18.3 ST_BorderStyle (Border Line Styles) ['none', 'thin', 'medium', 'dashed', 'dotted', 'thick', 'double', 'hair', 'mediumDashed', 'dashDot', 'mediumDashDot', 'dashDotDot', 'mediumDashDotDot', 'slantDashDot']
        color: "black",
      },
      bottom: {
        style: "medium", //§18.18.3 ST_BorderStyle (Border Line Styles) ['none', 'thin', 'medium', 'dashed', 'dotted', 'thick', 'double', 'hair', 'mediumDashed', 'dashDot', 'mediumDashDot', 'dashDotDot', 'mediumDashDotDot', 'slantDashDot']
        color: "black",
      },
    },
  });

  // make col thinner
  for (let i = 0; i < 35; i++) {
    ws.column(i).setWidth(5);
  }
  //  set the header for the excel sheet
  ws.cell(1, 1, 1, 6, true).string("بسم الله الرحمن الرحيم").style(style);
  ws.cell(2, 1, 2, 3, true).string("لمتابعة مسار :").style(style);
  ws.cell(2, 4, 2, 6, true).string(group).style(style);

  // get the end and start of the week
  var today = new Date();
  // Get the day of week for Sunday as a number 1-7 where Monday is 2 and so on...
  let DaysFromTheStartOfTheWeek = today.getDay() + 1;
  let startOfTheWeek = new Date().setTime(
    today.getTime() - 24 * 60 * 60 * 1000 * DaysFromTheStartOfTheWeek
  );
  let endOfTheWeek = new Date().setTime(
    today.getTime() + 24 * 60 * 60 * 1000 * (6 - DaysFromTheStartOfTheWeek)
  );

  ws.cell(2, 7, 2, 8, true).string("من تاريخ").style(style);
  ws.cell(2, 9, 2, 10, true)
    .string(`${new Date(startOfTheWeek).toISOString().split("T")[0]}`)
    .style(style);

  ws.cell(2, 11, 2, 12, true).string("الى").style(style);
  ws.cell(2, 13, 2, 14, true)
    .string(`${new Date(endOfTheWeek).toISOString().split("T")[0]}`)
    .style(style);

  // the name col header

  ws.cell(4, 1, 5, 4, true).string("الاسم").style(header_style);

  // the day of the week col header
  ws.cell(4, 5, 4, 8, true).string("السبت").style(header_style);
  ws.cell(4, 9, 4, 11, true).string("الاحد").style(header_style);
  ws.cell(4, 12, 4, 14, true).string("الاثنين").style(header_style);
  ws.cell(4, 15, 4, 17, true).string("الثلاثاء").style(header_style);
  ws.cell(4, 18, 4, 20, true).string("الاربعاء").style(header_style);
  ws.cell(4, 21, 4, 23, true).string("الخميس").style(header_style);
  ws.cell(4, 24, 4, 26, true).string("الجمعة").style(header_style);

  // how many pages in each day (old, new , past)

  for (let i = 5; i <= 26; i = i + 3) {
    ws.cell(5, i).string("ج").style(header_style);
    ws.cell(5, i + 1)
      .string("ك")
      .style(header_style);
    ws.cell(5, i + 2)
      .string("ق")
      .style(header_style);
  }

  //summations
  ws.cell(5, 27).string("م ج").style(header_style);
  ws.cell(5, 28).string("م ق").style(header_style);
  ws.cell(5, 29).string("م ك").style(header_style);
  ws.cell(5, 30).string("م ج ك").style(header_style);
  ws.cell(5, 31).string("م ك").style(header_style);

  let users = await User.find({ group }, ["_id", "fullname"]);
  let group_reports = [];
  for (let user of users) {
    let user_reports = await Report.find({ user: user._id }).sort({ date: 1 });
    group_reports.push({
      fullname: user.fullname,
      reports: user_reports,
    });
  }

  // get the report of the users in desired group

  for (let [counter, user_report] of group_reports.entries()) {
    let new_total = 0;
    let old_total = 0;
    let past_total = 0;
    let net_new = 0;
    let net_total = 0;
    let rowCounter = 6 + counter;
    ws.cell(rowCounter, 1, 6, 2, true)
      .string(user_report.fullname)
      .style(style);

    for (let report of user_report.reports) {
      new_total += report.new_no;
      net_new += report.new_no * 10;
      past_total += report.past + report.current_end - report.current_str + 1;
      old_total += report.old.length * 20;

      net_total +=
        report.current_end -
        report.current_str +
        1 +
        report.old.length * 20 +
        net_new;

      let theDayOfTheWeek = report.date.getDay();

      if (theDayOfTheWeek == rowCounter)
        theDayOfTheWeek = 0; // sunday = 0 ; make sat = 0 and so on 1,2,...
      else theDayOfTheWeek += 1;

      ws.cell(rowCounter, 3 + theDayOfTheWeek * 3)
        .number(report.new_no)
        .style(style);
      ws.cell(rowCounter, 4 + theDayOfTheWeek * 3)
        .number(report.past + report.current_end - report.current_str + 1)
        .style(style);
      ws.cell(rowCounter, 5 + theDayOfTheWeek * 3)
        .number(report.old.length * 20)
        .style(style);
    }

    ws.cell(rowCounter, 27).number(new_total).style(style);
    ws.cell(rowCounter, 28).number(old_total).style(style);
    ws.cell(rowCounter, 29).number(past_total).style(style);
    ws.cell(rowCounter, 30).number(net_new).style(style);
    ws.cell(rowCounter, 31).number(net_total).style(style);
  }

  wb.write(path.join(__dirname, "..", "dist", `${group}.xlsx`));
}

module.exports = generateExcelSheet;
