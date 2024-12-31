import React from "react";
import ButtonText from "../button/button-text";

const ModalConfirmation = (props) => {
  const { isOpen, onClose, onPressYes } = props;

  if (!isOpen) {
    document.body.classList.remove("overflow-hidden");
    return null;
  } else {
    document.body.classList.add("overflow-hidden");
  }
  return (
    <div
      className="flex fixed flex-row justify-center items-center z-20 bg-gray-700 bg-opacity-50 inset-0"
      onClick={onClose}
    >
      <div
        className="max-w-screen-sm bg-white relative rounded-lg mx-3 p-5 max-h-[50rem] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mt-3">
          <h3 className="text-sm font-semibold font-mono text-center">
            Are you seure ?
          </h3>
          <div className=" flex justify-center items-center gap-x-3 mt-3">
            <ButtonText
              styleContainer="bg-[#6E54B5]"
              label="Cancel"
              styleText="text-sm py-1 px-3"
              onPress={onClose}
            />
            <ButtonText
              styleContainer="bg-red-500"
              label="Yes"
              styleText="text-sm py-1 px-3"
              onPress={onPressYes}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmation;
