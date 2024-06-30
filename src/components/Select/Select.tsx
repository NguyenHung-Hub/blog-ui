import React from "react";

interface ISelectOption {
  value: string;
  label: string;
}

type ISelectProps = React.ComponentProps<"select"> & {
  options: ISelectOption[];
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  title?: string;
  styleTitle?: string;
  className?: string;
};

const Select: React.FC<ISelectProps> = ({
  options,
  value,
  onChange,
  title,
  styleTitle = "bg-white",
  className = "",
  ...passProps
}) => {
  return (
    <div className={`relative inline-block w-full text-gray-700 ${className}`}>
      <select
        className="focus:shadow-outline w-full appearance-none rounded border border-gray-400 py-2 pl-3 pr-6 text-base placeholder-gray-600 outline-none hover:cursor-pointer"
        value={value}
        onChange={onChange}
        {...passProps}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <label
        className={`absolute left-2 top-0 z-10 -translate-y-1/2 select-none px-1 text-sm text-gray-500 transition-all ${styleTitle}`}
      >
        {title}
      </label>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
        <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
          <path
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
            fillRule="evenodd"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default Select;
