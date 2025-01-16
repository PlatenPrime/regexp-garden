import "./Logo.css";
import LogoSVG from "@public/assets/icons/logo.svg";

interface Props {
  animateOnHover?: boolean;
}

export const Logo: React.FC<Props> = ({ animateOnHover = true }) => {
  return (
    <div className={animateOnHover ? "logo-animation-box" : ""}>
      <LogoSVG className="logo" />
    </div>
  );
};
