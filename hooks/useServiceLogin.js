import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";

export const INITIAL_STATE = {
  data: null,
  isLoading: false,
  message: "",
};

export const useSendServiceLogin = () => {
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
      } else {
        Cookies.set("user_token", data?.token, {
          expires: new Date(data?.expires_at),
        });
        route.push("/");
        setState((prevState) => ({
          ...prevState,
          isLoading: false,
          message: message,
        }));
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
