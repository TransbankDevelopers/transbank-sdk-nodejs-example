"use client";

export type StatusButtonProps = {
  token: string;
  className?: string;
};
export const StatusButton = ({ token, className }: StatusButtonProps) => {
  return (
    <div className={`flex-start ${className}`}>
      <a
        href={`/webpay-plus/status?token_ws=${token}`}
        className="tbk-button primary"
      >
        CONSULTAR ESTADO
      </a>
    </div>
  );
};
