import classnames from "classnames";

interface TitleProps {
	tag?: "h1" | "h2" | "span" | "div";
	variant?: "title" | "sub-title" | "title-regular" | "body" | "sub-body" | "title-body";
	children: React.ReactNode;
	className?: string;
}

const variantClasses = {
	title: "text-2xl font-semibold capitalize dark:text-white",
	"sub-title": "text-xl font-medium capitalize",
	"title-regular": "text-lg font-normal",
	body: "text-base font-medium",
	"title-body": "text-base font-semibold",
	"sub-body": "text-sm font-normal",
};

export const Typography: React.FC<TitleProps> = ({
	children,
	tag = "div",
	variant = "title",
	className,
}) => {
	const Component = tag;

	return (
		<Component className={classnames(className, variantClasses[variant])}>{children}</Component>
	);
};
