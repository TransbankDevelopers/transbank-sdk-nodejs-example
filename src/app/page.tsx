import { CardInfoType } from "@/types/general";
import { Questions } from "@/components/questions/Questions";
import Image from "next/image";
import CardInfo from "@/components/cardInfo/CardInfo";
import "./home.css";

const cardsInfo: CardInfoType[] = [
  {
    imagePath: "/webpay.svg",
    linkTo: "/webpay-plus",
    content:
      "El producto más usado para realizar un pago online. Se genera un único cobro para todos los productos o servicios adquiridos por el tarjetahabiente (carro de compras). ",
  },
  {
    imagePath: "/oneclick.svg",
    linkTo: "/oneclick-mall",
    content:
      "Permite realizar pagos con un solo clic en un comercio habitual para el tarjetahabiente, una vez que este haya registrado su tarjeta en el comercio.",
  },
  {
    imagePath: "/fulltx.svg",
    linkTo: "/transaccion-completa",
    content:
      "Transacción Completa permite al comercio presentar al tarjetahabiente un formulario propio para almacenar los datos de la tarjeta, fecha de vencimiento y cvv.",
  },
  {
    imagePath: "/patpass.svg",
    linkTo: "/patpass",
    content:
      "PatPass es el servicio de Transbank que permite el pago automático de cuentas mediante tarjetas de crédito. Es la solución ideal para pago de cuentas, centros educativos, aportes a fundaciones, y otros comercios e instituciones.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
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
    </div>
  );
}
