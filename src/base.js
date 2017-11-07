var Rebase = require("re-base");
var firebase = require("firebase");
var app = firebase.initializeApp({
  apiKey: "AIzaSyCt7aMM2upTgdyAmGR7NpTHWOuw-KMDwDM",
  authDomain: "react-bootstrap-and-go.firebaseapp.com",
  databaseURL: "https://react-bootstrap-and-go.firebaseio.com",
  projectId: "react-bootstrap-and-go"
});

var base = Rebase.createClass(app.database());

export default base;
