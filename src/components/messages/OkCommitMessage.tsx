"use client";
import { Text } from "@/components/text/Text";

export const OkCommitMessage = () => {
  return (
    <Text>
      Una vez que la transacción ha sido confirmada Transbank proporcionará la siguiente información. 
      Es fundamental conservar esta respuesta y verificar que el campo &quot;response_code&quot; 
      tenga un valor de cero y que el campo &quot;status&quot; sea &quot;AUTHORIZED&quot;.
    </Text>
  );
};
