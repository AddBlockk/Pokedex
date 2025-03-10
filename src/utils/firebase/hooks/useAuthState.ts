import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import React from "react";
import { usePromise } from "../../../utils/hooks/index";
import { auth, database } from "../instance";

// Хук для отслеживания состояния пользователя
export const useAuthState = () => {
	const { isLoading, setIsLoading, isError, setError, error, setData, data } =
		usePromise<User | null>();

	React.useEffect(() => {
		const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
			if (!user) {
				setData(null); // Явно сбрасываем состояние
				setIsLoading(false);
				return;
			}

			const q = query(collection(database, "users"), where("uid", "==", user.uid));

			const unsubscribeSnapshot = onSnapshot(
				q,
				(querySnapshot) => {
					const userData: User[] = [];
					querySnapshot.forEach((doc) => userData.push(doc.data() as User));

					if (userData.length > 0) {
						setData(userData[0]);
					} else {
						console.warn("User data not found in Firestore!");
						setData(null);
					}

					setIsLoading(false);
				},
				(error) => {
					console.error("Error fetching user data:", error);
					setError(error.message);
				},
			);

			return () => unsubscribeSnapshot();
		});

		return () => unsubscribeAuth();
	}, []);

	return { data, isLoading, isError, error };
};
