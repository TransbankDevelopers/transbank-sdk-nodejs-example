
import { Text } from "@/components/text/Text";

export const OkAuthorizeMessage = () => {
  return (
    <Text>
      Una vez que la transacción ha sido autorizada Transbank proporcionará la siguiente información. 
      Es fundamental conservar esta respuesta y verificar que el campo &quot;response_code&quot; 
      tenga un valor de cero y que el campo &quot;status&quot; sea &quot;AUTHORIZED&quot;.
    </Text>
  );
};
