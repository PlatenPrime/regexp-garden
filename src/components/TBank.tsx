import { inter } from "@/styles/fonts.ts";

const TBankButton = () => {
  return (
    <a
      href="https://pay.cloudtips.ru/p/6aeac820"
      target="_blank"
      style={{ background: "#ffdd2d" }}
      className="flex rounded-md items-center p-3 h-[30px]"
    >
      <span className={`${inter.className} text-[11px] font-medium`}>
        Поблагодарить автора
      </span>
    </a>
  );
};

export default TBankButton;
