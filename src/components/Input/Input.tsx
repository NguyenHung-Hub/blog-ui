import React from "react";
import styles from "./Input.module.css";

type InputProps = React.ComponentProps<"input"> & {
  title?: string;
  value?: string;
  styleTitle?: string;
  className?: string;
};
const Input = ({
  title,
  value,
  styleTitle = "bg-white",
  className = "",
  ...passProps
}: InputProps) => {
  return (
    <div className={`w-full ${className}`}>
      <div className="group relative rounded">
        <input
          type="text"
          value={value}
          className={`relative z-20 w-full resize-none rounded border border-gray-400 bg-transparent p-2 outline-none ${styles.input}`}
          placeholder=" "
          {...passProps}
        />

        <label
          className={`absolute left-2 top-1/2 z-10 -translate-y-[56%] select-none px-1 text-sm text-gray-500 transition-all group-focus-within:text-primary ${styleTitle}`}
        >
          {title}
        </label>
      </div>
    </div>
  );
};

export default Input;
