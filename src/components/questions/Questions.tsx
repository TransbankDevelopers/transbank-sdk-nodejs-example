import "./Questions.css";
import Image, { StaticImageData } from "next/image";
import SlackLogo from "@/assets/img/slack.png";
import OutlookLogo from "@/assets/img/outlook.png";

export type QuestionOptionProps = {
  title: string;
  content: string;
  link: string;
  logo: StaticImageData;
  width: number;
  height: number;
};

export const QuestionOption = (props: QuestionOptionProps) => {
  return (
    <div className="question-item">
      <span className="title">{props.title}</span>
      <div className="inner-container">
        <a href={props.link}>
          <Image
            unoptimized
            src={props.logo}
            alt={props.title}
            width={props.width}
            height={props.height}
          />
        </a>
        <span className="container">{props.content}</span>
      </div>
    </div>
  );
};

export const Questions = () => {
  return (
    <div className="questions-container">
      <span className="header">¿Tienes alguna duda de integración?</span>
      <div className="list">
        <QuestionOption
          title="Escríbenos por slack"
          content="Únete a nuestra comunidad de integradores. Nuestro equipo está ahí para ayudarte"
          link="http://google.com"
          logo={SlackLogo}
          width={124}
          height={32}
        />
        <QuestionOption
          title="Envíanos un mensaje"
          content="Necesitas resolver algún tipo de incidencia, contáctanos a través de correo electrónico"
          link="http://google.com"
          logo={OutlookLogo}
          width={32}
          height={32}
        />
      </div>
    </div>
  );
};
