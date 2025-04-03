export const AuthInput = ({
  username,
  setValue,
  type,
  placeholder,
  erro,
  ...rest
}) => {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        value={username}
        onChange={(e) => setValue(e.target.value)}
        className="w-full p-3 border border-purple-700 rounded-md mb-4 text-white"
        {...rest}
      />
      {erro && (
        <span className="absolute left-0 -bottom-5 text-red-500 text-sm mt-1">
          {erro}
        </span>
      )}
    </>
  );
};
