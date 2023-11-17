import Image from "next/image";
import Link from "next/link";

import logo from "@/public/assets/logo.svg";

export default function Logo(): React.JSX.Element {
  return (
    <Link href="/" className="h-[72px] w-[72px] md:h-20 md:w-20">
      <div className="absolute left-0 top-0 z-0 h-[72px] w-[72px] rounded-r-2xl bg-colour-100 md:h-20 md:w-20 xl:h-[103px] xl:w-[103px]" />
      <div className="absolute left-0 top-9 z-10 h-9 w-[72px] rounded-br-2xl rounded-tl-3xl bg-colour-200 md:top-10 md:h-10 md:w-20 xl:top-[51.5px] xl:h-[51.5px] xl:w-[103px]" />
      <Image
        src={logo}
        alt="logo"
        className="absolute left-[22px] top-6 z-20 h-[27.6px] w-7 md:left-[26px] md:top-7 xl:left-8 xl:top-[34px] xl:h-[37.71px] xl:w-10"
      />
    </Link>
  );
}
