import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Typography } from "../../../../common/index";
import { ROUTES } from "../../../../utils/constants";
import { useAuthState } from "../../../../utils/firebase/hooks/index";
import { Burger } from "./Burger";
import { ThemeButton } from "../../../../common/buttons/ThemeButton";
import { Divider } from "../../../../common/Divider";
import { signOut } from "firebase/auth";
import { auth } from "../../../../utils/firebase";
import { useDispatch } from "react-redux";
import { authApi } from "../../../../entities/auth/api/authApi";

export const MobileMenu = () => {
	const dispatch = useDispatch();
	const authState = useAuthState();
	const navigate = useNavigate();
	const [isActive, setIsActive] = React.useState(false);

	const handleLogout = async () => {
		await signOut(auth);
		navigate(ROUTES.AUTH);
		dispatch(authApi.util.resetApiState());
		setIsActive(false);
	};

	return (
		<div className="w-full md:hidden">
			<div className="flex w-full items-center justify-between">
				<Link to="/" className="transition-all hover:text-red-800">
					<Typography variant="title">Pokemon</Typography>
				</Link>
				<div className="flex items-center justify-center gap-4">
					<ThemeButton />
					<Burger isActive={isActive} onClick={() => setIsActive(!isActive)} />
				</div>
			</div>

			{isActive && (
				<div className="fixed top-[90px] left-0 z-10 flex h-full w-full flex-col gap-4 rounded-t-2xl bg-white px-7 py-5 dark:bg-slate-500">
					<Divider title="NAVIGATION" />
					<nav>
						<ul
							aria-hidden
							onClick={() => setIsActive(false)}
							className="flex flex-col gap-2 dark:text-white"
						>
							<li>
								<Typography variant="title-regular">
									<Link to={ROUTES.POKEMONS}>Pokemons</Link>
								</Typography>
							</li>
							{authState.data?.uid && (
								<>
									<li>
										<Typography variant="title-regular">
											<Link to={ROUTES.PROFILE}>Profile</Link>
										</Typography>
									</li>
									<li>
										<Typography variant="title-regular">
											<Link to={ROUTES.SETTINGS}>Settings</Link>
										</Typography>
									</li>
								</>
							)}
							<li>
								<Typography variant="title-regular">
									<Link to={ROUTES.USERS}>Users</Link>
								</Typography>
							</li>
						</ul>
					</nav>

					{/* Кнопка выхода из аккаунта или авторизации */}
					{authState.data?.uid ? (
						<>
							<div className="flex items-center gap-4">
								{/* Если есть аватар, показываем его */}
								{authState.data?.photoURL && (
									<Link to={ROUTES.PROFILE} onClick={() => setIsActive(false)}>
										<img
											src={authState.data?.photoURL}
											alt="User Avatar"
											className="w-14 rounded-lg"
										/>
									</Link>
								)}
								<Button onClick={handleLogout}>LOGOUT</Button>
							</div>
						</>
					) : (
						<Link onClick={() => setIsActive(false)} className="w-full" to={ROUTES.AUTH}>
							<Button>AUTH</Button>
						</Link>
					)}
				</div>
			)}
		</div>
	);
};
