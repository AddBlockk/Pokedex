import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import {
	PokemonsPage,
	PokemonPage,
	AuthPage,
	ProfilePage,
	// SettingsPage,
	UsersPage,
} from "./pages";
import { ROUTES } from "./utils/constants";
import { Layout } from "./components/Layout";
import { useAuthState } from "./utils/firebase/hooks/index";


export const AuthApp = () => (
	<Routes>
		<Route path={ROUTES.AUTH} element={<AuthPage />} />
		<Route path="*" element={<Navigate to={ROUTES.AUTH} />} />
	</Routes>
);

export const App: React.FC = () => {
	const authState = useAuthState();

	if (authState.isLoading) return null;

	return (
		<div className="container mx-auto w-full">
			<BrowserRouter key={authState.data?.uid ? "auth" : "no-auth"}>
				{!authState.data?.uid && <AuthApp />}
				{authState.data?.uid && (
					<Routes>
						<Route element={<Layout />}>
							<Route path={ROUTES.POKEMONS} element={<PokemonsPage />} />
							<Route path={ROUTES.POKEMON} element={<PokemonPage />} />
							<Route path={ROUTES.PROFILE} element={<ProfilePage />} />
							{/* <Route path={ROUTES.SETTINGS} element={<SettingsPage />} /> */}
							<Route path={ROUTES.USERS} element={<UsersPage />} />
							<Route path="*" element={<Navigate to={ROUTES.POKEMONS} />} />
						</Route>
					</Routes>
				)}
			</BrowserRouter>
		</div>
	);
};
