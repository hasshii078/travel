// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase 設定オブジェクト,それぞれ自分の環境のものを入力
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};

// Firebase アプリを初期化
const app = initializeApp(firebaseConfig);

// Firestore と Storage を取得
const db = getFirestore(app);
const storage = getStorage(app);

// Firestore の関数をエクスポート
export { db, collection, addDoc, getDocs };
