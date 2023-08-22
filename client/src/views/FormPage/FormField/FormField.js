import React from "react";

export function FormField({
  title,
  type,
  state,
  setState,
  placeholder,
  maxLength,
  id,
}) {
  // let notes;
  // let printedSymbols;
  // function calculateLetters() {
  //   notes = document.getElementById("notes");
  //   printedSymbols = notes?.value.length || 0;
  //   return printedSymbols === null ? 0 : printedSymbols;
  // }
  return (
    <div className="flex flex-col text-black m-3">
      <div className="flex justify-between items-center">
        <label className="pb-1">{title}</label>
      </div>
      <input
        type={type || "text"}
        placeholder={placeholder}
        value={state}
        required
        id={id}
        maxLength={maxLength}
        className="w-[80vw] sm:w-[45vw] lg:w-[30vw] p-5 sm:p-2 rounded-[10px] border-2 border-[#E6D8F3] font-mulish text-[16px] font-[400] text-[#5C2D8B]"
        onChange={(e) => setState(e.target.value)}
      />
    </div>
  );
}
