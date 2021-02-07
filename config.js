import * as firebase from 'firebase'
require('@firebase/firestore')

var firebaseConfig = {
  apiKey: "AIzaSyB6De0BfSBHqIbCmSQlbvY2B3jm0vzTkr4",
  authDomain: "book-santa-d39f4.firebaseapp.com",
  databaseURL: "https://book-santa-d39f4.firebaseio.com",
  projectId: "book-santa-d39f4",
  storageBucket: "book-santa-d39f4.appspot.com",
  messagingSenderId: "254054988062",
  appId: "1:254054988062:web:df03480b3dce8f4c13b10f",
  measurementId: "G-4JWSFYDSR3"
};
firebase.initializeApp(firebaseConfig);

export default firebase.firestore()