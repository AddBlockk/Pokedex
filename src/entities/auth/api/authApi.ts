import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, database } from "../../../utils/firebase/instance";
import { collection, addDoc, doc, getDoc, setDoc } from "firebase/firestore";

export const authApi = createApi({
	reducerPath: "authApi",
	baseQuery: fakeBaseQuery(),
	endpoints: (builder) => ({
		// Эндпоинт для проверки состояния авторизации
		getAuthState: builder.query<
			{
				pokemons: any;
				isLoginIn: boolean;
				uid?: string;
				email?: string;
				displayName?: string;
				city?: string;
				photoURL?: string;
			},
			void
		>({
			queryFn: async () => {
				return new Promise(async (resolve) => {
					const unsubscribe = auth.onAuthStateChanged(async (user) => {
						unsubscribe(); // Отписываемся от слушателя
						if (user) {
							const userDocRef = doc(database, "users", user.uid); // Ссылка на документ пользователя
							const userDocSnap = await getDoc(userDocRef); // Получаем документ
							if (userDocSnap.exists()) {
								const userData = userDocSnap.data();
								resolve({
									data: {
										isLoginIn: true,
										uid: user.uid,
										email: user.email!,
										displayName: userData.displayName,
										city: userData.city,
										photoURL: user.photoURL || userData.photoURL, // Поддержка кастомного фото
										pokemons: userData.pokemons || [],
									},
								});
							} else {
								resolve({
									data: { isLoginIn: true, uid: user.uid, email: user.email!, pokemons: [] },
								});
							}
						} else {
							resolve({ data: { isLoginIn: false, pokemons: [] } });
						}
					});
				});
			},
		}),

		// Регистрация пользователя
		signUp: builder.mutation<
			{ uid: string; email: string },
			{ displayName: string; email: string; password: string; city: string }
		>({
			async queryFn({ displayName, email, password, city }) {
				try {
					const userCredential = await createUserWithEmailAndPassword(auth, email, password);
					const user = userCredential.user;

					await setDoc(doc(database, "users", user.uid), {
						uid: user.uid,
						displayName,
						email,
						city,
						photoURL: user.photoURL || "",
						pokemons: [],
					});

					return { data: { uid: user.uid, email: user.email! } };
				} catch (error: any) {
					return { error: error.message };
				}
			},
		}),

		// Авторизация (логин)
		logIn: builder.mutation<{ uid: string; email: string }, { email: string; password: string }>({
			async queryFn({ email, password }) {
				try {
					const userCredential = await signInWithEmailAndPassword(auth, email, password);
					const user = userCredential.user;
					return { data: { uid: user.uid, email: user.email! } };
				} catch (error: any) {
					return { error: error.message };
				}
			},
		}),
	}),
});

export const { useSignUpMutation, useGetAuthStateQuery, useLogInMutation } = authApi;
