import React from "react";
import { ButtonProps } from "./IButton";

const Button = ({
  primary = false,
  success = false,
  outline = false,
  rounded = false,
  disabled = false,
  small = false,
  children,
  className = "",
  leftIcon,
  rightIcon,
  ...passProps
}: ButtonProps) => {
  const props: ButtonProps = { ...passProps };

  if (disabled) {
    Object.keys(props).forEach((key: string) => {
      if (
        key.startsWith("on") &&
        typeof props[key as keyof ButtonProps] === "function"
      ) {
        delete props[key as keyof ButtonProps];
      }
    });
  }

  const size = small ? "px-3 py-1.5 text-xs" : "px-6 py-2.5 text-sm";
  const s_rounded = rounded ? "rounded" : "rounded-none";

  let s_bg = "bg-transparent ";

  if (outline) {
    if (primary) {
      s_bg = "border border-primary font-semibold hover:bg-primary/20";
    } else if (success) {
      s_bg = "border border-success font-semibold hover:bg-success/20";
    } else {
      s_bg = "border border-gray-400 font-semibold hover:bg-gray-400/20";
    }
  } else {
    if (primary) {
      s_bg = "text-white bg-primary font-semibold hover:bg-primary/80";
    } else if (success) {
      s_bg = "text-white bg-success font-semibold hover:bg-success/80";
    }
  }

  return (
    <button
      className={`${size} ${s_rounded} ${s_bg} ${className} cursor-pointer ${
        disabled ? "opacity-50" : ""
      }`}
      {...props}
    >
      {leftIcon && <span>{leftIcon}</span>}
      <span className="select-none">{children}</span>
      {rightIcon && <span>{rightIcon}</span>}
    </button>
  );
};

export default Button;
