import Image, { StaticImageData } from "next/image";
import SlackLogo from "@/assets/img/slack.png";
import OutlookLogo from "@/assets/img/outlook.png";

export type QuestionOptionProps = {
  title: string;
  content: string;
  link: string;
  logo: StaticImageData;
};

export const QuestionOption = (props: QuestionOptionProps) => {
  return (
    <div className="flex flex-col gap-4">
      <span className="text-center tbk-black">{props.title}</span>
      <div className="bg-white flex flex-col gap-4 items-center p-6">
        <a href={props.link}>
          <Image
            className="cursor-pointer"
            src={props.logo}
            alt={props.title}
          />
        </a>
        <span className="text-black text-sm">{props.content}</span>
      </div>
    </div>
  );
};

export const Questions = () => {
  return (
    <div className="flex flex-col">
      <span className="font-bold text-tbk-red text-lg text-center">
        ¿Tienes alguna duda de integración?
      </span>
      <div className="mt-6 grid grid-cols-2 gap-10 bg-tbk-light-red p-6 text-black rounded">
        <QuestionOption
          title="Escríbenos por slack"
          content="Únete a nuestra comunidad de integradores. Nuestro equipo está ahí para ayudarte"
          link="http://google.com"
          logo={SlackLogo}
        />
        <QuestionOption
          title="Envíanos un mensaje"
          content="Necesitas resolver algún tipo de incidencia, contáctanos a través de correo electrónico"
          link="http://google.com"
          logo={OutlookLogo}
        />
      </div>
    </div>
  );
};
