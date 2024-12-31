import { useState } from "react";
import { INITIAL_STATE } from "./useServiceLogin";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

export const useGetServiceTodos = () => {
  const [state, setState] = useState({ ...INITIAL_STATE, isSuccess: false });

  const service = async (path, type) => {
    try {
      const token = Cookies.get("user_token");
      setState((prevState) => ({
        ...prevState,
        isLoading: true,
        isSuccess: false,
      }));
      const response = await fetch(path, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      const { success, message, data } = result;
      if (!success) {
        toast.error(message);
        setState((prevState) => ({
          ...prevState,
          isLoading: false,
          message: message,
          isSuccess: false,
        }));
      } else {
        toast.success(message, { duration: 3000 });
        setState((prevState) => ({
          ...prevState,
          isLoading: false,
          data,
          message: message,
          isSuccess: true,
        }));
      }
    } catch (error) {
      toast.error(error);
      setState((prevState) => ({
        ...prevState,
        isLoading: false,
        message: error,
        isSuccess: false,
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

export const usePostServiceTodos = () => {
  const [state, setState] = useState({ ...INITIAL_STATE, isSuccess: false });

  const service = async (path, payload, method = "POST") => {
    try {
      const token = Cookies.get("user_token");
      setState((prevState) => ({
        ...prevState,
        isLoading: true,
        isSuccess: false,
      }));
      const response = await fetch(path, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      const { success, message, data } = result;
      if (!success) {
        toast.error(message);
        setState((prevState) => ({
          ...prevState,
          isLoading: false,
          message: message,
          isSuccess: false,
        }));
      } else {
        toast.success(message, { duration: 3000 });
        setState((prevState) => ({
          ...prevState,
          isLoading: false,
          data,
          message: message,
          isSuccess: true,
        }));
      }
    } catch (error) {
      toast.error(error);
      setState((prevState) => ({
        ...prevState,
        isLoading: false,
        message: error,
        isSuccess: false,
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

export const useDeleteServiceTodos = () => {
  const [state, setState] = useState({ ...INITIAL_STATE, isSuccess: false });

  const service = async (path) => {
    try {
      const token = Cookies.get("user_token");
      setState((prevState) => ({
        ...prevState,
        isLoading: true,
        isSuccess: false,
      }));
      const response = await fetch(path, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      const { success, message, data } = result;
      if (!success) {
        toast.error(message);
        setState((prevState) => ({
          ...prevState,
          isLoading: false,
          message: message,
          isSuccess: false,
        }));
      } else {
        toast.success(message, { duration: 3000 });
        setState((prevState) => ({
          ...prevState,
          isLoading: false,
          data,
          message: message,
          isSuccess: true,
        }));
      }
    } catch (error) {
      toast.error(error);
      setState((prevState) => ({
        ...prevState,
        isLoading: false,
        message: error,
        isSuccess: false,
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
