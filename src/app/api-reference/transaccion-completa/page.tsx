"use client";
import Sidebar from "@/components/sidebar/Sidebar";
import Collapse from "@/components/collapse/Collapse";
import { Table } from "@/components/table/Table";
import { getColumnDefinition } from "@/helpers/transactions/transactionHelper";
import {
  txCompleteStatus,
  txCompleteRefund,
} from "@/helpers/transactions/txComplete/apiResponse";
import ApiRefTxCompletedStatus from "./ApiRefTxCompletedStatus";
import ApiRefTxCompleteRefund from "./ApiRefTxCompleteRefund";

export default function ApiRefWebpay() {
  return (
    <div className="tbk-layout-body">
      <Sidebar actualPath="/api-reference/transaccion-completa" />
      <div className="tbk-layout-content api-ref">
        <h2>Obtener estado de una transacción</h2>
        <p>
          Esta operación permite obtener el estado de la transacción en
          cualquier momento. En condiciones normales es probable que no se
          requiera ejecutar, pero en caso de ocurrir un error inesperado permite
          conocer el estado y tomar las acciones que correspondan.
        </p>
        <ApiRefTxCompletedStatus />

        <Collapse label="Respuesta Transaction.status">
          <Table columns={getColumnDefinition()} rows={txCompleteStatus} />
        </Collapse>

        <h2>Reversar o Anular un pago</h2>
        <p>
          Las transacciones de Webpay se pueden anular o reversar dadas algunas
          condiciones. Para cualquiera de éstas operaciones se utiliza el mismo
          servicio web que discernirá si se realizará una reversa o una
          anulación. para mas informacion sobre anulaciones a reversa visite{" "}
          <a
            href="https://www.transbankdevelopers.cl/producto/webpay#anulaciones-y-reversas"
            target="_blank"
            className="tbk-link"
          >
            aqui
          </a>
        </p>
        <ApiRefTxCompleteRefund />
        <Collapse label="Respuesta Transaction.refund">
          <Table columns={getColumnDefinition()} rows={txCompleteRefund} />
        </Collapse>
      </div>
    </div>
  );
}
