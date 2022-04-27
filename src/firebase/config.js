import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import {getFirestore, connectFirestoreEmulator} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBfmULTqkW_HdpZZ7T9pHraquqc-rebTkk",
  authDomain: "chat-app-e3038.firebaseapp.com",
  projectId: "chat-app-e3038",
  storageBucket: "chat-app-e3038.appspot.com",
  messagingSenderId: "4509595550",
  appId: "1:4509595550:web:6005bd8c12d063a5db888f",
  measurementId: "G-DEPNTHZTMY"
};
  
  // Initialize Firebase

  const app = initializeApp(firebaseConfig);
  const auth=getAuth();
  const filestore= getFirestore();
  connectAuthEmulator(auth,"http://localhost:9099");
  connectFirestoreEmulator(filestore,'localhost',8080);
  export const authentication = getAuth(app);
  export const db = getFirestore(app);