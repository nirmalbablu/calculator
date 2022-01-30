import React from "react";
const Digitbutton = ({ digit, dispatch }) => {
  return (
    <button onClick={() => dispatch({ type: "add_digit", payload: { digit } })}>
      {digit}
    </button>
  );
};
export default Digitbutton;
