import firebase from 'firebase/compat/app';
import "firebase/compat/auth"

const app=firebase.initializeApp({
    apiKey:process.env.REACT_APP_API_KEY_FIREBASE ,
    authDomain:process.env.REACT_APP_AUTH_DOMAIN_FIREBASE,
    projectId:process.env.REACT_APP_PROJECT_ID_FIREBASE  ,
    storageBucket:process.env. REACT_APP_STORAGE_BUCKET_FIREBASE,
    messagingSenderId:process.env.REACT_APP_MESSAGIN_SENDER_ID_FIREBASE  ,
    appId: process.env.REACT_APP_APP_ID_FIREBASE 
})

export const auth=app.auth()
export default app

