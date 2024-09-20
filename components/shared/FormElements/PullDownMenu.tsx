import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

import iconArrowDown from "@/public/assets/icon-arrow-down.svg";

interface Option {
  label: string;
  value: string;
}

interface PullDownMenuProps {
  options: Option[];
  onChange: (arg: string) => void;
  className?: string;
  defaultOptionIndex?: number;
  label?: string;
  errorMessage?: string | undefined;
}

const PullDownMenu = React.forwardRef<HTMLDivElement, PullDownMenuProps>(
  (
    { options, onChange, className, defaultOptionIndex, label, errorMessage },
    ref,
  ) => {
    const [selected, setSelected] = useState<Option>(
      options[defaultOptionIndex ?? 0],
    );
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const handleToggle = (): void => {
      setIsOpen(!isOpen);
    };

    const handleOptionClick = (value: string): void => {
      const foundOption = options.find((option) => option.value === value);
      if (foundOption != null) {
        setSelected(foundOption);
        onChange(foundOption.value);
        setIsOpen(false);
      }
    };

    const handleClickOutside = (event: MouseEvent): void => {
      if (
        menuRef.current != null &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    return (
      <div className={className} ref={ref}>
        <label className="mb-4 text-sm font-medium text-colour-700 dark:text-colour-500">
          {label}
        </label>
        {errorMessage != null ? (
          <div className="mt-1 text-sm font-normal text-red-600">
            {errorMessage}
          </div>
        ) : (
          ""
        )}

        <div className="relative mt-2" ref={menuRef}>
          <button
            type="button"
            onClick={handleToggle}
            className={`relative mb-4 h-12 w-full cursor-pointer rounded bg-slate-50 px-6 py-2 text-left dark:bg-colour-400 ${
              isOpen ? "outline outline-1 outline-indigo-600" : ""
            }`}
          >
            <span className="flex items-center justify-between truncate text-base font-semibold text-slate-800 dark:text-white">
              {selected.label}
              <Image
                src={iconArrowDown}
                alt={isOpen ? "close select menu" : "open select menu"}
                // eslint-disable-next-line tailwindcss/migration-from-tailwind-2
                className={`transform transition-transform duration-300 ${
                  isOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            </span>
          </button>
          {isOpen && (
            <div
              className="absolute z-10 w-full overflow-auto rounded-lg bg-white text-base opacity-100 shadow transition-opacity duration-300 ease-out dark:bg-colour-400 sm:text-sm"
              style={{
                transform: `scaleY(${isOpen ? 1 : 0})`,
                transformOrigin: "top",
                transition: "transform 0.3s ease-out",
              }}
            >
              {options.map((opt, index) => (
                <div
                  key={index}
                  onClick={() => {
                    handleOptionClick(opt.value);
                  }}
                  className={`flex h-12 cursor-pointer select-none items-center px-6 ${
                    selected.value === opt.value
                      ? "text-colour-200"
                      : "text-colour-800 dark:text-colour-500"
                  } `}
                >
                  <span className="block truncate text-base font-semibold">
                    {opt.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  },
);

PullDownMenu.displayName = "PullDownMenu";

export default PullDownMenu;
