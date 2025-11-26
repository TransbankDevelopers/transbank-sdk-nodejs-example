"use client";

export type InfoBinButtonProps = {
  tbkUser: string;
  className?: string;
};
export const InfoBinButton = ({ tbkUser, className }: InfoBinButtonProps) => {
  return (
    <div className={`flex-start ${className}`}>
      <a
        href={`/promotions-oneclick-mall/info-bin?tbk_user=${tbkUser}`}
        className="tbk-button primary"
      >
        CONSULTA BINES
      </a>
    </div>
  );
};
