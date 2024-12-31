import React from "react";
import CardReplies from "../card-replies";
import ButtonText from "../button/button-text";

const ModalPost = (props) => {
  const { isOpen, onClose, onSubmitPost, onChangeText, state, isLoading, name } =
    props;

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
            onSubmit={onSubmitPost}
            className="w-full flex flex-col items-center gap-3 "
          >
            <textarea
              name="replies"
              placeholder={`Whats on your mind, ${name || ''}`}
              value={state?.replies}
              onChange={onChangeText}
              className="w-full border-slate-500/20 font-mono border p-3 rounded-xl leading-8 text-sm  focus:outline-[#6E54B5] focus:outline-2"
            />
            <ButtonText
              label="POST"
              type="submit"
              isLoading={isLoading}
              styleContainer={`${
                state?.replies?.length <= 0 ? "bg-slate-500/20" : "bg-[#6E54B5]"
              }  w-full h-10`}
              styleText="text-lg"
              isDisable={state?.replies?.length <= 0}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalPost;
