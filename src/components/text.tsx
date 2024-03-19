import { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface TitleProps {
	children: ReactNode;
	as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
	className?: string;
}

export function Title({ children, as, className }: TitleProps) {
	switch (as) {
		case "h1":
			return (
				<h1 className={cn("font-bold text-2xl", className)}>{children}</h1>
			);
		case "h2":
			return (
				<h2 className={cn("font-bold text-xl", className)}>{children}</h2>
			);
		case "h3":
			return (
				<h3 className={cn("font-bold text-lg", className)}>{children}</h3>
			);
		case "h4":
			return <h4 className={cn("font-bold text-base", className)}>{children}</h4>;
		case "h5":
			return <h5 className={cn("font-bold text-base", className)}>{children}</h5>;
		case "h6":
			return (
				<h6 className={cn("font-bold text-base", className)}>{children}</h6>
			);
	}
}

interface TextProps {
	children?: ReactNode;
	as?: "p" | "span";
	className?: string;
}

export function Text({ children, as = "p", className }: TextProps) {
	switch (as) {
		case "p":
			return <p className={cn("text-base", className)}>{children}</p>;
		case "span":
			return <span className={cn("text-base", className)}>{children}</span>;
	}
}
