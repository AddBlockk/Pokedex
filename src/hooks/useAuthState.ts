import { useGetAuthStateQuery } from "../entities/auth/api/authApi";

export const useAuthState = () => {
	const { data, isLoading } = useGetAuthStateQuery();
	return { isLoggedIn: data?.isLoginIn ?? false, user: data, isLoading };
};
