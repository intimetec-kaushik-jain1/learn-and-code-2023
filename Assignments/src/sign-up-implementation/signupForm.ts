import express = require("express");
import bodyParser = require("body-parser");
import path = require("path");
import { SignupAPI } from "./APIModule/signupAPI";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/signupForm.html"));
});

app.get("/signupForm.css", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/signupForm.css"), {
    headers: {
      "Content-Type": "text/css",
    },
  });
});

app.post("/submit", async (req, res) => {
  const userData = req.body;
  const signupAPI = new SignupAPI();
  try {
    await signupAPI.signup(userData);
    res.sendFile(path.join(__dirname, "public", "submit.html"));
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
