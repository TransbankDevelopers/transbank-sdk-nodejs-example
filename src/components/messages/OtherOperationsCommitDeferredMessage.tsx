
export const OtherOperationsCommitDeferredMessage = () => {
  return (
    <div className="step-ready">
      <div className="instructions">
        <p>
          Ahora que hemos confirmado la transacción, se abren dos opciones para continuar:
        </p>
        <ul className="list">
          <li>
            <span className="font-bold">Capturar:</span> La transacción necesita ser 
            capturada para ser autorizada.
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
