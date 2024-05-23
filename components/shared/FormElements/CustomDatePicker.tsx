import "react-datepicker/dist/react-datepicker.css";

import DatePicker from "react-datepicker";

interface CustomDatePickerProps {
  className?: string;
  label?: string;
  errorMessage?: string | undefined;
  onChange: (...event: any[]) => void;
  selected?: Date | null;
}

export default function CustomDatePicker({
  className,
  label,
  errorMessage,
  onChange,
  selected,
}: CustomDatePickerProps): JSX.Element {
  return (
    <div className={className}>
      <div>
        <label className="mb-4 text-sm font-medium text-colour-700 dark:text-colour-500">
          {label}
        </label>
        {errorMessage != null ? (
          <div className="text-sm font-normal text-red-600">{errorMessage}</div>
        ) : (
          ""
        )}
      </div>
      <DatePicker
        className={`mt-2 h-12 w-[140%] resize-none rounded bg-slate-50 p-6 font-semibold text-slate-600 outline-1 dark:bg-colour-400 dark:text-white md:text-base ${
          errorMessage != null
            ? "outline outline-colour-900"
            : "focus:border-1 focus:border-colour-200 focus:ring-0 dark:focus:border-white"
        }`}
        onChange={(date) => {
          onChange(date);
        }}
        selected={selected}
      />
    </div>
  );
}
