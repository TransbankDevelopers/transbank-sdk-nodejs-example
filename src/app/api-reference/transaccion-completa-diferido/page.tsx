"use client";
import Sidebar from "@/components/sidebar/Sidebar";
import Collapse from "@/components/collapse/Collapse";
import { Table } from "@/components/table/Table";
import { getColumnDefinition } from "@/helpers/transactions/transactionHelper";
import {
  txCompleteStatus,
  txCompleteRefund,
  txCompleteCapture,
} from "@/helpers/transactions/txComplete/apiResponse";
import ApiRefTxDeferredStatus from "./ApiRefTxDeferredStatus";
import ApiRefTxDeferredRefund from "./ApiRefTxDeferredRefund";
import ApiRefTxDeferredCapture from "./ApiRefTxDeferredCapture";

export default function ApiRefWebpay() {
  return (
    <div className="tbk-layout-body">
      <Sidebar actualPath="/api-reference/transaccion-completa-diferido" />
      <div className="tbk-layout-content api-ref">
        <h2>Obtener estado de una transacción</h2>
        <p>
          Esta operación permite obtener el estado de la transacción en
          cualquier momento. En condiciones normales es probable que no se
          requiera ejecutar, pero en caso de ocurrir un error inesperado permite
          conocer el estado y tomar las acciones que correspondan.
        </p>
        <ApiRefTxDeferredStatus />

        <Collapse label="Respuesta Transaction.status">
          <Table columns={getColumnDefinition()} rows={txCompleteStatus} />
        </Collapse>

        <h2>Capturar una transacción</h2>
        <p>
          Permite solicitar a Webpay la captura diferida de una transacción con
          autorización y sin captura simultánea. Puedes revisar más detalles de
          esta operación en su{" "}
          <a
            className="tbk-link"
            target="_blanck"
            href="https://www.transbankdevelopers.cl/producto/webpay#autorizacion-y-captura"
          >
            documentación
          </a>
        </p>
        <ApiRefTxDeferredCapture />

        <Collapse label="Respuesta Transaction.status">
          <Table columns={getColumnDefinition()} rows={txCompleteCapture} />
        </Collapse>

        <h2>Reversar o Anular un pago</h2>
        <p>
          Las transacciones de Webpay se pueden anular o reversar dadas algunas
          condiciones. Para cualquiera de éstas operaciones se utiliza el mismo
          servicio web que discernirá si se realizará una reversa o una
          anulación. para mas informacion sobre anulaciones a reversa visite{" "}
          <a
            href="https://www.transbankdevelopers.cl/producto/webpay#anulaciones-y-reversas"
            target="_blanck"
            className="tbk-link"
          >
            aqui
          </a>
        </p>
        <ApiRefTxDeferredRefund />
        <Collapse label="Respuesta Transaction.refund">
          <Table columns={getColumnDefinition()} rows={txCompleteRefund} />
        </Collapse>
      </div>
    </div>
  );
}
