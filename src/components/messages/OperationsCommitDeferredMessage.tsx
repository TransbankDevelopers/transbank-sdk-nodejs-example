
export const OperationsCommitDeferredMessage = () => {
  return (
    <div className="step-ready">
      <div className="instructions">
        <p>
          Ahora que se ha confirmado la transacción, puedes capturar el monto previamente autorizado. 
          El monto a capturar puede ser igual o menor al monto autorizado. La captura debe efectuarse dentro de un plazo máximo de 7 días calendario.
        </p>
        <ul className="list">
          <li>
            <span className="font-bold">Capturar:</span> Captura un monto igual o menor al previamente autorizado.
          </li>
          <li>
            <span className="font-bold">Consultar Estado:</span> Hasta 7
            días después de realizada la transacción, podrás consultar el
            estado de la transacción.
          </li>
        </ul>
      </div>
    </div>
  );
};
