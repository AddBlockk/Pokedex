import { useMutation } from "@tanstack/react-query";
import { logout } from "../requests/index";

export const useLogoutMutation = (settings?: RequestMutationSettings<typeof logout>) =>
	useMutation({
		mutationKey: ["logoutMutation"],
		mutationFn: logout,
		...settings?.options,
	});
