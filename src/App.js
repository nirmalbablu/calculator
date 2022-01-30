import React, { useReducer } from "react";
import Operationbutton from "./opbutton";
import Digitbutton from "./digitbutton";
import "./app.css"

let initialstate = {
  current_operand: null,
  previous_operand: null,
  operation: null,
  overwrite: false,
};

const reducer = (value, dispatch) => {
  switch (dispatch.type) {
    case "add_digit":
      if (value.current_operand === "0" && dispatch.payload.digit === "0") {
        return value;
      }
      if (
        value.current_operand?.includes(".") &&
        dispatch.payload.digit === "."
      ) {
        return value;
      }
      return {
        ...value,
        current_operand: `${value.current_operand || ""}${
          dispatch.payload.digit
        }`,
      };
    case "add_operation":
      if (value.current_operand === null && value.previous_operand === null) {
        return value;
      }
      if (value.current_operand === null) {
        return {
          ...value,
          operation: dispatch.payload.operation,
        };
      }
      if (value.previous_operand === null) {
        return {
          ...value,
          operation: dispatch.payload.operation,
          previous_operand: value.current_operand,
          current_operand: null,
        };
      }
      return {
        ...value,
        previous_operand: evaluvate(value),
        operation: dispatch.payload.operation,
        current_operand: null,
      };

    case "full-delete": {
      return initialstate;
    }
    case "delete": {
      if (value.overwrite === true) {
        return {
          ...value,
          current_operand: null,
          overwrite: false,
        };
      }
      if (value.current_operand === null) {
        return value;
      }
      if (value.current_operand.length === 1)
        return {
          ...value,
          current_operand: null,
        };
      return {
        ...value,
        current_operand: value.current_operand.slice(
          0,
          value.current_operand.length - 1
        ),
      };
    }
    case "evaluvate_digit":
      if (
        value.previous_operand === null ||
        value.current_operand === null ||
        value.operation === null
      ) {
        return value;
      }
      return {
        ...value,
        previous_operand: null,
        operation: null,
        current_operand: evaluvate(value),
        overwrite: true,
      };
  }
};

const evaluvate = (value) => {
  let prev = parseFloat(value.previous_operand);
  let current = parseFloat(value.current_operand);
  if (isNaN(prev) || isNaN(current)) {
    return null;
  }
  let answer = "";
  switch (value.operation) {
    case "+":
      answer = prev + current;
      break;
    case "-":
      answer = prev - current;
      break;
    case "*":
      answer = prev * current;
      break;
    case "/":
      answer = prev / current;
      break;
    default:
      break;
  }
  return answer.toString();
};

const App = () => {
  const [{ previous_operand, current_operand, operation }, dispatch] =
    useReducer(reducer, initialstate);

  return (
    <div className="main">
    <div className="calci">
      <div className="output">
        <div className="previous_operand">
          {previous_operand}
          {operation}
        </div>
        <div className="previous_operand">{current_operand}</div>
      </div>
      <div>
        <button className="acdel"
          onClick={() => {
            dispatch({ type: "full-delete" });
          }}
        >
          ac
        </button>
        <button className="acdel"
          onClick={() => {
            dispatch({ type: "delete" });
          }}
        >
          del
        </button>
        <Operationbutton operation="/" dispatch={dispatch} />
      </div>
      <div>
        <Digitbutton digit="1" dispatch={dispatch} />
        <Digitbutton digit="2" dispatch={dispatch} />
        <Digitbutton digit="3" dispatch={dispatch} />
        <Operationbutton operation="+" dispatch={dispatch} />
      </div>
      <div>
        <Digitbutton digit="4" dispatch={dispatch} />
        <Digitbutton digit="5" dispatch={dispatch} />
        <Digitbutton digit="6" dispatch={dispatch} />
        <Operationbutton operation="*" dispatch={dispatch} />
      </div>
      <div>
        <Digitbutton digit="7" dispatch={dispatch} />
        <Digitbutton digit="8" dispatch={dispatch} />
        <Digitbutton digit="9" dispatch={dispatch} />
        <Operationbutton operation="-" dispatch={dispatch} />
      </div>
      <div >
        <Digitbutton digit="0" dispatch={dispatch} />
        <Digitbutton digit="." dispatch={dispatch} />

        <button className="equal" onClick={() => dispatch({ type: "evaluvate_digit" })}>=</button>
      </div>
    </div>
    </div>
  );
};

export default App;
