type ITextAreaProps = React.ComponentProps<"textarea"> & {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  title?: string;
  styleTitle?: string;
  className?: string;
};

const TextArea: React.FC<ITextAreaProps> = ({
  value,
  onChange,
  title,
  styleTitle = "bg-white",
  className = "",
  ...passProps
}) => {
  return (
    <div className={`relative inline-block w-full text-gray-700 ${className}`}>
      <textarea
        className="focus:shadow-outline w-full appearance-none rounded border border-gray-400 py-2 pl-3 pr-6 text-base placeholder-gray-600 outline-none"
        value={value}
        onChange={onChange}
        {...passProps}
      ></textarea>
      <label
        className={`TextArea-none absolute left-2 top-0 z-10 -translate-y-1/2 px-1 text-sm text-gray-500 transition-all ${styleTitle}`}
      >
        {title}
      </label>
    </div>
  );
};

export default TextArea;
