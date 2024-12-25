import { useSendServiceLogin } from "./useServiceLogin";
import { useSendServiceRegister } from "./useServiceRegister";

export const usePostLogin = () => {
  const { state, service, reset } = useSendServiceLogin();

  return {
    state,
    postData: (path, payload) => service(path, payload),
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
