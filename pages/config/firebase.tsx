import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyD1ABQofNm4YGeYj0NWRL-jqIHq_Af16KA",
  authDomain: "comments-section-dbe5d.firebaseapp.com",
  projectId: "comments-section-dbe5d",
  storageBucket: "comments-section-dbe5d.appspot.com",
  messagingSenderId: "595239764496",
  appId: "1:595239764496:web:ae7a76e6d2b4800a360095",
  measurementId: "G-CB3ZMG7R4B"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleAuth = new GoogleAuthProvider()
export const db = getFirestore(app)

import React from 'react'

const firebase = () => {
  return (
    <div>firebase</div>
  )
}

export default firebase