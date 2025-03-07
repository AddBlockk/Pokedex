import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "../../../../common/index";
import {
	citySchema,
	emailSchema,
	nameSchema,
	passwordSchema,
} from "../../../../utils/constants/validation";
import { ROUTES } from "../../../../utils/constants/index";

// import { useStore } from "@utils/contexts";
import { useSignUpMutation } from "../../../../entities/auth/api/authApi";
import { useGetAuthStateQuery } from "../../../../entities/auth/api/authApi";

interface SignUpFormValues extends User {
	email: string;
	password: string;
}

export const SignUpForm: React.FC = () => {
	const [signUp, { isLoading }] = useSignUpMutation();
	const { refetch } = useGetAuthStateQuery(); // Добавьте refetch
	const navigate = useNavigate();
	const { register, handleSubmit, formState, setError } = useForm<SignUpFormValues>({
		mode: "onBlur",
	});

	const { errors } = formState;

	return (
		<form
			className="flex w-full flex-col gap-3"
			onSubmit={handleSubmit(async ({ displayName, email, password, city }) => {
				try {
					await signUp({ displayName, email, password, city }).unwrap();
					await refetch(); // Дождитесь обновления состояния
					navigate(ROUTES.POKEMONS);
				} catch (error: any) {
					if (error?.data?.message === "email already in use") {
						setError(
							"email",
							{ type: "custom", message: "Email already in use" },
							{ shouldFocus: true },
						);
					} else {
						setError("root", {
							type: "manual",
							message: "Registration failed. Please try again.", // Общее сообщение об ошибке
						});
					}
					console.error("Sign up failed:", error);
				}
			})}
		>
			<h1 className="mb-4 text-3xl font-semibold">Sign up</h1>
			<Input
				{...register("displayName", nameSchema)}
				disabled={isLoading}
				placeholder="name"
				error={errors.displayName?.message}
			/>
			<Input
				{...register("email", emailSchema)}
				disabled={isLoading}
				placeholder="email"
				error={errors.email?.message}
			/>
			<Input
				{...register("city", citySchema)}
				disabled={isLoading}
				placeholder="city"
				error={errors.city?.message}
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
