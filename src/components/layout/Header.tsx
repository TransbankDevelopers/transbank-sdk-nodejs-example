import TBKLogo from "@/assets/svg/tbk-logo.svg";
import Image from "next/image";
import Link from "next/link";
import { Button, ButtonVariant } from "@/components/button/Button";
import "./Header.css";

export const Header = () => {
  return (
    <div className="tbk-header">
      <Link href="/">
        <Image src={TBKLogo} alt="tbk logo" width={181} height={34} />
      </Link>
      <Button text="Comunidad Slack" variant={ButtonVariant.SECONDARY} />
    </div>
  );
};
