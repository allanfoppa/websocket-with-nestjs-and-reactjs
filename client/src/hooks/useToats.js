import { useToast } from "@chakra-ui/react";
import { useState, useEffect } from "react";

export const useToastHook = () => {
  const [state, setState] = useState(undefined);
  const toast = useToast();

  useEffect(() => {
    if (state) {
      const { message, status } = state;

      toast({
        title: status,
        description: message,
        status: status,
        duration: 6000,
        position: "top-right",
        isClosable: true,
      });
    }
  }, [state, toast]);

  return [state, setState];
}
