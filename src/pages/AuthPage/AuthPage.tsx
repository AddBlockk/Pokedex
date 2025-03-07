import { Button, Input } from "../../common";
import { GoogleButton } from "../../common/buttons/GoogleButton";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { SignUpForm } from "./components/SignUpForm/SignUpForm";
import { SignInForm } from "./components/SignInForm/SignInForm";
import { Divider } from "../../common/Divider";
import { ROUTES } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import { useLogInWithGoogleMutation } from "../../utils/firebase/hooks/useLogInWithGoogleMutation";
import { useDispatch } from "react-redux";

export const AuthPage = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [isSignUp, setIsSignUp] = React.useState(true);

	const { mutate: logInWithGoogleMutate } = useLogInWithGoogleMutation({
		options: {
			onSuccess: () => {
				dispatch({ type: "authApi/setAuthState", payload: { isLoginIn: true } });
				navigate(ROUTES.POKEMONS);
			},
		},
	});

	return (
		<section className="flex flex-col justify-center text-black md:h-screen md:items-center">
			<div className="md:flex md:w-2/3 md:flex-row md:rounded-lg md:shadow-xl">
				<div className="bg-auth-cover relative h-[150px] w-full rounded-b-3xl md:h-full md:w-1/2 md:rounded-l-lg md:rounded-b-none">
					<div className="bg-logo absolute inset-0 h-full w-full rounded-b-2xl bg-[url('./assets/img/cover.jpg')] bg-cover bg-center bg-no-repeat md:top-0 md:h-full md:rounded-l-lg md:rounded-br-none" />
				</div>

				<div className="flex w-full flex-col items-center justify-center rounded-2xl p-6 md:w-1/2 md:rounded-l-md md:rounded-r-2xl dark:border-[1px] dark:text-white">
					<div className="flex w-full flex-col items-center justify-center">
						{!isSignUp && <SignInForm />}
						{isSignUp && <SignUpForm />}
						<div className="mt-[10px] w-full">
							<Button variant="text" onClick={() => setIsSignUp(!isSignUp)}>
								{isSignUp ? "already have account" : "create new account"}
							</Button>
						</div>
					</div>

					<div className="mt-4 w-full text-center">
						<Divider title="OR" />
						<GoogleButton onClick={() => logInWithGoogleMutate()}>Login with GOOGLE</GoogleButton>
					</div>
				</div>
			</div>
		</section>
	);
};
