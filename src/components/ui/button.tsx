import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-md text-sm font-medium " +
      "transition-colors focus-visible:outline-none focus-visible:ring-2 " +
      "focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 " +
      "bg-blue-600 text-white hover:bg-blue-700 h-10 px-4 py-2";

    return (
      <button
        className={`${baseStyles} ${className}`}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };