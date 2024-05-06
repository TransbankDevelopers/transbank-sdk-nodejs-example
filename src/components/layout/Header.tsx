import TBKLogo from "@/assets/svg/tbk-logo.svg";
import Image from "next/image";
import { Button, ButtonVariant } from "@/components/button/Button";

export const Header = () => {
  return (
    <div className="h-[80px] bg-tbk-white w-full flex items-center px-40 shadow-tbk-shadow justify-between">
      <Image src={TBKLogo} alt="tbk=" />
      <Button text="Comunidad Slack" variant={ButtonVariant.SECONDARY} />
    </div>
  );
};
