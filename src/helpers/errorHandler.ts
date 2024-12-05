export const getErrorMessage = (exception: unknown): string => {
    const defaultMessage= "Ocurrió un error inesperado al intentar realizar la operación";
    
    if (exception instanceof Error) {
      return exception?.message ?? defaultMessage;
    }  
    
    return defaultMessage;
  };
