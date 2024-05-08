import TBKLogo from "@/assets/svg/tbk-logo.svg";
import Image from "next/image";
import { Button, ButtonVariant } from "@/components/button/Button";
import "./Header.css";

export const Header = () => {
  return (
    <div className="tbk-header">
      <Image src={TBKLogo} alt="tbk logo" width={181} height={34} />
      <Button text="Comunidad Slack" variant={ButtonVariant.SECONDARY} />
    </div>
  );
};
