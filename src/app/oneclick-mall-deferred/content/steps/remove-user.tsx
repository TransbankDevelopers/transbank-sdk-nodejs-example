import { StepProps } from "@/components/step/Step";
import * as removeUserSnippets from "@/app/oneclick-mall-deferred/content/snippets/remove-user";
import { Text, TextVariant } from "@/components/text/Text";

export const getRemoveUserSteps = (
  tbkUser: string,
  userName: string
): StepProps[] => {
  return [
    {
      stepTitle: "Paso 1: Datos recibidos",
      stepId: "peticion",
      content: (
        <Text>
          Para llevar a cabo la eliminación, necesitas el &quot;userName&quot;
          (Nombre de Usuario) y el &quot;tbkUser&quot;. Realiza la llamada a
          Oneclick.MallInscription utilizando el siguiente código:
        </Text>
      ),
      code: removeUserSnippets.getStepOne(tbkUser, userName),
    },
    {
      stepTitle: "Paso 2: Respuesta",
      content: (
        <div className="flex-col flex-gap-6">
          <Text variant={TextVariant.PARAGRAPH}>
            En caso de éxito, Transbank responderá con un status code 204 (No
            Content), y el SDK no retornará ninguna respuesta adicional. La
            eliminación de la inscripción se ha realizado de manera exitosa.
          </Text>

          <Text variant={TextVariant.PARAGRAPH}>
            En el caso de que no se encuentre el &quot;userName&quot; o el
            &quot;tbkUser&quot;, Transbank responderá con un status code 404
            (Not Found), y el SDK retornará una excepción para informar sobre la
            situación.
          </Text>

          <Text variant={TextVariant.PARAGRAPH}>
            Este proceso garantiza una eliminación segura y eficiente de la
            inscripción del usuario y su medio de pago asociado. ¡Gracias por
            confiar en Transbank para tus operaciones seguras! Si tienes alguna
            pregunta, estamos aquí para ayudarte.
          </Text>
        </div>
      ),
    },
  ];
};
