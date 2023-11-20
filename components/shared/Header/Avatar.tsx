import Image from "next/image";

import avatar from "@/public/assets/image-avatar.jpg";

export default function Avatar(): React.JSX.Element {
  return (
    <div className="flex items-center justify-center border-l border-slate-600 p-6 xl:border-t">
      <Image
        src={avatar}
        alt="avatar"
        className="h-8 w-8 rounded-full xl:h-10 xl:w-10"
      />
    </div>
  );
}
