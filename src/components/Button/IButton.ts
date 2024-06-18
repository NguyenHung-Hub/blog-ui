import React, { ComponentProps } from "react";

export type ButtonProps = React.ComponentProps<"button"> & {
  primary?: boolean;
  success?: boolean;
  outline?: boolean;
  rounded?: boolean;
  disabled?: boolean;
  small?: boolean;
  children?: React.ReactNode;
  className?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};
