"use client";

type StatusButtonProps = {
  token: string;
  className?: string;
};

export const StatusButton = ({ token, className }: StatusButtonProps) => {
  return (
    <div className={`flex-start ${className}`}>
      <a
        href={`/transaccion-completa-diferido/status?token=${token}`}
        className="tbk-button primary"
      >
        CONSULTAR ESTADO
      </a>
    </div>
  );
};
