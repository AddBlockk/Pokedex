import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyAM1F85ngsciGnT7izKu5PdP0Nx2qWfvHw",
	authDomain: "pokemons-pokedex-project.firebaseapp.com",
	projectId: "pokemons-pokedex-project",
	storageBucket: "pokemons-pokedex-project.firebasestorage.app",
	messagingSenderId: "823065767258",
	appId: "1:823065767258:web:49e4393183dcc4fcf81763",
};

// const firebaseConfig = JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG);

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const database = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export type Collection = "pokemons" | "users";
