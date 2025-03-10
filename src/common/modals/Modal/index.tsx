import classnames from "classnames";

export const Modal: React.FC<ModalProps> = ({ children, isShowing, onClose }) => (
	<div className={classnames({ modal_open: isShowing })}>
		{isShowing && (
			<div
				aria-hidden
				className={classnames(
					"fixed top-0 left-0 z-[1040] h-screen w-screen bg-black opacity-20",
					"dark:opacity-60",
				)}
				onClick={onClose}
			/>
		)}
		<div
			className={classnames(
				"fixed top-1/2 right-0 left-0 z-[1050] m-auto flex w-[99%] flex-col gap-[10px] overflow-hidden rounded-t-2xl bg-white outline-none",
				"md:w-96 md:rounded-2xl md:px-9",
				"dark:bg-slate-700",
				"-translate-y-1/2 transform",
			)}
			aria-modal
			aria-hidden
			tabIndex={-1}
			role="dialog"
		>
			<div className="flex flex-col gap-[10px]">{isShowing && children}</div>
		</div>
	</div>
);
