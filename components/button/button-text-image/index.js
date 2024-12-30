const ButtonTextImage = (props) => {
  const { label, icon, styleContainer, onPress, isDisable, textStyle } = props;

  return (
    <button
      className={`${styleContainer} bg-transparent border border-slate-400 w-full p-2 rounded-lg cursor-pointer flex items-center justify-center gap-3`}
      onClick={onPress}
      disabled={isDisable}
    >
      <span>{icon}</span>
      <label className={`text-sm font-mono ${textStyle ? textStyle : 'text-white'}`}>
        {label}
      </label>
    </button>
  );
};
export default ButtonTextImage;
