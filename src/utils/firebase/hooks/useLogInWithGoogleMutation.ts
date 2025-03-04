import { useMutation } from "@tanstack/react-query";
import { loginWithGoogle } from "../requests/loginWithGoogle";

export const useLogInWithGoogleMutation = (
	settings?: RequestMutationSettings<typeof loginWithGoogle>,
) =>
	useMutation({
		mutationKey: ["loginWithGoogle"],
		mutationFn: loginWithGoogle,
		...settings?.options,
	});
