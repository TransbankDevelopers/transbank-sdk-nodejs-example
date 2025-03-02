"use client";
import Sidebar from "@/components/sidebar/Sidebar";
import Collapse from "@/components/collapse/Collapse";
import { Table } from "@/components/table/Table";
import { getColumnDefinition } from "@/helpers/transactions/transactionHelper";
import {
  OneClickMallAuthorize,
  OneClickMallStatus,
  OneClickMallRefund,
  OneClickMallCapture,
} from "@/helpers/transactions/oneclick/apiResponse";
import ApiRefOneclickStatus from "./ApiRefOneclickDeferredStatus";
import ApiRefOneclickRefund from "./ApiRefOneclickDeferredRefund";
import ApiRefOneclickDeferredCapture from "./ApiRefOneclickDeferredCapture";
import ApiRefOneclickDeferredAuthorize from "./ApiRefOneclickDeferredAuthorize";

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
          <a className="tbk-link" href="/oneclick-mall-deferred">
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

        <ApiRefOneclickDeferredAuthorize />

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

        <h2 className="mt-8" id="api-capture">
          Capturar una transacción
        </h2>
        <p>
          En el caso de que tengas contratada la modalidad de Captura diferida,
          necesitas llamar al método capture después de llamar a authorize para
          finalizar la transacción. Revisa más detalles sobre esta modalidad en
          la{" "}
          <a
            className="tbk-link"
            target="_blank"
            href="https://www.transbankdevelopers.cl/documentacion/oneclick#capturar-una-transaccion"
          >
            documentación
          </a>
        </p>
        <ApiRefOneclickDeferredCapture />

        <Collapse label="Respuesta Transaction.capture">
          <Table columns={getColumnDefinition()} rows={OneClickMallCapture} />
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
