import React from "react";
import ButtonImage from "../button/button-image";
import { FcLike } from "react-icons/fc";
import { IoHeartDislikeSharp } from "react-icons/io5";
import { FaRegComments } from "react-icons/fa";
import ButtonTextImage from "../button/button-text-image";
import ButtonText from "../button/button-text";

const Card = (props) => {
  const {
    icon,
    data,
    onPressReplies,
    dataReplies,
    onPressLikeOrUnlike,
    nameProfile,
    showDropdownPost,
    openModalPost,
    selectPostId,
    openModalConfirmation,
    setModalPost,
    openPostModal,
  } = props;
  let newDate = new Date(data?.created_at);
  return (
    <div className="bg-white lg:rounded-lg p-3">
      <div className="flex flex-row items-center justify-between gap-x-3">
        <div className="flex flex-row gap-x-3">
          <div className="bg-[#6E54B5] w-[50px] h-[50px] rounded-full flex justify-center items-center">
            <h3 className="text-white text-lg font-mono">{nameProfile}</h3>
          </div>
          <div>
            <h3 className="font-mono font-bold text-lg">
              {data?.user?.name || "Unknow"}
            </h3>
            <h4 className="font-mono font-bold text-xs">
              {" "}
              {newDate?.toLocaleTimeString()}
            </h4>
          </div>
        </div>
        <div className="relative">
          {data?.is_own_post && (
            <ButtonImage icon={icon} onPress={() => openModalPost(data?.id)} />
          )}

          {showDropdownPost && selectPostId === data?.id && (
            <div className="absolute -left-[90px] -top-[20px] flex flex-col gap-1 bg-gray-500/20 p-2 rounded-xl">
              <ButtonText
                styleContainer="bg-red-500"
                label="Delete"
                styleText="text-sm py-1 px-3"
                onPress={openModalConfirmation}
              />
              <ButtonText
                styleContainer="bg-[#6E54B5]"
                label="Edit"
                styleText="text-sm py-1 px-3"
                onPress={() => openPostModal("edit-post")}
              />
            </div>
          )}
        </div>
      </div>
      <div className="py-3">
        <p className="leading-8 text-sm font-mono ">{data?.description}</p>
      </div>
      <div
        className={`flex flex-row justify-evenly items-center border-t-[1px] border-y-gray-700/10 ${
          dataReplies?.data?.length > 0 ? "border-b-[1px]" : ""
        }`}
      >
        <ButtonTextImage
          label={`${data?.likes_count > 0 ? data?.likes_count : ""} Like`}
          icon={
            data?.is_like_post ? (
              <FcLike size={20} />
            ) : (
              <IoHeartDislikeSharp size={20} />
            )
          }
          onPress={() =>
            onPressLikeOrUnlike(
              data?.is_like_post ? "like" : "unlike",
              data?.id
            )
          }
          styleContainer="border-0 w-20"
          textStyle={"text-gray-700/70"}
        />
        <ButtonTextImage
          label={`${
            data?.replies_count > 0 ? data?.replies_count : ""
          } Comment`}
          icon={<FaRegComments size={20} />}
          onPress={() => onPressReplies(data?.id)}
          styleContainer="border-0 w-20"
          textStyle={"text-gray-700/70"}
        />
      </div>
    </div>
  );
};

export default Card;
