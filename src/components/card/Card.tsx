export type CardProps = {
  children: React.ReactNode;
};

export const Card = (props: CardProps) => {
  return (
    <div className="shadow-tbk-shadow-2 flex flex-col p-8 mt-4 mb-8 text-black">
      {props.children}
    </div>
  );
};
