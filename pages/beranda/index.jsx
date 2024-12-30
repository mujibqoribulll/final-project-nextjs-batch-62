import Card from "@/components/card";
import Modal from "@/components/modal";
import Navigation from "@/components/navigation";
import { useBerandaFUnction } from "@/hooks/beranda";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { RiMenuUnfold2Line } from "react-icons/ri";
const LayoutComponents = dynamic(() => import("@/components/layout"), {
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
  } = useBerandaFUnction();
  
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

  return (
    <LayoutComponents metaTitle="Beranda">
      <div className="lg:flex flex-row justify-center gap-x-3  px-3">
        <div className="bg-white lg:rounded-lg h-fit lg:max-w-96 mb-3 lg:mb-0 pb-3 sticky top-3">
          <div className=" flex flex-col items-center gap-x-3 relative">
            <div className="bg-gray-900/50 w-full h-12 absolute inset-0 lg:rounded-t-lg" />
            <div className="bg-[#6E54B5] w-[50px] h-[50px] rounded-full p-8 z-10 mt-3" />
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
          <div className="lg:hidden">
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
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-y-3 lg:min-w-[50rem] ">
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
                />
              ))
            )
          ) : (
            <div className="flex justify-center items-center ">
              <h2 className="text-2xl font-mono font-bold">No Post!</h2>
            </div>
          )}
        </div>
        <Navigation />
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
    </LayoutComponents>
  );
};

export default Beranda;
