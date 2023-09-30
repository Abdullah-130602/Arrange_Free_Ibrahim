import React from "react";

const InputArea = ({
  defaultValue,
  name,
  label,
  type,
  placeholder,
  Icon,
  onChange,
  maxLength,
  autoComplete,
  className,
  id,
  value,
}) => {
  return (
    <>
      <label className="block text-gray-500 font-medium text-sm leading-none mb-2 tracking-wider">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-800 focus-within:text-gray-900 sm:text-base">
              <Icon />{" "}
            </span>
          </div>
        )}
        <input
          // {...register(`${name}`, {
          //   required: `${label} is required!`,
          // })}
          defaultValue={defaultValue}
          type={type}
          placeholder={placeholder}
          name={name}
          onChange={onChange}
          maxLength={maxLength}
          autoComplete={autoComplete}
          id={id}
          value={value}
          className={` ${className}
              py-2 px-4 md:px-5 w-full placeholder:tracking-wider appearance-none border text-sm font-semibold text-black opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-black h-11 md:h-12
          `}
        />
      </div>
    </>
  );
};

export default InputArea;
