import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...classes: ClassValue[]): string {
  return twMerge(clsx(...classes));
}

function capitalizeFirstCharacter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export { capitalizeFirstCharacter, cn };
