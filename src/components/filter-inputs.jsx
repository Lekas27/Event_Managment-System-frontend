export const FilterInput = ({
  placeholder,
  value,
  onChange,
  type = "text",
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="w-full sm:max-w-xs px-4 py-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-700 focus:border-none bg-darkGray text-white"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          onChange(e.target.value);
        }
      }}
    />
  );
};
