import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
  errorMessage?: string | undefined;
  hideLabelOnMd?: boolean;
}

export default function Input({
  className,
  label,
  errorMessage,
  hideLabelOnMd,
  ...restProps
}: InputProps): JSX.Element {
  return (
    <div className={className}>
      <div className="flex justify-between">
        {label != null && (
          <label
            className={`text-sm font-medium text-colour-700 dark:text-colour-500 ${
              (hideLabelOnMd ?? false) ? "md:hidden" : ""
            }`}
          >
            {label}
          </label>
        )}

        {errorMessage != null && (
          <div className="text-sm font-normal text-red-600">{errorMessage}</div>
        )}
      </div>
      <input
        className={`mt-2 h-12 w-full resize-none rounded border-0 bg-slate-50 px-6 font-semibold text-slate-600 outline-1 dark:bg-colour-400 dark:text-white md:text-base ${
          errorMessage != null
            ? "outline outline-colour-900"
            : "focus:border-1 focus:border-colour-200 focus:ring-0 dark:focus:border-white"
        }`}
        {...restProps}
      />
    </div>
  );
}
