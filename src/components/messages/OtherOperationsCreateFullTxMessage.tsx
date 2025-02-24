
export const OtherOperationsCreateFullTxMessage = () => {
  return (
    <div className="step-ready">
      <div className="instructions">
        <p>
          Ahora que hemos creado la transacción, se abren dos opciones para continuar:
        </p>
        <ul className="list">
          <li>
            <span className="font-bold">Consultar Cuotas(opcional):</span> Alternativamente 
            puedes realizar consultas de cuotas para ofrecer opciones de pago a plazos.
          </li>
          <li>
            <span className="font-bold">Confirmar Transacción:</span> Debes confirmar directamente 
            la transacción para finalizar con el proceso de pago.
          </li>
        </ul>
      </div>
    </div>
  );
};
