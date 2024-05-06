import Image from "next/image";
import ThumbUp from "@/assets/svg/thumb-up.svg";
import ThumbDown from "@/assets/svg/thumb-down.svg";

export const HelpMenu = () => {
  return (
    <div>
      <div className="shadow-tbk-card-shadow px-6 py-8 flex flex-col rounded mt-28 text-black">
        <div className="border-b border-tbk-border-blue flex justify-center pb-3">
          <span className="text-base text-center">
            ¿El contenido te fue útil?
          </span>
        </div>
        <div className="mt-6 flex justify-center gap-8">
          <div className="flex flex-col justify-center items-center gap-3 cursor-pointer">
            <div className="rounded-full h-[56px] w-[56px] shadow-tbk-card-shadow flex items-center justify-center">
              <Image src={ThumbUp} alt="ok" />
            </div>
            <span className="text-xs">Muy útil</span>
          </div>
          <div className="flex flex-col justify-center items-center gap-3 cursor-pointer">
            <div className="rounded-full h-[56px] w-[56px] shadow-tbk-card-shadow flex items-center justify-center">
              <Image src={ThumbDown} alt="no" />
            </div>
            <span className="text-xs">Nada útil</span>
          </div>
        </div>
      </div>
    </div>
  );
};
