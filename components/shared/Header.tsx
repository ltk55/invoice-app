import Logo from "./Logo";

export default function Header(): React.JSX.Element {
  return (
    <header className="fixed h-[72px] w-full bg-gray-700 md:h-20 xl:h-full xl:w-[103px] xl:rounded-r-2xl">
      <Logo />
    </header>
  );
}
