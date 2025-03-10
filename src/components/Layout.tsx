import { Outlet } from "react-router-dom";
import { Header } from "../common/layout/Header/Header";

export const Layout = () => {
	return (
		<div className="container mt-[20px] w-full px-[10px] text-red-500">
			<Header />
			<div className="pt-[80px] sm:mx-auto">
				<Outlet />
			</div>
		</div>
	);
};
