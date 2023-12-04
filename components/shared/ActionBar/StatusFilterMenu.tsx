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
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownVisible(false);
    }
  };

  const handleButtonClick = (): void => {
    handleDropdownToggle();
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
        className="flex cursor-pointer items-center gap-[14px]"
        onClick={handleButtonClick}
      >
        <label className="cursor-pointer font-bold text-colour-800 dark:text-white">
          Filter by status
        </label>
        <Image
          src={iconArrowDown}
          alt=""
          className={`ml-2 ${
            isDropdownVisible ? "rotate-180" : "rotate-0"
          } transition-transform duration-300 ease-in-out`}
        />
      </button>

      {isDropdownVisible && (
        <div
          ref={dropdownRef}
          className="absolute mt-10 flex h-32 w-48 flex-col justify-center rounded-lg bg-white pl-6 shadow"
        >
          <label>
            <input
              type="checkbox"
              checked={filterStatus.draft}
              onChange={() => {
                handleCheckboxChange("draft");
              }}
              className="mr-3 h-4 w-4 cursor-pointer rounded-sm border-none bg-colour-500 hover:border hover:border-colour-100"
            />
            Draft
          </label>
          <label>
            <input
              type="checkbox"
              checked={filterStatus.pending}
              onChange={() => {
                handleCheckboxChange("pending");
              }}
              className="mr-3 h-4 w-4 rounded-sm border-none bg-colour-500"
            />
            Pending
          </label>
          <label>
            <input
              type="checkbox"
              checked={filterStatus.paid}
              onChange={() => {
                handleCheckboxChange("paid");
              }}
              className="mr-3 h-4 w-4 rounded-sm border-none bg-colour-500"
            />
            Paid
          </label>
        </div>
      )}
    </div>
  );
}
