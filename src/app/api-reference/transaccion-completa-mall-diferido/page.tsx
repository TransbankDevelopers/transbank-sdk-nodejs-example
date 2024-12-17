"use client";
import Sidebar from "@/components/sidebar/Sidebar";
import Collapse from "@/components/collapse/Collapse";
import { Table } from "@/components/table/Table";
import { getColumnDefinition } from "@/helpers/transactions/transactionHelper";
import {
  txCompleteMallRefund,
  txCompleteMallStatus,
  txCompleteMallCapture,
} from "@/helpers/transactions/txComplete/apiResponse";
import ApiRefTxCompletedMallStatus from "./ApiRefTxCompletedMallStatus";
import ApiRefTxCompleteMallRefund from "./ApiRefTxCompleteMallRefund";
import ApiRefTxMallDeferredCapture from "./ApiRefTxMallDeferredCapture";

export default function ApiRefWebpayMall() {
  return (
    <div className="tbk-layout-body">
      <Sidebar />
      <div className="tbk-layout-content api-ref">
        <h2>Requisitos Previos:</h2>
        <p className="mb-4">
          Para realizar cualquier operación en esta sección, es necesario contar
          con el token que obtienes al crear la transacción. Si aún no dispones
          del token puedes obtenerlo siguiendo las instrucciones detalladas en
          la sección{" "}
          <a className="tbk-link" href="/transaccion-completa-mall-diferido">
            Flujo Completo.
          </a>
        </p>

        <h2 id="api-status">Obtener estado de una transacción</h2>
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
        <ApiRefTxCompletedMallStatus />

        <Collapse label="Respuesta Transaction.status">
          <Table columns={getColumnDefinition()} rows={txCompleteMallStatus} />
        </Collapse>

        <h2 id="api-capture">Capturar una transacción</h2>
        <p>
          Permite solicitar a Webpay la captura diferida de una transacción con
          autorización y sin captura simultánea. Puedes revisar más detalles de
          esta operación en su{" "}
          <a
            className="tbk-link"
            target="_blank"
            href="https://www.transbankdevelopers.cl/producto/webpay#autorizacion-y-captura"
          >
            documentación
          </a>
        </p>
        <ApiRefTxMallDeferredCapture />

        <Collapse label="Respuesta Transaction.capture">
          <Table columns={getColumnDefinition()} rows={txCompleteMallCapture} />
        </Collapse>

        <h2 id="api-refund">Reversar o Anular un pago</h2>
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
        <ApiRefTxCompleteMallRefund />
        <Collapse label="Respuesta Transaction.refund">
          <Table columns={getColumnDefinition()} rows={txCompleteMallRefund} />
        </Collapse>
      </div>
    </div>
  );
}
