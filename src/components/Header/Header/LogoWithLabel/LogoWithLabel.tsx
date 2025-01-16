import { Logo } from "@/components/Header/Header/LogoWithLabel/Logo/Logo";

export const LogoWithLabel = () => {
  return (
    <div className="logo-animation-box flex cursor-pointer gap-3">
      <Logo />
      <span className="font-semibold text-white">RegexpGarden</span>
    </div>
  );
};
