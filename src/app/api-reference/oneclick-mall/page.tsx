"use client";
import Sidebar from "@/components/sidebar/Sidebar";
import Collapse from "@/components/collapse/Collapse";
import { Table } from "@/components/table/Table";
import { getColumnDefinition } from "@/helpers/transactions/transactionHelper";
import {
  OneClickMallAuthorize,
  OneClickMallStatus,
  OneClickMallRefund,
} from "@/helpers/transactions/oneclick/apiResponse";
import ApiRefOneclickStatus from "./ApiRefOneclickStatus";
import ApiRefOneclickRefund from "./ApiRefOneclickRefund";
import ApiRefOneclickAuthorize from "./ApiRefOneclickAuthorize";

export default function ApiRefOneclickMall() {
  return (
    <div className="tbk-layout-body">
      <Sidebar />
      <div className="tbk-layout-content api-ref">
        <h2>Requisitos Previos:</h2>
        <p className="mb-6">
          Para realizar cualquier operación en esta sección, es necesario contar
          con el username y tbk_user que obtienes al crear la inscripción. Si
          aún no dispones de estos datos, puedes obtenerlos siguiendo las
          instrucciones detalladas en la sección{" "}
          <a className="tbk-link" href="/oneclick-mall">
            Flujo Completo.
          </a>
        </p>
        <h2 id="api-authorize">Autorizar una transacción</h2>
        <p>
          Una vez realizada la inscripción, el comercio puede usar el tbkUser
          recibido para realizar transacciones. Para eso debes usar el método
          transaction.authorize(). Puedes revisar más detalles de esta operación
          en su{" "}
          <a
            className="tbk-link"
            target="_blank"
            href="https://www.transbankdevelopers.cl/documentacion/oneclick#autorizar-una-transaccion"
          >
            documentación
          </a>{" "}
        </p>

        <ApiRefOneclickAuthorize />

        <Collapse label="Respuesta Transaction.authorize">
          <Table columns={getColumnDefinition()} rows={OneClickMallAuthorize} />
        </Collapse>

        <h2 className="mt-8" id="api-status">
          Obtener estado de una transacción
        </h2>
        <p>
          Permite consultar el estado de pago realizado a través de Oneclick.
          Retorna el resultado de la autorización.
        </p>
        <p>
          Puedes revisar más detalles de esta operación en su{" "}
          <a
            className="tbk-link"
            target="_blank"
            href="https://www.transbankdevelopers.cl/documentacion/oneclick#obtener-estado-de-una-transaccion"
          >
            documentación
          </a>{" "}
        </p>
        <ApiRefOneclickStatus />

        <Collapse label="Respuesta Transaction.status">
          <Table columns={getColumnDefinition()} rows={OneClickMallStatus} />
        </Collapse>

        <h2 className="mt-8" id="api-refund">
          Reversar o anular una transacción
        </h2>
        <p>
          Esta operación permite a todo comercio habilitado, reversar o anular
          una transacción que fue generada en Oneclick.
        </p>
        <p>
          Puedes revisar más detalles de esta operación en su{" "}
          <a
            className="tbk-link"
            href="https://www.transbankdevelopers.cl/documentacion/oneclick#reversar-o-anular-una-transaccion"
            target="_blank"
          >
            documentación
          </a>{" "}
        </p>
        <ApiRefOneclickRefund />

        <Collapse label="Respuesta Transaction.refund">
          <Table columns={getColumnDefinition()} rows={OneClickMallRefund} />
        </Collapse>
      </div>
    </div>
  );
}
