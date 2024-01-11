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
      className="flex items-baseline gap-4 self-start"
    >
      <Image src={iconArrowLeft} alt="go back" />
      <span className="font-bold text-colour-800 hover:text-colour-700 dark:text-white dark:hover:text-colour-600">
        Go Back
      </span>
    </button>
  );
}
