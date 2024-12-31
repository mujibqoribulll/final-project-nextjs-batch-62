import { useEffect, useState } from "react";
import {
  getListTodos,
  getMyProfile,
  getReplies,
  useDeletePost,
  useDeleteReplies,
  useGetDetailPost,
  usePost,
  usePostLike,
  usePostReplies,
} from "../useMutate";

export const useBerandaFUnction = () => {
  const {
    getData: getAllData,
    getResetData: resetAllData,
    state: stateAllData,
  } = getListTodos();

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const {
    state: stateDataReplies,
    getData: getDataReplies,
    reset: getDataRepliesReset,
  } = getReplies();

  const { state: stateDataProfile, getData: getDataProfile } = getMyProfile();

  const { postData: postDataReplies, state: statePostDataReplies } =
    usePostReplies();

  const { deleteData: deleteDataReplies, state: stateDeleteDataReplies } =
    useDeleteReplies();

  const { postData: postDataLike, state: statePostDataLike } = usePostLike();

  const { postData, state: statePostData } = usePost();

  const { deleteData, state: stateDeleteData } = useDeletePost();

  const { getData: getDataPostDetail, state: getDataStateDetail } =
    useGetDetailPost();

  const [state, setState] = useState({
    replies: "",
  });

  const [selectIdComment, setSelectedIdComment] = useState(null);
  const [selectedReplies, setSelectedReplies] = useState(null);
  const [selectPostId, setSelectPostId] = useState(null);
  const [showDropdown, setShowDropDown] = useState(false);
  const [showDropdownPost, setShowDropDownPost] = useState(false);
  const [typePost, seStypePost] = useState("all");
  const [modal, setModal] = useState(false);
  const [modalPost, setModalPost] = useState(false);
  const [modalConfirmation, setModalConfirmation] = useState(false);
  const [postFrom, setPostFrom] = useState("");

  const openModalPost = (id) => {
    setShowDropDownPost(!showDropdownPost);
    if (showDropdownPost) {
      setSelectPostId(null);
    } else {
      setSelectPostId(id);
    }
  };

  const closeModal = () => {
    setModal(!modal);
    getDataRepliesReset();
    setSelectedIdComment(null);
    setSelectedReplies(null);
    setState({ replies: "" });
  };
  const closeModalConfirmation = () => {
    setModalConfirmation(!modalConfirmation);
  };

  const openModalConfirmation = () => {
    setModalConfirmation(true);
  };

  const closeModalPost = () => {
    setModalPost(!modalPost);
    setState({ replies: "" });
    setSelectPostId(null);
  };

  const openPostModal = (type) => {
    setModalPost(true);
    setShowDropDownPost(false);
    setPostFrom(type);
  };

  const getData = async (type) => {
    seStypePost(type || "all");
    await getAllData(`${API_URL}/posts?type=${type}`);
  };

  const getAllDataReplies = async (id) => {
    setModal(true); //pikirin nanti logicnya biar tidak tabrakan
    setSelectedIdComment(id);
    setShowDropDownPost(false);
    await getDataReplies(`${API_URL}/replies/post/${id}`);
  };

  const actionRefresh = async () => {
    await getAllDataReplies(selectIdComment);
  };

  const onSubmitReplies = async (event) => {
    event.preventDefault();

    if (state && selectIdComment !== null) {
      let payload = {
        description: state?.replies,
      };
      await postDataReplies(
        `${API_URL}/replies/post/${selectIdComment}`,
        payload
      );
      setState({ replies: "" });
    }
  };

  const onSubmitPost = async (event) => {
    event.preventDefault();

    if (state.replies) {
      let payload = {
        description: state?.replies,
      };
      let newPath =
        postFrom === "edit-post"
          ? `${API_URL}/post/update/${selectPostId}`
          : `${API_URL}/post`;
      let newMethod = postFrom === "edit-post" ? "PATCH" : "POST";
      await postData(newPath, payload, newMethod);
      setState({ replies: "" });
      setModalPost(!modalPost);
    }
  };

  useEffect(() => {
    if (statePostDataReplies.isSuccess) {
      actionRefresh();
    }
  }, [statePostDataReplies.isSuccess]);

  useEffect(() => {
    if (stateDeleteDataReplies?.isSuccess) {
      actionRefresh();
    }
  }, [stateDeleteDataReplies?.isSuccess]);

  useEffect(() => {
    if (statePostDataLike.isSuccess) {
      getData(typePost);
    }
  }, [statePostDataLike.isSuccess]);

  useEffect(() => {
    if (statePostData?.isSuccess) {
      getData(typePost);
    }
  }, [statePostData?.isSuccess]);

  useEffect(() => {
    if (stateDeleteData?.isSuccess) {
      getData(typePost);
    }
  }, [stateDeleteData?.isSuccess]);

  const onPressMoreOption = (id) => {
    if (id === selectedReplies) {
      setSelectedReplies(null);
      setShowDropDown(false);
    } else {
      setSelectedReplies(id);
      setShowDropDown(true);
    }
  };

  const onChangeText = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const onDeleteReplies = async () => {
    if (selectedReplies) {
      await deleteDataReplies(`${API_URL}/replies/delete/${selectedReplies}`);
    }
    if (stateDeleteDataReplies?.isSuccess) {
      actionRefresh();
    }
  };

  const getDetailPost = () => {
    getDataPostDetail(`${API_URL}/post/${selectPostId}`);
  };

  useEffect(() => {
    if (selectPostId !== null && postFrom !== "new-post") {
      getDetailPost();
    }
  }, [selectPostId, modalPost]);

  useEffect(() => {
    if (getDataStateDetail.isSuccess && postFrom !== "new-post") {
      setState((prevState) => ({
        ...prevState,
        replies: getDataStateDetail?.data?.description || "",
      }));
    }
  }, [getDataStateDetail.data, postFrom]);

  const onPressLikeOrUnlike = async (type, id) => {
    if (type === "unlike") {
      await postDataLike(`${API_URL}/likes/post/${id}`);
    } else {
      await postDataLike(`${API_URL}/unlikes/post/${id}`);
    }
    setShowDropDownPost(false);
  };

  const onPresDeletePost = () => {
    if (selectPostId !== null) {
      deleteData(`${API_URL}/post/delete/${selectPostId}`);
      setSelectPostId(null);
      closeModalConfirmation();
    }
  };

  return {
    getAllData,
    resetAllData,
    stateAllData,
    getData,
    getDataProfile,
    stateDataProfile,
    API_URL,
    stateDataReplies,
    getAllDataReplies,
    modal,
    closeModal,
    onSubmitReplies,
    statePostDataReplies,
    onChangeText,
    state,
    showDropdown,
    selectedReplies,
    onPressMoreOption,
    setShowDropDown,
    stateDeleteDataReplies,
    onDeleteReplies,
    onPressLikeOrUnlike,
    setModal,
    modalPost,
    setModalPost,
    closeModalPost,
    onSubmitPost,
    showDropdownPost,
    openModalPost,
    selectPostId,
    modalConfirmation,
    closeModalConfirmation,
    openModalConfirmation,
    onPresDeletePost,
    openPostModal,
  };
};
