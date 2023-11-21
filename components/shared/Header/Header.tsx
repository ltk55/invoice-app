"use client";

import Avatar from "./Avatar";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

export default function Header(): React.JSX.Element {
  return (
    <header className="fixed flex h-[72px] w-screen justify-between bg-gray-700 md:h-20 xl:h-full xl:w-[103px] xl:flex-col xl:rounded-r-2xl">
      <Logo />
      <div className="flex items-center gap-6 xl:flex-col xl:gap-8">
        <ThemeToggle />
        <Avatar />
      </div>
    </header>
  );
}
