"use client";

import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
  errorMessage?: string | undefined;
}

export default function Input({
  className,
  label,
  errorMessage,
  ...restProps
}: InputProps): JSX.Element {
  return (
    <div className={className}>
      <label className="mb-4 font-medium text-colour-700 dark:text-colour-600">
        {label}
      </label>
      {errorMessage != null ? (
        <div className="mt-1 text-sm font-normal text-red-600">
          {errorMessage}
        </div>
      ) : (
        ""
      )}
      <input
        className={`h-12 w-full resize-none rounded bg-slate-50 p-6 text-xs font-normal text-slate-600 outline-1 md:text-base ${
          errorMessage != null
            ? "outline outline-colour-900"
            : "focus:border-1 focus:border-colour-200 focus:ring-0"
        }`}
        {...restProps}
      />
    </div>
  );
}
