import firebase from 'firebase/app'

const firebaseConfig = {
    apiKey: "AIzaSyBS4sahTKb6DjDUz02XtswrJKNimKagQbA",
    authDomain: "birthday-ec49a.firebaseapp.com",
    databaseURL: "https://birthday-ec49a.firebaseio.com",
    projectId: "birthday-ec49a",
    storageBucket: "birthday-ec49a.appspot.com",
    messagingSenderId: "976484402594",
    appId: "1:976484402594:web:3acd8481a96185ab311efb"
};

export default firebase.initializeApp(firebaseConfig);