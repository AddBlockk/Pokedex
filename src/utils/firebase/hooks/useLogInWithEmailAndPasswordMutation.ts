import { useMutation, UseMutationOptions  } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import { logInWithEmailAndPassword } from "../requests";

interface RequestMutationSettings<TData, TVariables> {
    config?: AxiosRequestConfig;
    options?: UseMutationOptions<TData, any, TVariables, unknown>;
  }

  export const useLogInWithEmailAndPasswordMutation = (
    settings?: RequestMutationSettings<
      Awaited<ReturnType<typeof logInWithEmailAndPassword>>,
      UseLogInWithEmailAndPasswordMutationParams
    >
  ) =>
    useMutation({
      mutationFn: async (params: UseLogInWithEmailAndPasswordMutationParams) =>
        logInWithEmailAndPassword(params.email, params.password),
      ...settings?.options,
    });