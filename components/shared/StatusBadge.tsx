import { capitalizeFirstCharacter, cn } from "@/lib/utils";
import { type Status } from "@/types";

export default function StatusBadge({
  status,
}: {
  status: Status;
}): React.JSX.Element {
  return (
    <div
      className={cn(
        "flex h-10 w-[104px] items-center justify-center rounded-md bg-opacity-5",
        {
          "bg-emerald-400 text-emerald-400": status === "paid",
          "bg-amber-500 text-amber-500": status === "pending",
          "bg-gray-700 text-gray-700": status === "draft",
        },
      )}
    >
      <span
        className={cn("mr-2 h-2 w-2 rounded-full", {
          "bg-emerald-400": status === "paid",
          "bg-amber-500": status === "pending",
          "bg-gray-700": status === "draft",
        })}
      />
      <span className="font-bold leading-none">
        {capitalizeFirstCharacter(status)}
      </span>
    </div>
  );
}
