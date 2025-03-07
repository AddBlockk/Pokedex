import { useAuthState } from "../utils/firebase";
import { ROUTES } from "../utils/constants";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({ isAuth }: { isAuth: boolean }) => {
	const authState = useAuthState();

	if (authState.isLoading) {
		return <div>Loading...</div>;
	}

	return isAuth ? <Outlet /> : <Navigate to={ROUTES.AUTH} />;
};
