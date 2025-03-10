import { Link } from "react-router-dom";
import { Button, Typography } from "../../../../common";
import { ROUTES } from "../../../../utils/constants";
import { ThemeButton } from "../../../../common/buttons/ThemeButton";
import { useAuthState } from "../../../../utils/firebase/hooks/index";
import { auth } from "../../../../utils/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { authApi } from "../../../../entities/auth/api/authApi";
import React from "react";

export const DesktopMenu = () => {
	const dispatch = useDispatch();
	const authState = useAuthState();
	const navigate = useNavigate();

	const handleLogout = async () => {
		await signOut(auth);
		dispatch(authApi.util.resetApiState());
		navigate(ROUTES.AUTH);
	};

	// Автоматический редирект после выхода
	React.useEffect(() => {
		if (!authState.data?.uid) {
			navigate(ROUTES.AUTH);
		}
	}, [authState.data?.uid, navigate]);

	return (
		<div className="hidden w-full md:block">
			<div className="flex w-full items-center justify-between">
				<div className="flex items-end justify-center gap-4">
					<Link to="/" className="transition-all hover:text-red-800 dark:hover:text-gray-300">
						<Typography variant="title">Pokemon</Typography>
					</Link>
					<nav>
						<ul className="flex gap-4">
							{authState.data?.uid && (
								<li>
									<Typography variant="title-regular">
										<Link
											to={ROUTES.SETTINGS}
											className="transition-all hover:text-red-800 dark:hover:text-gray-300"
										>
											Settings
										</Link>
									</Typography>
								</li>
							)}
							<li>
								<Typography variant="title-regular">
									<Link
										to={ROUTES.USERS}
										className="transition-all hover:text-red-800 dark:hover:text-gray-300"
									>
										Users
									</Link>
								</Typography>
							</li>
						</ul>
					</nav>
				</div>

				<div className="flex items-center justify-center gap-4">
					<ThemeButton />
					{authState.data?.photoURL ? (
						<Link to={ROUTES.PROFILE}>
							<img
								src={authState.data?.photoURL}
								alt="User Avatar"
								className="h-12 rounded-lg object-cover"
							/>
						</Link>
					) : (
						<div>
							<Link
								to={ROUTES.PROFILE}
								className="flex h-12 w-12 items-center justify-center rounded-lg border bg-blue-500 text-white hover:bg-blue-400"
							>
								<div className="text-lg font-semibold">
									{authState.data?.displayName?.charAt(0).toUpperCase()}
								</div>
							</Link>
						</div>
					)}
					{authState.data?.uid ? (
						<Button onClick={handleLogout}>LOGOUT</Button>
					) : (
						<Link to={ROUTES.AUTH}>
							<Button>AUTH</Button>
						</Link>
					)}
				</div>
			</div>
		</div>
	);
};
