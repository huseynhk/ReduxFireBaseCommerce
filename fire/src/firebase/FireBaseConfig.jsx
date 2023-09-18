// import { initializeApp } from "firebase/app";
// import {getStorage } from "firebase/storage"
// import { getAuth } from "firebase/auth";
// import { getDatabase } from "firebase/database";

// const firebaseConfig = {
//   apiKey: "AIzaSyDHYhWj3Tq3YtTvSntFLRtUJh34c4JaVd0",
//   authDomain: "ecommercesale-e7eab.firebaseapp.com",
//   projectId: "ecommercesale-e7eab",
//   storageBucket: "ecommercesale-e7eab.appspot.com",
//   messagingSenderId: "1015583798254",
//   appId: "1:1015583798254:web:729aee4513f798b59b54ff"
// };

// const app = initializeApp(firebaseConfig);

// export const storage = getStorage(app);
// export const auth = getAuth(app);
// export const db = getDatabase(app);



import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyB_HbVawGHDFnX4_nE9tnt1iMeR_5jw4y4",
  authDomain: "fir-commerce-5ffb0.firebaseapp.com",
  projectId: "fir-commerce-5ffb0",
  storageBucket: "fir-commerce-5ffb0.appspot.com",
  messagingSenderId: "815499708178",
  appId: "1:815499708178:web:eec1c9c09b88ef1c9ed5cb"
};

const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app);

export {fireDB, auth}