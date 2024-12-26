const ButtonTextImage = (props) => {
  const { label, icon, styleContainer, onPress, isDisable } = props;
  return (
    <button
      className="bg-transparent border border-slate-400 w-full p-2 rounded-lg cursor-pointer flex items-center justify-center gap-3"
      onClick={onPress}
      disabled={isDisable}
    >
      <span>{icon}</span>
      <label className="text-white text-sm">{label}</label>
    </button>
  );
};
export default ButtonTextImage;
