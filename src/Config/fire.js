import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDbfElqkOxac1n4diSKKPpkOfq2NgH9ro4",
    authDomain: "agri-b9eb7.firebaseapp.com",
    databaseURL: "https://agri-b9eb7.firebaseio.com",
    projectId: "agri-b9eb7",
    storageBucket: "agri-b9eb7.appspot.com",
    messagingSenderId: "243738732622",
    appId: "1:243738732622:web:a368be8dcb78ddafa5bb1f",
    measurementId: "G-LT5BW84XJ3"
};

const fire =  firebase.initializeApp(firebaseConfig);
export const db = fire.firestore();
export default fire;