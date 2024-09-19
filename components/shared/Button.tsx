import Image from "next/image";

import { cn } from "@/lib/utils";
import iconPlus from "@/public/assets/icon-plus.svg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
}

export default function Button({
  variant,
  className,
  ...props
}: ButtonProps): React.JSX.Element {
  return (
    <button
      {...props}
      className={cn(
        "flex h-12 items-center justify-center rounded-3xl font-bold",
        className,
        {
          "bg-colour-100 text-white hover:bg-colour-200":
            variant === 1 || variant === 2,
          "bg-slate-50 text-colour-700 hover:bg-indigo-100 hover:text-colour-700 dark:bg-colour-400 dark:text-colour-500 hover:dark:bg-white hover:dark:text-colour-700":
            variant === 3,
          "bg-gray-700 text-colour-600 hover:bg-colour-700 dark:bg-gray-700 dark:text-colour-500 hover:dark:bg-colour-300":
            variant === 4,
          "bg-colour-900 text-white hover:bg-colour-1000": variant === 5,
          "bg-[#F9FAFE] text-colour-700 hover:bg-indigo-100 dark:bg-colour-400 dark:text-colour-500 dark:hover:bg-colour-300":
            variant === 6,
        },
      )}
    >
      {variant === 1 && (
        <Image
          src={iconPlus}
          alt="add"
          className="mx-2 size-8 rounded-full bg-white p-2.5 md:mr-4"
          width={10}
          height={10}
        />
      )}

      {props.children}
    </button>
  );
}
