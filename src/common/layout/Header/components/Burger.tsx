interface BurgerProps {
	onClick: () => void;
	isActive: boolean;
}

const lineStyles = ["w-full", "w-full", "w-full"];

const activeLineStyles = [
	"w-1/2 origin-bottom rotate-45 translate-x-[5px] translate-y-[3px]",
	"w-full origin-top -rotate-45",
	"w-1/2 origin-bottom translate-x-[12px] -translate-y-[8px] rotate-45",
];

export const Burger: React.FC<BurgerProps> = ({ onClick, isActive }) => (
	<div
		tabIndex={0}
		role="button"
		onKeyPress={(event) => {
			if (event.key === "Enter") onClick();
		}}
		onClick={onClick}
		className={`w-11 space-y-2 p-2 transition duration-200 ${isActive ? "bg-opacity-80 space-y-2 rounded bg-blue-500 p-2 shadow dark:bg-slate-500" : ""}`}
	>
		{[...Array(3)].map((_, index) => (
			<div
				key={index}
				className={`h-[4px] rounded-lg bg-blue-500 transition-[transform] duration-200 ease-[cubic-bezier(0.68,-0.6,0.32,1.6)] dark:bg-slate-300 ${isActive ? activeLineStyles[index] : lineStyles[index]}`}
			/>
		))}
	</div>
);
