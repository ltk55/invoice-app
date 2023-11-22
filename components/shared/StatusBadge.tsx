import { capitalizeFirstCharacter, cn } from "@/lib/utils";
import { type Status } from "@/types";

export default function StatusBadge({
  status,
  className,
}: {
  status: Status;
  className?: string;
}): React.JSX.Element {
  return (
    <div
      className={cn(
        "flex h-10 w-[104px] items-center justify-center rounded-md bg-opacity-5",
        className,
        {
          "bg-emerald-400 text-emerald-400": status === "paid",
          "bg-amber-500 text-amber-500": status === "pending",
          "bg-gray-700 text-gray-700 dark:bg-colour-400 dark:text-colour-500":
            status === "draft",
        },
      )}
    >
      <span
        className={cn("mr-2 h-2 w-2 rounded-full", {
          "bg-emerald-400": status === "paid",
          "bg-amber-500": status === "pending",
          "bg-gray-700 dark:bg-colour-500": status === "draft",
        })}
      />
      <span className="font-bold leading-none">
        {capitalizeFirstCharacter(status)}
      </span>
    </div>
  );
}
