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
import { useRegisterWithEmailAndPasswordMutation } from "../../../../utils/firebase/hooks/index";
import { User } from "../../../../../@types/data";

interface SignUpFormValues extends User {
	email: string;
	password: string;
}

export const SignUpForm: React.FC = () => {
	// const { setStore } = useStore();
	const [signUp, { isLoading }] = useSignUpMutation();
	const navigate = useNavigate();
	const { register, handleSubmit, formState, setError } = useForm<SignUpFormValues>();
	// const registerWithEmailAndPasswordMutation = useRegisterWithEmailAndPasswordMutation({
	// 	options: {
	// 		onSuccess: () => {
	// 			// setStore({ session: { isLoginIn: true } });
	// 			await signUp({ user, password }).unwrap();
	// 			navigate(ROUTES.POKEMONS);
	// 		},
	// 		onError: (error: any) => {
	// 			if (error.code === "auth/email-already-in-use") {
	// 				setError(
	// 					"email",
	// 					{ type: "custom", message: "email already in use" },
	// 					{ shouldFocus: true },
	// 				);
	// 			}
	// 		},
	// 	},
	// });

	// const { isSubmitting, errors } = formState;
	// const loading = isSubmitting || registerWithEmailAndPasswordMutation.isPending;

	return (
		<form
			className="flex w-full flex-col gap-3"
			onSubmit={handleSubmit(async ({ displayName, email, password, city }) => {
				try {
					await signUp({ displayName, email, password, city }).unwrap();
					navigate(ROUTES.POKEMONS);
				} catch (error: any) {
					if (error?.data?.message === "email already in use") {
						setError(
							"email",
							{ type: "custom", message: "Email already in use" },
							{ shouldFocus: true },
						);
					}
					console.error("Sign up failed:", error);
				}
			})}
		>
			<h1 className="mb-4 text-3xl font-semibold">Sign up</h1>
			<Input {...register("displayName", nameSchema)} disabled={isLoading} placeholder="name" />
			<Input {...register("email", emailSchema)} disabled={isLoading} placeholder="email" />
			<Input {...register("city", citySchema)} disabled={isLoading} placeholder="city" />
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
