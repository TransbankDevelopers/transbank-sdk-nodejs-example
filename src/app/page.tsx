import { Header } from "@/components/layout/Header";
import { CardInfoType } from "@/types/general";
import { Questions } from "@/components/questions/Questions";
import Footer from "@/components/Footer/Footer";
import Image from "next/image";
import CardInfo from "@/components/cardInfo/CardInfo";
import "./home.css";

const cardsInfo: CardInfoType[] = [
  {
    imagePath: "/webpay.svg",
    content:
      "Producto más usado para realizar un pago puntual en una tienda simple. Se genera un único cobro para todos los productos o servicios adquiridos por el tarjetahabiente (carro de compras). ",
    linkTo: "/webpay-plus",
  },
  {
    imagePath: "/oneclick.svg",
    content:
      "Utilizado para realizar pagos frecuentes en el mismo comercio por el mismo tarjetahabiente, almacena la información asociada a su medio de pago.",
    linkTo: "/oneclick-mall",
  },
  {
    imagePath: "/fulltx.svg",
    content:
      "Es un upgrade tecnológico. Se elimina el concepto de reversa realizada por Webpay, por lo que el control de la transacción pasa por completo al Comercio. Modalidades:",
    linkTo: "/transaccion-completa",
  },
  {
    imagePath: "/patpass.svg",
    content:
      "Pago automático de cuentas con cargo a la Tarjeta de Crédito de una o más cuentas de servicios. mezcla entre la funcionalidad de autentificación de Webpay con la recurrencia de Patpass.",
    linkTo: "/patpass",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      <Header />
      <div className="tbk-home-container">
        <h1>Proyectos de Ejemplo del SDK para NodeJS</h1>
        <div className="tbk-home-intro">
          <Image
            unoptimized
            src="/node-img.svg"
            alt="Node.js Logo"
            width={168}
            height={120}
            className="aling-self-start"
          />
          <p className="tbk-home-text">
            Este proyecto te brinda la oportunidad experimentar con las diversas
            modalidades de productos que Transbank ofrece a través de su SDK
            compatible con NodeJS. Conoce de manera práctica las soluciones y
            servicios que Transbank pone a tu disposición, permitiéndote
            comprender cómo integrar estas herramientas tecnológicas en tus
            proyectos y aplicaciones. ¡Explora las opciones disponibles y
            descubre cómo aprovechar al máximo estas capacidades!
          </p>
        </div>

        <hr className="separed-home" />
        <div className="cards-info-container">
          {cardsInfo.map((card) => (
            <CardInfo
              key={card.imagePath}
              imagePath={card.imagePath}
              content={card.content}
              linkTo={card.linkTo}
              linkText="Ver ejemplos y modalidades"
            />
          ))}
        </div>
        <hr className="separed-home" />
        <div className="contact-container">
          <Questions />
        </div>
      </div>

      <Footer />
    </div>
  );
}
