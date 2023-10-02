// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
import firebase from 'firebase'
import 'firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyD69sOjX_wYQtCoL_48HFLZEO83sHRizVs",
    authDomain: "docweb-app.firebaseapp.com",
    projectId: "docweb-app",
    storageBucket: "docweb-app.appspot.com",
    messagingSenderId: "345871394810",
    appId: "1:345871394810:web:4e67d8fc872a61582f2643",
    measurementId: "G-LWXD2HNFH3"
};

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}
const db = app.firestore()
export {
  db
}