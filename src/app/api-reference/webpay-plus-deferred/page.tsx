"use client";
import Sidebar from "@/components/sidebar/Sidebar";
import Collapse from "@/components/collapse/Collapse";
import { Table } from "@/components/table/Table";
import { getColumnDefinition } from "@/helpers/transactions/transactionHelper";
import {
  webpayPlusStatus,
  webpayPlusRefund,
  webpayPlusDeferred,
} from "@/helpers/transactions/webpay/apiResponse";
import ApiRefWebpayDeferredStatus from "./ApiRefWebpayDeferredStatus";
import ApiRefWebpayDeferredRefund from "./ApiRefWebpayDeferredRefund";
import ApiRefWebpayDeferredCapture from "./ApiRefWebpayDeferredCapture";

export default function ApiRefWebpayDeferred() {
  return (
    <div className="tbk-layout-body">
      <Sidebar actualPath="/api-reference/webpay-plus-deferred" />
      <div className="tbk-layout-content">
        <h2>Obtener estado de una transacción</h2>
        <p>
          Esta operación permite obtener el estado de la transacción en
          cualquier momento. En condiciones normales es probable que no se
          requiera ejecutar, pero en caso de ocurrir un error inesperado permite
          conocer el estado y tomar las acciones que correspondan.
        </p>
        <ApiRefWebpayDeferredStatus />

        <Collapse label="Respuesta Transaction.status">
          <Table columns={getColumnDefinition()} rows={webpayPlusStatus} />
        </Collapse>

        <h2>Capturar una transacción</h2>
        <p>
          Permite solicitar a Webpay la captura diferida de una transacción con
          autorización y sin captura simultánea. Puedes revisar más detalles de
          esta operación en su{" "}
          <a
            className="tbk-link"
            target="_blanck"
            href="https://www.transbankdevelopers.cl/documentacion/webpay-plus#capturar-una-transaccion"
          >
            documentación
          </a>
        </p>
        <ApiRefWebpayDeferredCapture />

        <Collapse label="Respuesta Transaction.status">
          <Table columns={getColumnDefinition()} rows={webpayPlusDeferred} />
        </Collapse>

        <h2>Reversar o Anular un pago</h2>
        <p>
          Las transacciones de Webpay se pueden anular o reversar dadas algunas
          condiciones. Para cualquiera de éstas operaciones se utiliza el mismo
          servicio web que discernirá si se realizará una reversa o una
          anulación. para mas informacion sobre anulaciones a reversa visite la{" "}
          <a
            href="https://www.transbankdevelopers.cl/producto/webpay#anulaciones-y-reversas"
            target="_blanck"
            className="tbk-link"
          >
            documentación
          </a>
        </p>
        <ApiRefWebpayDeferredRefund />
        <Collapse label="Respuesta Transaction.refund">
          <Table columns={getColumnDefinition()} rows={webpayPlusRefund} />
        </Collapse>
      </div>
    </div>
  );
}
