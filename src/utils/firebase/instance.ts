import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyA-rv6dJBOZg0c6fYTYo4-QMwqR28W84EI",
	authDomain: "social-chat-boltach.firebaseapp.com",
	projectId: "social-chat-boltach",
	storageBucket: "social-chat-boltach.appspot.com",
	messagingSenderId: "953501565071",
	appId: "1:953501565071:web:4287eba346f000567070fa",
};

// const firebaseConfig = JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG);

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const database = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export type Collection = "pokemons" | "users"; /*выбор определённой коллекции*/
