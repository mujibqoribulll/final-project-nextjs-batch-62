import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";

export const INITIAL_STATE = {
  data: [],
  isLoading: false,
  message: "",
};

export const useSendServiceLogin = () => {
  const [state, setState] = useState({ ...INITIAL_STATE });
  const route = useRouter();
  const service = async (path, payload, type = "login") => {
    const token = Cookies.get("user_token");
    try {
      let body = type === "login" && { body: JSON.stringify(payload) };
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
            Authorization: `Bearer ${token}`,
          },
          ...body,
        }
      );
      const result = await response.json();
      const { success, message, data } = result;
      if (!success) {
        toast.error(message);
        setState((prevState) => ({
          ...prevState,
          isLoading: false,
        }));
      } else {
        if (type === "login") {
          Cookies.set("user_token", data?.token, {
            expires: new Date(data?.expires_at),
          });
          route.push("/beranda");
        } else {
          Cookies.remove("user_token", { path: "/" });
          route.push("/auth/login");
        }
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
