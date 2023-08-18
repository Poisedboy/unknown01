/***
 *
 *   BUTTON
 *
 *   PROPS
 *   text: button label
 *   action: callback function executed on click
 *
 **********/

import Style from "./button.tailwind.js";

export function Button(props) {
  console.log(props);

  return (
    <button
      className={Style.button}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      {props.text}
    </button>
  );
}
