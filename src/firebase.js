// import firebase from "firebase/app"
// import "firebase/database"

import firebase from 'firebase/compat/app';
import 'firebase/compat/database'

const firebaseConfig = {
    apiKey: "AIzaSyBwyVT3gHFZdw_TQtNXeqA2rf8outYpDc4",
    authDomain: "santateresa-dental.firebaseapp.com",
    projectId: "santateresa-dental",
    storageBucket: "santateresa-dental.appspot.com",
    messagingSenderId: "955161534274",
    appId: "1:955161534274:web:e4d94d3faa05f7743972db"
  };

const fireDb = firebase.initializeApp(firebaseConfig)
export default fireDb.database().ref()  