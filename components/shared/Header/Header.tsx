import Avatar from "./Avatar";
import Logo from "./Logo";

export default function Header(): React.JSX.Element {
  return (
    <header className="fixed flex h-[72px] w-screen justify-between bg-gray-700 md:h-20 xl:h-full xl:w-[103px] xl:flex-col xl:rounded-r-2xl">
      {/* <div className="flex justify-between"> */}
      <Logo />
      <Avatar />
      {/* </div> */}
    </header>
  );
}
