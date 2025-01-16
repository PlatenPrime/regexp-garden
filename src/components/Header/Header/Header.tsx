import github from "@public/assets/icons/social-icons/github.svg";
import tg from "@public/assets/icons/social-icons/tg.svg";
import { LogoWithLabel } from "@/components/Header/Header/LogoWithLabel/LogoWithLabel";
import BuyMeACoffeeButton from "@/components/BuyMeCoffee.tsx";
import TBankButton from "@/components/TBank.tsx";

export const Header = () => {
  const socials = [
    {
      icon: github,
      href: "https://github.com/avfirsov/regexp-garden",
      hint: "github logo",
    },
    { icon: tg, href: "https://t.me/curious_andrew", hint: "telegram logo" },
  ];

  return (
    <div className="flex justify-between items-center">
      <LogoWithLabel />
      <div className="flex justify-between items-center gap-7">
        <TBankButton />
        <BuyMeACoffeeButton />
        <div className="flex justify-between gap-3">
          {socials.map((social) => (
            <div className="cursor-pointer" key={social.href}>
              <a href={social.href} target="_blank">
                <social.icon />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
