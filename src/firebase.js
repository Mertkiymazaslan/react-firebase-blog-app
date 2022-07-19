import firebase from  'firebase/compat/app';
import 'firebase/compat/auth';

//BU PROJEYİ GİTHUBA KOYARKEN LOCAL.ENV DOSYASI OLMUYOR BUNA BİR ALTERNATİF BUL!
//BU PROJEYİ GİTHUBA KOYARKEN LOCAL.ENV DOSYASI OLMUYOR BUNA BİR ALTERNATİF BUL!

const app = firebase.initializeApp({
    // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    // authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    // projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    // storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    // messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    // appId: process.env.REACT_APP_FIREBASE_APP_ID,
    apiKey: "AIzaSyB2Mz_W96OpcFIXWjboDhN009YdtBaYAds",
    authDomain: "auth-development-cbedb.firebaseapp.com",
    projectId: "auth-development-cbedb",
    storageBucket: "auth-development-cbedb.appspot.com",
    messagingSenderId: "90123735454",
    appId: "1:90123735454:web:b8eb842a17476148d4468f"
});

export const auth = app.auth()
export const provider = new firebase.auth.GoogleAuthProvider();
export default app