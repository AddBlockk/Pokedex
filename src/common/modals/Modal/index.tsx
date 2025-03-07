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
				"fixed right-0 left-0 z-[1050] m-auto w-[99%] overflow-hidden overflow-y-auto rounded-t-2xl bg-white px-5 py-6 outline-none",
				"md:w-96 md:rounded-2xl md:px-9",
				"dark:bg-slate-700",
				{ "bottom-[0]": isShowing },
				{ "md:bottom-1/2": isShowing },
			)}
			aria-modal
			aria-hidden
			tabIndex={-1}
			role="dialog"
		>
			{isShowing && children}
		</div>
	</div>
);
