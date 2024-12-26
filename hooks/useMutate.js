import { useSendServiceLogin } from "./useServiceLogin";
import { useSendServiceRegister } from "./useServiceRegister";
import { useGetServiceTodos } from "./useServiceTodo";

export const usePostLogin = () => {
  const { state, service, reset } = useSendServiceLogin();

  return {
    state,
    postData: (path, payload) => service(path, payload),
    postDataReset: reset,
  };
};

export const usePostLogout = () => {
  const { state, service, reset } = useSendServiceLogin();

  return {
    state,
    postData: (path, payload, type) => service(path, payload, type),
    postDataReset: reset,
  };
};

export const usePostRegister = () => {
  const { state, service, reset } = useSendServiceRegister();

  return {
    state,
    postData: (path, payload) => service(path, payload),
    postDataReset: reset,
  };
};

export const getListTodos = () => {
  const { state, service, reset } = useGetServiceTodos();

  return {
    state,
    postData: (path, type) => service(path, type),
    postDataReset: reset,
  };
};
