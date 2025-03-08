import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, database } from "../../../utils/firebase/instance";
import { collection, addDoc, doc, getDoc, setDoc } from "firebase/firestore";

export const authApi = createApi({
	tagTypes: ["Auth"], // Тег для обновления кеша
	reducerPath: "authApi",
	baseQuery: fakeBaseQuery(), // Firebase не требует URL
	endpoints: (builder) => ({
		// Эндпоинт для проверки состояния авторизации
		getAuthState: builder.query<
			{
				isLoginIn: boolean;
				uid?: string;
				email?: string;
				displayName?: string;
				city?: string;
				photoURL?: string;
				pokemons: any[];
			},
			void
		>({
			queryFn: async () => {
				const user = auth.currentUser;
				if (!user) return { data: { isLoginIn: false, pokemons: [] } };
				const userDoc = await getDoc(doc(database, "users", user.uid));
				const userData = userDoc.exists() ? userDoc.data() : {};
				return {
					data: {
						isLoginIn: true,
						uid: user.uid,
						email: user.email!,
						displayName: userData.displayName || "",
						city: userData.city || "",
						photoURL: user.photoURL || userData.photoURL || "",
						pokemons: userData.pokemons || [],
					},
				};
			},
		}),

		// Регистрация пользователя
		signUp: builder.mutation<
			{ uid: string; email: string },
			{ displayName: string; email: string; password: string; city: string }
		>({
			async queryFn({ displayName, email, password, city }) {
				try {
					// Создаём пользователя в Firebase Auth
					const userCredential = await createUserWithEmailAndPassword(auth, email, password);
					const { uid, photoURL } = userCredential.user;

					// Добавляем пользователя в Firestore
					await setDoc(doc(database, "users", uid), {
						uid,
						displayName,
						email,
						city,
						photoURL: photoURL || "",
						pokemons: [],
					});

					return { data: { uid, email } };
				} catch (error: any) {
					return { error: error.message };
				}
			},
		}),

		// Авторизация (логин)
		logIn: builder.mutation<{ uid: string; email: string }, { email: string; password: string }>({
			async queryFn({ email, password }) {
				try {
					// Авторизуем пользователя через Firebase
					const user = (await signInWithEmailAndPassword(auth, email, password)).user;
					return { data: { uid: user.uid, email: user.email! } };
				} catch (error: any) {
					return { error: error.message };
				}
			},
		}),
	}),
});

export const { useSignUpMutation, useGetAuthStateQuery, useLogInMutation } = authApi;
