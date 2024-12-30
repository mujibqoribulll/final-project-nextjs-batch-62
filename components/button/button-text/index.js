const ButtonText = (props) => {
  const { styleContainer, label, isLoading, onPress, isDisable, styleText } =
    props;
  return (
    <button
      className={`${styleContainer} flex flex-row justify-center items-center gap-x-3 text-white rounded-lg`}
      onClick={onPress}
      disabled={isDisable}
    >
      <h3
        className={`text-white ${
          styleText ? styleText : "text-lg p-2"
        }  font-mono`}
      >
        {label}
      </h3>
      {isLoading && (
        <div className="border-4 border-x-white border-[#896ed1] h-5 w-5 rounded-full animate-spin" />
      )}
    </button>
  );
};

export default ButtonText;
