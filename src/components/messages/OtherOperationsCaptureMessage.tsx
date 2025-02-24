
export const OtherOperationsCaptureMessage = () => {
  return (
    <div className="step-ready">
      <p>
        Con la transacción capturada, puedes mostrar al usuario una página
        de éxito de la transacción, proporcionándole la confirmación de que
        el proceso se ha completado con éxito.
      </p>
      <br/>
      <div className="instructions">
        <p>
          Después de confirmar la transacción, podrás realizar otras operaciones útiles:
        </p>
        <ul className="list">
          <li>
            <span className="font-bold">Reembolsar:</span> Puedes reversar o
            anular el pago según ciertas condiciones comerciales.
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
