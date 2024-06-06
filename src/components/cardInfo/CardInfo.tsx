import Image from "next/image";
import Link from "next/link";
import { CardInfoType } from "@/types/general";
import "./CardInfo.css";

export default function CardInfo({
  imagePath,
  content,
  linkTo,
  linkText,
}: CardInfoType) {
  return (
    <div className="card-info ">
      <div className="card-info-body ">
        <Image
          unoptimized
          src={imagePath}
          alt="{imagePath}"
          width={300}
          height={74}
          className="card-info-image"
        />
        <p className="card-info-text">{content}</p>
      </div>
      <Link href={linkTo} className="card-info-link">
        {linkText}
      </Link>
    </div>
  );
}
