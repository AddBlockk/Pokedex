import React from "react";
import { MobileMenu } from "./components/MobileMenu";
import { DesktopMenu } from "./components/DesktopMenu";

export const Header: React.FC = () => (
	<div className="fixed right-0 left-0 z-20 mx-auto mb-[20px] w-[98%] max-w-screen-xl rounded-2xl border-1 border-white bg-white px-[10px] py-[5px] shadow-2xl md:container md:w-full dark:bg-slate-500 dark:text-white">
		<div>
			<MobileMenu />
			<DesktopMenu />
		</div>
	</div>
);
