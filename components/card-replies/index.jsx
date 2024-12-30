import React, { useEffect, useRef } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import ButtonImage from "../button/button-image";
import ButtonText from "../button/button-text";

const CardReplies = (props) => {
  const {
    data,
    showDropdown,
    selectedReplies,
    onPressMoreOption,
    setShowDropDown,
    onDeleteReplies,
    stateDeleteDataReplies,
  } = props;

  let newDate = new Date(data?.created_at);

  return (
    <div className="py-3 flex flex-row gap-x-3 items-center">
      <div className="flex flex-row gap-x-3 bg-slate-500/20 p-5 rounded-xl flex-grow">
        <div>
          <div className="bg-[#6E54B5] w-[20px] h-[20px] rounded-full" />
        </div>
        <div>
          <h3 className="font-mono font-bold text-xs">
            {data?.user?.name || "Unknow"} {newDate?.toLocaleTimeString()}
          </h3>
          <p className="leading-8 text-sm font-mono">{data?.description}</p>
        </div>
      </div>
      <div className="relative inline-block text-left ">
        <ButtonImage
          icon={<FiMoreHorizontal size={25} />}
          onPress={() => onPressMoreOption(data?.id)}
        />
        {showDropdown && data?.id === selectedReplies && (
          <div className="absolute -left-[85px] -top-[30px] mt-2 bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
            <ButtonText
              label="Delete"
              isLoading={stateDeleteDataReplies.isLoading}
              styleContainer={`bg-red-500  w-20 h-8`}
              styleText="text-xs"
              // isDisable={state?.replies?.length <= 0}
              onPress={onDeleteReplies}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CardReplies;
