import Image from "next/image";
import ThumbUp from "@/assets/svg/thumb-up.svg";
import ThumbDown from "@/assets/svg/thumb-down.svg";
import "./HelpMenu.css";

export const HelpMenu = () => {
  return (
    <div>
      <div className="help-card-container">
        <div className="help-card-header">
          <span>¿El contenido te fue útil?</span>
        </div>
        <div className="help-card-body">
          <div className="help-card-body-item">
            <div className="help-card-circle">
              <Image unoptimized src={ThumbUp} alt="ok" />
            </div>
            <span className="text-xs">Muy útil</span>
          </div>
          <div className="help-card-body-item">
            <div className="help-card-circle">
              <Image unoptimized src={ThumbDown} alt="no" />
            </div>
            <span className="text-xs">Nada útil</span>
          </div>
        </div>
      </div>
    </div>
  );
};
