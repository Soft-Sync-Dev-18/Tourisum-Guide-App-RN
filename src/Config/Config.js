import * as firebase from 'firebase'
var firebaseConfig = {
    apiKey: "AIzaSyCQPw-innuj0lQR9nfwKAZlu3zlVE_TP34",
    authDomain: "tourismguideapp.firebaseapp.com",
    databaseURL: "https://tourismguideapp.firebaseio.com",
    projectId: "tourismguideapp",
    storageBucket: "tourismguideapp.appspot.com",
    messagingSenderId: "753280436216",
    appId: "1:753280436216:web:a1d018b5d9774b020eb80d",
    measurementId: "G-DBN1SCGJ5Z"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();
export const db = firebase.database()
export const auth = firebase.auth()