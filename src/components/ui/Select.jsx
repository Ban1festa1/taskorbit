import React, { forwardRef } from "react";
import clsx from "clsx";

const Select = forwardRef(function Select(
  { className, children, ...props },
  ref,
) {
  return (
    <select ref={ref} className={clsx("field h-10", className)} {...props}>
      {children}
    </select>
  );
});

export default Select;
