import { useEffect, useState } from "react";
import {
  getListTodos,
  getMyProfile,
  getReplies,
  useDeleteReplies,
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

  const [state, setState] = useState({
    replies: "",
  });

  const [selectIdComment, setSelectedIdComment] = useState(null);
  const [selectedReplies, setSelectedReplies] = useState(null);
  const [showDropdown, setShowDropDown] = useState(false);
  const [typePost, seStypePost] = useState("all");
  const [modal, setModal] = useState(false);

  const closeModal = () => {
    setModal(!modal);
    getDataRepliesReset();
    setSelectedIdComment(null);
    setSelectedReplies(null);
    setState({ replies: "" });
  };

  const getData = async (type) => {
    seStypePost(type || "all");
    await getAllData(`${API_URL}/posts?type=${type}`);
  };

  const getAllDataReplies = async (id) => {
    setModal(true); //pikirin nanti logicnya biar tidak tabrakan
    setSelectedIdComment(id);
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

  const onPressLikeOrUnlike = async (type, id) => {
    if (type === "unlike") {
      await postDataLike(`${API_URL}/likes/post/${id}`);
    } else {
      await postDataLike(`${API_URL}/unlikes/post/${id}`);
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
  };
};
