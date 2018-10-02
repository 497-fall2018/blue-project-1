
import firebase from 'firebase'
  // Initialize Firebase
var config = {
    apiKey: "AIzaSyBXBiSSOFNuGiM0L9gpTyqJqtCKN4qe-6c",
    authDomain: "invite-dinner.firebaseapp.com",
    databaseURL: "https://invite-dinner.firebaseio.com",
    projectId: "invite-dinner",
    storageBucket: "invite-dinner.appspot.com",
    messagingSenderId: "1064399812331"
  };
  firebase.initializeApp(config);
export default firebase;