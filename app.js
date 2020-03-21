var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var nodemailer = require("nodemailer");
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
  res.render("index", { title: "index" });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "about" });
});

app.get("/contact", (req, res) => {
  res.render("contact", { title: "contact" });
});

app.post("/contact/send", (req, res) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "vishnoi.kunal0@gmail.com",
      pass: "*********"
    }
  });

  var mailOptions = {
    from: "Kunal Vishnoi <vishnoi.kunal0@gmail.com>",
    to: "kunal.vishnoi@gradeup.co",
    subject: "Sending Email using Node.js",
    text:
      "Following details are submitted.... Name: " +
      req.body.name +
      "Email: " +
      req.body.email +
      "Message: " +
      req.body.message,
    html:
      "<p>Details submit By user</p><ul><li>Name:" +
      req.body.name +
      "</li><li>Email: " +
      req.body.email +
      "</li><li>Message: " +
      req.body.message +
      "</li></ul>"
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
      res.redirect("/");
    } else {
      console.log("Email sent: " + info.response);
      res.redirect("/");
    }
  });
});

app.listen(8000);
console.log("App is running");
