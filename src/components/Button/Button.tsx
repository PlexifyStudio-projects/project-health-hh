import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/utils/cn";
import "./Button.scss";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

interface CommonProps {
  variant?: Variant;
  size?: Size;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  fullWidth?: boolean;
  className?: string;
  children?: ReactNode;
}

interface ButtonAsButton extends CommonProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> {
  to?: undefined;
  href?: undefined;
}
interface ButtonAsLink extends CommonProps {
  to: string;
  href?: undefined;
}
interface ButtonAsAnchor extends CommonProps {
  href: string;
  to?: undefined;
  target?: string;
  rel?: string;
}

type Props = ButtonAsButton | ButtonAsLink | ButtonAsAnchor;

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, Props>(function Button(
  { variant = "primary", size = "md", iconLeft, iconRight, fullWidth, className, children, ...rest },
  ref
) {
  const classes = cn(
    "button",
    `button--${variant}`,
    `button--${size}`,
    fullWidth && "button--full",
    className
  );

  const inner = (
    <>
      {iconLeft && <span className="button__icon button__icon--left">{iconLeft}</span>}
      <span className="button__label">{children}</span>
      {iconRight && <span className="button__icon button__icon--right">{iconRight}</span>}
    </>
  );

  if ("to" in rest && rest.to) {
    return (
      <Link ref={ref as React.Ref<HTMLAnchorElement>} to={rest.to} className={classes}>
        {inner}
      </Link>
    );
  }
  if ("href" in rest && rest.href) {
    return (
      <a ref={ref as React.Ref<HTMLAnchorElement>} href={rest.href} className={classes} target={rest.target} rel={rest.rel}>
        {inner}
      </a>
    );
  }
  return (
    <button ref={ref as React.Ref<HTMLButtonElement>} className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {inner}
    </button>
  );
});
