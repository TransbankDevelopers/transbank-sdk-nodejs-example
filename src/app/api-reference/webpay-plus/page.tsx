"use client";
import Sidebar from "@/components/sidebar/Sidebar";
import Collapse from "@/components/collapse/Collapse";
import { Table } from "@/components/table/Table";
import { getColumnDefinition } from "@/helpers/transactions/transactionHelper";
import {
  webpayPlusStatus,
  webpayPlusRefund,
} from "@/helpers/transactions/webpay/apiResponse";
import ApiRefWebpayStatusClient from "./ApiRefWebpayStatus";
import ApiRefWebpayRefund from "./ApiRefWebpayRefund";

export default function ApiRefWebpay() {
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
          <a className="tbk-link" href="/webpay-plus">
            Flujo Completo.
          </a>
        </p>
        <h2 id="api-status">Obtener estado de una transacción</h2>
        <p>
          En condiciones normales es probable que no se
          requiera ejecutar, pero en caso de ocurrir un error inesperado permite
          conocer el estado y tomar las acciones que correspondan. La consulta
          de estado se puede realizar hasta 7 días desde la creación de la
          transacción.
        </p>
        <ApiRefWebpayStatusClient />

        <Collapse label="Respuesta Transaction.status">
          <Table columns={getColumnDefinition()} rows={webpayPlusStatus} />
        </Collapse>

        <h2 id="api-refund">Reversar o Anular un pago</h2>
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
        <ApiRefWebpayRefund />
        <Collapse label="Respuesta Transaction.refund">
          <Table columns={getColumnDefinition()} rows={webpayPlusRefund} />
        </Collapse>
      </div>
    </div>
  );
}
