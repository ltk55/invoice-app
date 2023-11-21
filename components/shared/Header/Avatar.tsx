import Image from "next/image";

import avatar from "@/public/assets/image-avatar.jpg";

export default function Avatar(): React.JSX.Element {
  return (
    <div className="flex h-full items-center justify-center border-l border-slate-600 px-6 xl:border-l-0 xl:border-t xl:py-6">
      <Image
        src={avatar}
        alt="avatar"
        className="w-8 rounded-full xl:h-10 xl:w-10"
      />
    </div>
  );
}
