type RequestParams<Params> = Params;

interface RequestMutationSettings<Func extends (...args: any) => any = (...args: any) => any> {
	config?: AxiosRequestConfig;
	options?: UseMutationOptions<
		Awaited<ReturnType<Func>>, // TData
		any, // TError
		any, // TVariables
		any // TContext
	>;
}

interface RequestQuerySettings<Func extends (...args: any) => any = (...args: any) => any> {
	config?: import("axios").AxiosRequestConfig;
	options?: import("@tanstack/react-query").UseQueryOptions<
		Awaited<ReturnType<Func>>, // TQueryFnData
		any, // TError
		Awaited<ReturnType<Func>>, // TData
		any // TQueryKey
	>;
}

interface RequestInfinityQuerySettings<Func = {}> {
	config?: import("axios").AxiosRequestConfig;
	options?: import("@tanstack/react-query").UseInfiniteQueryOptions<
		Awaited<ReturnType<Func>>,
		any,
		Awaited<ReturnType<Func>>,
		Awaited<ReturnType<Func>>,
		any
	>;
}

interface RequestQueryParams<Params = {}> {
	params: Params;
}

interface RequestQueryWithoutParams<Func = {}> {
	config?: import("axios").AxiosRequestConfig;
	options?: import("@tanstack/react-query").UseQueryOptions<
		Awaited<ReturnType<Func>>,
		any,
		Awaited<ReturnType<Func>>,
		any,
		any
	>;
}

interface RequestInfiniteQueryWithoutParams<Func = {}> {
	config?: import("axios").AxiosRequestConfig;
	options?: import("@tanstack/react-query").UseInfiniteQueryOptions<
		Awaited<ReturnType<Func>>,
		any,
		Awaited<ReturnType<Func>>,
		any,
		any
	>;
}
