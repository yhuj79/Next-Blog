// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_API_KEY,
  messagingSenderId: process.env.REACT_APP_FB_MESSAGE_ID,
  appId: process.env.REACT_APP_FB_APP_ID,
  measurementId: process.env.REACT_APP_FB_MESURE_ID,
  authDomain: "nextauth-371716.firebaseapp.com",
  projectId: "nextauth-371716",
  storageBucket: "nextauth-371716.appspot.com",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const storage = getStorage();
export default app;
