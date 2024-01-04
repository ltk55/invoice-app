import Image from "next/image";
import { useRouter } from "next/navigation";

import iconArrowLeft from "@/public/assets/icon-arrow-left.svg";

export default function GoBackBtn(): JSX.Element {
  const router = useRouter();

  return (
    <button
      onClick={() => {
        router.back();
      }}
      className="flex items-center gap-4 self-start"
    >
      <Image src={iconArrowLeft} alt="go back" />
      <span className="font-bold text-colour-800 dark:text-white">Go Back</span>
    </button>
  );
}
