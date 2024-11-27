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
      <Sidebar actualPath="/api-reference/oneclick-mall" />
      <div className="tbk-layout-content api-ref">
        <h2>Autorizar una transacción</h2>
        <p>
          Una vez realizada la inscripción, el comercio puede usar el tbkUser
          recibido para realizar transacciones. Para eso debes usar el método
          transaction.authorize(). Puedes revisar más detalles de esta operación
          en su{" "}
          <a
            className="tbk-link"
            target="_blanck"
            href="https://www.transbankdevelopers.cl/documentacion/oneclick#autorizar-una-transaccion"
          >
            documentación
          </a>{" "}
        </p>

        <ApiRefOneclickAuthorize />

        <Collapse label="Respuesta Transaction.authorize">
          <Table columns={getColumnDefinition()} rows={OneClickMallAuthorize} />
        </Collapse>

        <h2 className="mt-8">Obtener estado de una transacción</h2>
        <p>
          Permite consultar el estado de pago realizado a través de Oneclick.
          Retorna el resultado de la autorización.
        </p>
        <p>
          Puedes revisar más detalles de esta operación en su{" "}
          <a
            className="tbk-link"
            target="_blanck"
            href="https://www.transbankdevelopers.cl/documentacion/oneclick#obtener-estado-de-una-transaccion"
          >
            documentación
          </a>{" "}
        </p>
        <ApiRefOneclickStatus />

        <Collapse label="Respuesta Transaction.status">
          <Table columns={getColumnDefinition()} rows={OneClickMallStatus} />
        </Collapse>

        <h2 className="mt-8">Reversar o anular una transacción</h2>
        <p>
          Esta operación permite a todo comercio habilitado, reversar o anular
          una transacción que fue generada en Oneclick.
        </p>
        <p>
          Puedes revisar más detalles de esta operación en su{" "}
          <a
            className="tbk-link"
            href="https://www.transbankdevelopers.cl/documentacion/oneclick#reversar-o-anular-una-transaccion"
            target="_blanck"
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
