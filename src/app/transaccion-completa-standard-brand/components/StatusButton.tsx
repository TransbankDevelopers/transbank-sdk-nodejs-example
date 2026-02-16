"use client";

export type StatusButtonProps = {
  token: string;
  className?: string;
};

export const StatusButton = ({ token, className }: StatusButtonProps) => {
  return (
    <div className={`flex-start ${className ?? ""}`.trim()}>
      <a
        href={`/transaccion-completa-standard-brand/status?token=${token}`}
        className="tbk-button primary"
      >
        CONSULTAR ESTADO
      </a>
    </div>
  );
};
