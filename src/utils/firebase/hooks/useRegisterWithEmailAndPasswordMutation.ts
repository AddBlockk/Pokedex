import { useMutation } from "@tanstack/react-query";

import { registerWithEmailAndPassword } from "../requests";

interface UseRegisterWithEmailAndPasswordMutationParams {
	user: User & { email: string };
	password: string;
}

export const useRegisterWithEmailAndPasswordMutation = (
	settings?: RequestMutationSettings<typeof registerWithEmailAndPassword>,
) =>
	useMutation({
		mutationFn: async (params: UseRegisterWithEmailAndPasswordMutationParams) =>
			registerWithEmailAndPassword(params.user, params.password),
		...settings?.options,
	});
