import "./index.css";
import App from "./App.jsx";

import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "./app/store";

const queryClient = new QueryClient();
const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);

root.render(
	<QueryClientProvider client={queryClient}>
		<Provider store={store}>
			<App />
		</Provider>
	</QueryClientProvider>,
);
