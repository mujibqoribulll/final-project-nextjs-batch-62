import React from "react";
import CardReplies from "../card-replies";
import ButtonText from "../button/button-text";

const Modal = (props) => {
  const {
    dataReplies,
    isOpen,
    onClose,
    onSubmitReplies,
    onChangeText,
    state,
    isLoading,
    showDropdown,
    selectedReplies,
    onPressMoreOption,
    setShowDropDown,
    onDeleteReplies,
    stateDeleteDataReplies,
  } = props;

  if (!isOpen) {
    document.body.classList.remove("overflow-hidden");
    return null;
  } else {
    document.body.classList.add("overflow-hidden");
  }

  return (
    <div
      className="bg-black bg-opacity-50 fixed inset-0 flex flex-row justify-center items-center z-10"
      onClick={onClose}
    >
      <div
        className="max-w-screen-lg w-full bg-white relative rounded-lg mx-3 p-5 max-h-[50rem] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mt-3">
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            onClick={onClose}
          >
            x
          </button>
          <form
            action=""
            onSubmit={onSubmitReplies}
            className="w-full flex flex-row items-center gap-3 "
          >
            <textarea
              name="replies"
              placeholder="Write a comments"
              value={state.replies}
              onChange={onChangeText}
              className="w-full border-slate-500/20 border p-3 rounded-xl leading-8 text-sm  focus:outline-[#6E54B5] focus:outline-2"
            />
            <ButtonText
              label="Send"
              type="submit"
              isLoading={isLoading}
              styleContainer={`${
                state?.replies?.length <= 0 ? "bg-slate-500/20" : "bg-[#6E54B5]"
              }  w-20 h-8`}
              styleText="text-xs"
              isDisable={state?.replies?.length <= 0}
            />
          </form>
          {dataReplies?.data?.length > 0 ? (
            dataReplies?.data.map((reply, index) => (
              <CardReplies
                data={reply || []}
                key={index}
                showDropdown={showDropdown}
                selectedReplies={selectedReplies}
                onPressMoreOption={onPressMoreOption}
                setShowDropDown={setShowDropDown}
                onDeleteReplies={onDeleteReplies}
                stateDeleteDataReplies={stateDeleteDataReplies}
              />
            ))
          ) : (
            <div className="flex items-center my-4 text-gray-400">
              <div className="flex-grow border-t border-slate-500/20"></div>
              <span className="mx-4 font-mono text-xs">No Comments</span>
              <div className="flex-grow border-t border-slate-500/20"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
