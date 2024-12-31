import Card from "@/components/card";
import ModalConfirmation from "@/components/modal-confirmation";
import Navigation from "@/components/navigation";
import { useAuthFunction } from "@/hooks/auth";
import { useBerandaFUnction } from "@/hooks/beranda";
import dynamic from "next/dynamic";
import { useEffect, useMemo } from "react";
import { RiMenuUnfold2Line } from "react-icons/ri";
const LayoutComponents = dynamic(() => import("@/components/layout"), {
  ssr: false,
});

const FormPost = dynamic(() => import("@/components/form-post"), {
  ssr: false,
});
const ModalPost = dynamic(() => import("@/components/modal-post"), {
  ssr: false,
});

const Modal = dynamic(() => import("@/components/modal"), {
  ssr: false,
});

const Beranda = () => {
  const {
    stateAllData,
    getAllData,
    getData,
    getDataProfile,
    stateDataProfile,
    API_URL,
    getAllDataReplies,
    stateDataReplies,
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
    setModalPost,
    modalPost,
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
    stateDataNotifications,
    showNotif,
    getNotificationsData,
    closeModalLogout,
    modalLogout,
    openModalLogin,
  } = useBerandaFUnction();

  const {
    function: { onSubmitLogout },
  } = useAuthFunction();

  let newDate = new Date(stateDataProfile?.data?.created_at);

  const onGetTodos = async () => {
    await getAllData(`${API_URL}/posts?type=all`);
  };

  const onGetProfile = async () => {
    await getDataProfile(`${API_URL}/user/me`);
  };

  const onFetch = () => {
    onGetProfile();
    onGetTodos();
  };
  useEffect(() => {
    onFetch();
  }, []);

  const trimName = (name) => {
    let newName = name;
    let result = newName?.split(" ")?.map((item) => item[0]);
    return result;
  };

  const resultName = useMemo(
    () => trimName(stateDataProfile?.data?.name),
    [stateDataProfile?.data?.name]
  );

  return (
    <LayoutComponents metaTitle="Beranda">
      <div className="lg:flex flex-row justify-center gap-x-3  px-3">
        <div className="bg-white lg:rounded-lg h-fit lg:max-w-96 w-full mb-3 lg:mb-0 pb-3 sticky top-3 z-10">
          <div className=" flex flex-col items-center gap-x-3 relative">
            <div className="bg-gray-900/50 w-full h-12 absolute inset-0 lg:rounded-t-lg" />
            <div className="bg-[#6E54B5] w-[50px] h-[50px] rounded-full p-8 z-10 mt-3 flex justify-center items-center">
              <h3 className="text-2xl text-white font-mono">{resultName}</h3>
            </div>
            <h2 className="font-mono font-bold text-xl line-clamp-1 px-5">
              {stateDataProfile?.data?.name || "Jhon Doe"}
            </h2>
          </div>
          <div className="px-3">
            <h3 className="text-sm font-mono text-center pt-3">
              {stateDataProfile?.data?.email || "jhonedoe.gmail.com"}
            </h3>
            <p className="text-sm font-mono text-center pt-3">
              Joined since {newDate.toLocaleDateString() || "-"}
            </p>
          </div>
          <div className="">
            <ul className="flex flex-row justify-center items-center gap-x-3 text-sm font-mono mt-3">
              <li className="cursor-pointer">
                <button
                  className="text-[#6E54B5] font-bold underline"
                  onClick={() => getData("me")}
                >
                  My Post
                </button>
              </li>
              <li className=" cursor-pointer">
                <button
                  className="text-[#6E54B5] font-bold underline"
                  onClick={() => getData("all")}
                >
                  All Post
                </button>
              </li>
              <li className=" cursor-pointer relative">
                <button
                  className="text-[#6E54B5] font-bold underline"
                  onClick={getNotificationsData}
                >
                  Notifications
                </button>
                {showNotif && (
                  <div className="bg-[#6E54B5] bg-opacity-50 rounded-xl max-w-[500px] left-20 w-full fixed z-50 felx justify-center items-center ">
                    <div className="max-w-screen-2xl overflow-y-auto max-h-[50rem]">
                      {stateDataNotifications?.data?.map((item, index) => {
                        let newDate = new Date(item?.posts?.created_at);
                        return (
                          <div key={index}>
                            <div className=" my-3 flex justify-start items-center gap-x-3 px-5">
                              <div className="bg-[#6E54B5] w-[20px] h-[20px] rounded-full p-3 z-10 flex justify-center items-center">
                                <h3 className="text-xs text-white font-mono">
                                  {resultName}
                                </h3>
                              </div>
                              <div className="">
                                <h3 className="text-xs font-semibold font-mono">
                                  {item?.posts?.user?.name}
                                </h3>
                                <div className="flex justify-center items-center">
                                  <p className="text-xs font-semibold font-mono">
                                    {item?.remark}
                                  </p>
                                  <p className="text-xs font-semibold font-mono">
                                    {newDate?.toLocaleTimeString()}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </li>
              <li className=" cursor-pointer">
                <button
                  className="text-[#6E54B5] font-bold underline"
                  onClick={openModalLogin}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-y-3 lg:min-w-[50rem] ">
          <div className="bg-white flex justify-center items-center   py-5 px-3 gap-x-3 sticky top-[240px] lg:top-3 lg:rounded-lg ">
            <div className="bg-[#6E54B5] w-[50px] h-[50px] rounded-full flex justify-center items-center">
              <h3 className="text-white text-lg font-mono">{resultName}</h3>
            </div>
            <FormPost
              onPress={() => openPostModal("new-post")}
              name={stateDataProfile?.data?.name}
            />
          </div>
          {stateAllData?.data?.length > 0 ? (
            stateAllData?.isLoading ? (
              <div className="flex flex-row  justify-center">
                <div className=" border-8 border-[#6E54B5] border-x-white h-20 w-20 rounded-full animate-spin ease-in-out duration-1000" />
              </div>
            ) : (
              stateAllData?.data?.map((item, index) => (
                <Card
                  icon={<RiMenuUnfold2Line size={20} />}
                  key={index}
                  data={item}
                  onPressReplies={getAllDataReplies}
                  dataReplies={stateDataReplies}
                  onPressLikeOrUnlike={onPressLikeOrUnlike}
                  nameProfile={resultName}
                  showDropdownPost={showDropdownPost}
                  openModalPost={openModalPost}
                  selectPostId={selectPostId}
                  openModalConfirmation={openModalConfirmation}
                  setModalPost={setModalPost}
                  openPostModal={openPostModal}
                />
              ))
            )
          ) : (
            <div className="flex justify-center items-center ">
              <h2 className="text-2xl font-mono font-bold">No Post!</h2>
            </div>
          )}
        </div>
        {/* <Navigation /> */}
      </div>
      <Modal
        onSubmitReplies={onSubmitReplies}
        dataReplies={stateDataReplies}
        isOpen={modal}
        onClose={closeModal}
        onChangeText={onChangeText}
        state={state}
        isLoading={statePostDataReplies?.isLoading}
        showDropdown={showDropdown}
        selectedReplies={selectedReplies}
        onPressMoreOption={onPressMoreOption}
        setShowDropDown={setShowDropDown}
        onDeleteReplies={onDeleteReplies}
        stateDeleteDataReplies={stateDeleteDataReplies}
      />
      <ModalPost
        isOpen={modalPost}
        state={state}
        name={stateDataProfile?.data?.name}
        onClose={closeModalPost}
        onChangeText={onChangeText}
        onSubmitPost={onSubmitPost}
      />
      <ModalConfirmation
        isOpen={modalConfirmation}
        label="Are you seure ?"
        onClose={closeModalConfirmation}
        onPressYes={onPresDeletePost}
      />
      <ModalConfirmation
        isOpen={modalLogout}
        label="Log Out ?"
        onClose={closeModalLogout}
        onPressYes={onSubmitLogout}
      />
    </LayoutComponents>
  );
};

export default Beranda;
