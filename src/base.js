// import Rebase from 're-base';

// const base = Rebase.createClass({
//   apiKey: "AIzaSyCnJuQ9iNf50qbUdx-rPc3To1GwZ-BDhmE",
//   authDomain: "react-fitness.firebaseapp.com",
//   databaseURL: "https://react-fitness.firebaseio.com",
// });

// export default base;

// import firebase from 'firebase'
// var config = { /* COPY THE ACTUAL CONFIG FROM FIREBASE CONSOLE */
//   apiKey: "AIzaSyCnJuQ9iNf50qbUdx-rPc3To1GwZ-BDhmE",
//   authDomain: "react-fitness.firebaseapp.com",
//   databaseURL: "https://react-fitness.firebaseio.com",
//   storageBucket: "react-fitness.appspot.com",
//   messagingSenderId: "502392895953"
// };
// var base = firebase.initializeApp(config);
// export default base;

var Rebase = require("re-base");
var firebase = require("firebase");
var app = firebase.initializeApp({
  apiKey: "AIzaSyCnJuQ9iNf50qbUdx-rPc3To1GwZ-BDhmE",
  authDomain: "react-fitness.firebaseapp.com",
  databaseURL: "https://react-fitness.firebaseio.com",
  projectId: "react-fitness"

  // apiKey: 'AIzaSyA_sWIHvceyK8b_at1EqrwjZPC0NhpNoMk',
  // authDomain: 'catch-of-the-day-nickfday.firebaseapp.com',
  // databaseURL: 'https://catch-of-the-day-nickfday.firebaseio.com',
  // projectId: 'catch-of-the-day-nickfday'
});

var base = Rebase.createClass(app.database());

export default base;
