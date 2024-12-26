import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { usePostLogin, usePostLogout, usePostRegister } from "../useMutate";
import { useRouter } from "next/router";
import { useSendServiceLogin } from "../useServiceLogin";

export const INITIAL_STATE = {
  lastname: "",
  firstname: "",
  terms: false,
  email: "",
  password: "",
};

export const useAuthFunction = () => {
  const route = useRouter();
  const [state, setState] = useState({ ...INITIAL_STATE });
  const { postData: postDataLogin, state: dataLogin } = usePostLogin();
  const { postData: postDataRegister, state: dataRegister } = usePostRegister();
  const { postData: postDataLogout, state: dataLogout } = usePostLogout();

  const handleChange = (event) => {
    const { name, value, type } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? !prevState.terms : value,
    }));
  };

  const [selectImage, setSelectImage] = useState(0);
  const images = [
    {
      src: "/images/image-1.jpg", // Path gambar
      alt: "Beautiful desert landscape",
      caption: "Capturing Moments, Creating Memories",
    },
    {
      src: "/images/image-2.jpg",
      alt: "Mountain view at sunset",
      caption: "Explore Nature's Wonders",
    },
    {
      src: "/images/image-3.jpg",
      alt: "Starry night sky",
      caption: "Dream Big, Shine Bright",
    },
  ];
  const setImage = (event) => {
    setSelectImage(event);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    let payload = {
      name: state?.firstname,
      email: state?.email,
      password: state.password,
    };
    await postDataRegister("/register", payload);
  };

  const onSubmitLogin = async (event) => {
    event.preventDefault();
    let payload = {
      email: state?.email,
      password: state.password,
    };
    let response = await postDataLogin("/login", payload);
  };

  const loginOauth = () => {
    toast(
      "Tombol ini belum berfungsi. Aplikasi masih dalam tahap pengembangan. Silakan klik tombol 'Create Account' atau 'Login' secara manual!",
      {
        duration: 6000,
      }
    );
  };

  const onSubmitLogout = async () => {
    await postDataLogout("/logout", null, "logout");
  };

  return {
    state,
    images,
    selectImage,
    dataLogin,
    dataRegister,
    dataLogout,
    function: {
      setImage,
      setSelectImage,
      handleChange,
      onSubmit,
      loginOauth,
      onSubmitLogin,
      onSubmitLogout,
    },
  };
};
