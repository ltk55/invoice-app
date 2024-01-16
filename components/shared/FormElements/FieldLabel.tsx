import { cn } from "@/lib/utils";

export default function FieldLabel({
  labelName,
  className,
}: {
  labelName: string;
  className?: string;
}): JSX.Element {
  return (
    <label
      className={cn(
        "mb-4 font-medium text-colour-700 dark:text-colour-600",
        className,
      )}
    >
      {labelName}
    </label>
  );
}
