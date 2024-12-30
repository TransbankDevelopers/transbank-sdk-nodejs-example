"use client";

export type StatusButtonProps = {
  buyOrder: string;
  className?: string;
};
export const StatusButton = ({ buyOrder, className }: StatusButtonProps) => {
  return (
    <div className={`flex-start ${className}`}>
      <a
        href={`/oneclick-mall-deferred/status?buy_order=${buyOrder}`}
        className="tbk-button primary"
      >
        CONSULTAR ESTADO
      </a>
    </div>
  );
};
