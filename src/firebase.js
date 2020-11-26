import firebase from 'firebase'
import 'firebase/firestore'

var firebaseConfig = {
  apiKey: "AIzaSyDYv6K8nahKkDMJe1vDoAP6wMUJxl5MRXI",
  authDomain: "tercer-parcial-8b36a.firebaseapp.com",
  databaseURL: "https://tercer-parcial-8b36a.firebaseio.com",
  projectId: "tercer-parcial-8b36a",
  storageBucket: "tercer-parcial-8b36a.appspot.com",
  messagingSenderId: "119763580489",
  appId: "1:119763580489:web:60b169ed323fa68edbb198"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();