import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "../../../../common/index";
import { emailSchema, passwordSchema } from "../../../../utils/constants/validation/index";
import { ROUTES } from "../../../../utils/constants/index";
import { useLogInMutation } from "../../../../entities/auth/api/authApi";
import { useLogInWithEmailAndPasswordMutation } from "../../../../utils/firebase/hooks/index";

interface SignInFormValues {
	email: string;
	password: string;
}

export const SignInForm: React.FC = () => {
	const [logIn, { isLoading }] = useLogInMutation();
	const navigate = useNavigate();
	const { register, handleSubmit, formState } = useForm<SignInFormValues>({ mode: "onBlur" });

	// const logInWithEmailAndPassword = useLogInWithEmailAndPasswordMutation({
	// 	options: {
	// 		onSuccess: () => {
	// 			setStore({ session: { isLoginIn: true } });
	// 			navigate(ROUTES.POKEMONS);
	// 		},
	// 	},
	// });

	// const { isSubmitting, errors } = formState;
	// const loading = isSubmitting || logInWithEmailAndPassword.isPending;

	return (
		<form
			className="flex w-full flex-col gap-3"
			onSubmit={handleSubmit(async ({ email, password }) => {
				try {
					await logIn({ email, password }).unwrap();
					navigate(ROUTES.POKEMONS);
				} catch (error) {
					console.error("Login failed:", error);
				}
			})}
		>
			<h1 className="mb-4 text-3xl font-semibold">Login</h1>
			<Input {...register("email", emailSchema)} disabled={isLoading} placeholder="email" />
			<Input
				type="password"
				{...register("password", passwordSchema)}
				disabled={isLoading}
				placeholder="password"
			/>
			<Button type="submit" variant="contained" loading={isLoading}>
				OK
			</Button>
		</form>
	);
};
