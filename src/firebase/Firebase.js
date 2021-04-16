import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyDh6nrkI_YXNkH3a0vq9c59rl37v6xBKT4",
  authDomain: "vue-shop-7c2c3.firebaseapp.com",
  projectId: "vue-shop-7c2c3",
  storageBucket: "vue-shop-7c2c3.appspot.com",
  messagingSenderId: "1078139772558",
  appId: "1:1078139772558:web:6450ce8ac363f06714f3df"
};
// Initialize Firebase
const FB = firebase.initializeApp(firebaseConfig);

export { FB };
