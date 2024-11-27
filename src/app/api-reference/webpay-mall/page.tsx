"use client";
import Sidebar from "@/components/sidebar/Sidebar";
import Collapse from "@/components/collapse/Collapse";
import { Table } from "@/components/table/Table";
import { getColumnDefinition } from "@/helpers/transactions/transactionHelper";
import {
  webpayPlusMallStatus,
  webpayPlusMallRefund,
} from "@/helpers/transactions/webpay/apiResponse";
import ApiRefWebpayMallStatusClient from "./ApiRefWebpayMallStatus";
import ApiRefWebpayMallRefund from "./ApiRefWebpayMallRefund";

export default function ApiRefWebpayMall() {
  return (
    <div className="tbk-layout-body">
      <Sidebar actualPath="/api-reference/webpay-mall" />
      <div className="tbk-layout-content api-ref">
        <h2>Obtener estado de una transacción</h2>
        <p>
          Esta operación permite obtener el estado de la transacción en
          cualquier momento. En condiciones normales es probable que no se
          requiera ejecutar, pero en caso de ocurrir un error inesperado permite
          conocer el estado y tomar las acciones que correspondan.
        </p>
        <p className="mt-2">
          Puedes revisar más detalles de esta operación en su{" "}
          <a
            className="tbk-link"
            href="https://www.transbankdevelopers.cl/documentacion/webpay-plus#obtener-estado-de-una-transaccion-mall"
            target="_blank"
          >
            documentación
          </a>{" "}
        </p>
        <ApiRefWebpayMallStatusClient />

        <Collapse label="Respuesta Transaction.status">
          <Table columns={getColumnDefinition()} rows={webpayPlusMallStatus} />
        </Collapse>

        <h2>Reversar o Anular un pago</h2>
        <p>
          Las transacciones de Webpay se pueden anular o reversar dadas algunas
          condiciones. Para cualquiera de éstas operaciones se utiliza el mismo
          servicio web que discernirá si se realizará una reversa o una
          anulación. para mas informacion sobre anulaciones a reversa visite la{" "}
          <a
            href="https://www.transbankdevelopers.cl/producto/webpay#anulaciones-y-reversas"
            target="_blank"
            className="tbk-link"
          >
            documentacion
          </a>
        </p>
        <ApiRefWebpayMallRefund />
        <Collapse label="Respuesta Transaction.refund">
          <Table columns={getColumnDefinition()} rows={webpayPlusMallRefund} />
        </Collapse>
      </div>
    </div>
  );
}
