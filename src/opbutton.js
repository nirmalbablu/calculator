import React from "react";
const Operationbutton = ({ operation, dispatch }) => {
  return (
    <button
      onClick={() =>
        dispatch({ type: "add_operation", payload: { operation } })
      }
    >
      {operation}
    </button>
  );
};
export default Operationbutton;
