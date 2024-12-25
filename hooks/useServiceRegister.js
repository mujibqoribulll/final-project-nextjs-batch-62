import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
import { INITIAL_STATE } from "./useServiceLogin";

export const useSendServiceRegister = () => {
  const [state, setState] = useState({ ...INITIAL_STATE });
  const route = useRouter();
  const service = async (path, payload) => {
    try {
      setState((prevState) => ({
        ...prevState,
        isLoading: true,
      }));
      const response = await fetch(
        `https://service.pace-unv.cloud/api${path}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      const result = await response.json();
      const { success, message, data } = result;
      if (!success) {
        toast.error(message);
        setState((prevState) => ({
          ...prevState,
          isLoading: false,
          message: message,
        }));
      } else {
        route.push("/auth/login");
      }
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        isLoading: false,
        message: error,
      }));
    }
  };

  const reset = () => {
    setState(() => ({
      ...INITIAL_STATE,
    }));
  };

  return { state, service, reset };
};
