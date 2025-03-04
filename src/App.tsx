import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { PokedexPage, PokemonsPage, PokemonPage, AuthPage, ProfilePage } from "./pages";
import { ROUTES } from "./utils/constants";
import { Layout } from "./components/Layout";

export const AuthApp = () => {
	<Routes>
		<Route path={ROUTES.AUTH} element={<AuthPage />} />
		<Route path="*" element={<Navigate to={ROUTES.AUTH} />} />
	</Routes>;
};

const App: React.FC = () => {
	// const authState = useAuthState();

	// if(authState.isLoading) return null;

	return (
		<div className="container mx-auto w-full text-red-500">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route path={ROUTES.POKEMONS} element={<PokemonsPage />} />
						<Route path={ROUTES.POKEDEX} element={<PokedexPage />} />
						<Route path={ROUTES.POKEMON} element={<PokemonPage />} />
						<Route path={ROUTES.PROFILE} element={<ProfilePage />} />
						{/* <Route path={ROUTES.SETTINGS} element={<SettingsPage />} />
            <Route path={ROUTES.USERS} element={<UsersPage />} /> */}
						<Route path={ROUTES.AUTH} element={<AuthPage />} />
						<Route path="*" element={<Navigate to={ROUTES.POKEMONS} />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default App;
