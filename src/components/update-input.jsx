export const UpdateInput = ({
  type,
  placeholder,
  error,
  value,
  onChange,
  options,
  ...rest
}) => {
  if (type === "select" && options) {
    return (
      <div className="relative">
        <select
          className={`w-full p-3 rounded-lg bg-gray-800 text-white border-2 ${
            error ? "border-red-500" : "border-none"
          } focus:outline-none focus:ring-2 focus:ring-purple-700 ${
            error ? "focus:ring-red-500" : ""
          }`}
          value={value}
          onChange={onChange}
          {...rest}
        >
          <option value="" disabled>
            {placeholder || "Select an option"}
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {error && (
          <span className="absolute left-0 -bottom-5 text-red-500 text-sm mt-1">
            {error}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full p-3 rounded-lg bg-gray-800 text-white border-2 ${
          error ? "border-red-500" : "border-none"
        } focus:outline-none focus:ring-2 focus:ring-purple-700 ${
          error ? "focus:ring-red-500" : ""
        }`}
        value={value}
        onChange={onChange}
        {...rest}
      />
      {error && (
        <span className="absolute left-0 -bottom-5 text-red-500 text-sm mt-1">
          {error}
        </span>
      )}
    </div>
  );
};
