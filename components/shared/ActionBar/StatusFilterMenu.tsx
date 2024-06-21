import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

import useInvoiceStore from "@/lib/invoiceStore";
import iconArrowDown from "@/public/assets/icon-arrow-down.svg";
import type { Status } from "@/types";

export default function StatusFilterMenu(): React.JSX.Element {
  const [filterStatus, setFilterStatus] = useInvoiceStore((state) => [
    state.filterStatus,
    state.setFilterStatus,
  ]);

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleCheckboxChange = (status: Status): void => {
    setFilterStatus({
      ...filterStatus,
      [status]: !filterStatus[status],
    });
  };

  const handleDropdownToggle = (): void => {
    setIsDropdownVisible((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent): void => {
    if (
      dropdownRef.current != null &&
      !dropdownRef.current.contains(event.target as Node) &&
      buttonRef.current != null &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      setIsDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative z-0 flex flex-col items-center">
      <button
        ref={buttonRef}
        className="flex cursor-pointer items-center gap-[14px]"
        onClick={handleDropdownToggle}
        aria-controls="status-dropdown"
        aria-expanded={isDropdownVisible}
        aria-haspopup="true"
      >
        <label className="cursor-pointer font-bold text-colour-800 dark:text-white">
          Filter <div className="hidden md:inline">by status</div>
        </label>
        <Image
          src={iconArrowDown}
          alt="Toggle dropdown"
          className={`ml-2 ${
            isDropdownVisible ? "rotate-180" : "rotate-0"
          } transition-transform duration-300 ease-in-out`}
        />
      </button>

      {isDropdownVisible && (
        <div
          id="status-dropdown"
          ref={dropdownRef}
          className="absolute mt-10 flex h-32 w-48 flex-col justify-center rounded-lg bg-white pl-6 shadow dark:bg-colour-400"
        >
          {["draft", "pending", "paid"].map((status) => (
            <label key={status} className="flex cursor-pointer align-middle">
              <input
                type="checkbox"
                checked={filterStatus[status as Status]}
                onChange={() => {
                  handleCheckboxChange(status as Status);
                }}
                className="mr-3 h-4 w-4 rounded-sm border-none bg-colour-500 hover:border hover:border-colour-100 dark:bg-colour-300"
                aria-label={`Filter by ${status}`}
              />
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
