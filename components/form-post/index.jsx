// import ButtonText from "@/components/button/button-text";
import React from "react";

const FormPost = (props) => {
    const {onPress, name} = props
  return (
    <form className="w-full   my-3">
      <input
        placeholder={`Whats on your mind, ${name || ''}`}
        className="w-full p-3 rounded-full bg-slate-500/20 focus:outline-none cursor-pointer font-mono"
        onClick={onPress}
      />
    </form>
  );
};

export default FormPost;
