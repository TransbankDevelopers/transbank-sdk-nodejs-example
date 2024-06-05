import Image from "next/image";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="bg-tbk-black-bg tbk-footer">
      <div className="footer-item">
        <Image
          src="tbk-white.svg"
          alt="tbk-logo-white"
          width={200}
          height={38}
        />
      </div>
      <span className="footer-item boder-t-gray3">
        Hecho con amor por Continuum y Transbank.
      </span>
    </footer>
  );
}
