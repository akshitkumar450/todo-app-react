import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCl1f8Udf4dRoVDzlSwWpcz7lyVN_phnWI",
    authDomain: "todo-app-cp-ee4db.firebaseapp.com",
    projectId: "todo-app-cp-ee4db",
    storageBucket: "todo-app-cp-ee4db.appspot.com",
    messagingSenderId: "195043355054",
    appId: "1:195043355054:web:5962f449a9297c8356003f",
    measurementId: "G-TD8BHVYR72"
})

const db = firebaseApp.firestore()

export default db

// to deploy
//  in terminal

//1  firebase init
//2  hosting   -->type (build )after that
//3  npm run build -->it bundles up entire app and will deploy that bundle
//4  firebase deploy
