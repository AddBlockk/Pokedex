import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "../../../../common/index";
import { emailSchema, passwordSchema } from "../../../../utils/constants/validation/index";
import { ROUTES } from "../../../../utils/constants/index";
import { authApi, useLogInMutation } from "../../../../entities/auth/api/authApi";
import { useLogInWithEmailAndPasswordMutation } from "../../../../utils/firebase/hooks/index";
import { useGetAuthStateQuery } from "../../../../entities/auth/api/authApi";
import { useDispatch } from "react-redux";

interface SignInFormValues {
	email: string;
	password: string;
}

export const SignInForm: React.FC = () => {
	const dispatch = useDispatch();
	const [logIn, { isLoading }] = useLogInMutation();
	const { refetch } = useGetAuthStateQuery(); // Добавьте refetch
	const navigate = useNavigate();
	const { register, handleSubmit, formState, setError } = useForm<SignInFormValues>({
		mode: "onBlur",
	});

	const { errors } = formState;

	return (
		<form
			className="flex w-full flex-col gap-3"
			onSubmit={handleSubmit(async ({ email, password }) => {
				try {
					await logIn({ email, password }).unwrap();
					dispatch(authApi.util.invalidateTags(["Auth"]));
					await refetch();
					navigate(ROUTES.POKEMONS);
				} catch (error: any) {
					setError("root", {
						type: "manual",
						message: "Invalid email or password",
					});
					console.error("Login failed:", error);
				}
			})}
		>
			<h1 className="mb-4 text-3xl font-semibold">Login</h1>
			<Input
				{...register("email", emailSchema)}
				disabled={isLoading}
				placeholder="email"
				error={errors.email?.message}
			/>
			<Input
				type="password"
				{...register("password", passwordSchema)}
				disabled={isLoading}
				placeholder="password"
				error={errors.password?.message}
			/>
			{errors.root && <p className="text-red-500">{errors.root.message}</p>}
			<Button type="submit" variant="contained" loading={isLoading}>
				OK
			</Button>
		</form>
	);
};
