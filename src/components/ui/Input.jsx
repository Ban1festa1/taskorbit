import React, { forwardRef } from "react";
import clsx from "clsx";

const Input = forwardRef(function Input({ className, ...props }, ref) {
  return (
    <input ref={ref} className={clsx("field h-10", className)} {...props} />
  );
});

export default Input;
