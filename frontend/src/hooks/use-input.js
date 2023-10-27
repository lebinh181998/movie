import { useState } from "react";

const useInput = (resolveData) => {
  const [valueInput, setValueInput] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  //   kiểm tra dữ liệu search có rỗng không
  const validInput = resolveData(valueInput);
  const errorInput = isTouched && !validInput;

  const eventChangeInput = (e) => {
    setValueInput(e.target.value);
    if (e.target.value.trim() !== "") {
      setIsTouched(() => false);
    }
  };

  const eventBlurInput = () => {
    setIsTouched(() => true);
  };

  const resetInput = () => {
    setValueInput("");
    setIsTouched(false);
  };

  return {
    value: valueInput,
    isError: errorInput,
    isValid: validInput,
    eventBlurInput,
    eventChangeInput,
    resetInput,
  };
};
export default useInput;
