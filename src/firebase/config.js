import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import {getFirestore, connectFirestoreEmulator} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA5pbbPV59rIvoB7holWf2Y7zKGU2duSWk",
    authDomain: "app-chat-a9141.firebaseapp.com",
    projectId: "app-chat-a9141",
    storageBucket: "app-chat-a9141.appspot.com",
    messagingSenderId: "1068954287661",
    appId: "1:1068954287661:web:5b28deea773acbef6a82a4",
    measurementId: "G-CVTD8QZYFN"
  };
  
  // Initialize Firebase

  const app = initializeApp(firebaseConfig);
  const auth=getAuth();
  const filestore= getFirestore();
  connectAuthEmulator(auth,"http://localhost:9099");
  connectFirestoreEmulator(filestore,'localhost',8080);
  export const authentication = getAuth(app);
  export const db = getFirestore(app);