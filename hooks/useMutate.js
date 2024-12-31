import { useSendServiceLogin } from "./useServiceLogin";
import { useSendServiceRegister } from "./useServiceRegister";
import {
  useDeleteServiceTodos,
  useGetServiceTodos,
  usePostServiceTodos,
} from "./useServiceTodo";

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
    getData: (path, type) => service(path, type),
    getResetData: reset,
  };
};

export const getMyProfile = () => {
  const { reset, service, state } = useGetServiceTodos();

  return { state, getData: (path) => service(path) };
};

export const getReplies = () => {
  const { reset, service, state } = useGetServiceTodos();

  return { state, getData: (path) => service(path), reset };
};

export const usePostReplies = () => {
  const { reset, service, state } = usePostServiceTodos();

  return { state, postData: (path, payload) => service(path, payload), reset };
};

export const useDeleteReplies = () => {
  const { reset, service, state } = useDeleteServiceTodos();

  return { state, deleteData: (path) => service(path), reset };
};

export const usePostLike = () => {
  const { reset, service, state } = usePostServiceTodos();

  return { state, postData: (path, payload) => service(path, payload), reset };
};

export const usePost = () => {
  const { reset, service, state } = usePostServiceTodos();

  return { state, postData: (path, payload, method) => service(path, payload, method), reset };
};

export const useDeletePost = () => {
  const { reset, service, state } = useDeleteServiceTodos();

  return {
    state,
    deleteData: (path) => service(path),
    reset,
  };
};

export const useGetDetailPost = () => {
  const { reset, service, state } = useGetServiceTodos();

  return { state, getData: (path) => service(path), reset };
};
