import { useAutosave } from "hooks/useAutoSave";
import React, { useState, useEffect } from "react";
import { Header } from "views/Header";
import { useAmountWords } from "hooks/useAmountWords";
import { nanoid } from "nanoid";
import { useDispatch } from "react-redux";
import {
  updateCountWords,
  setSprintId,
  inputSprintsText,
  // addSprint,
} from "redux/noteEditorSlice";

const timerTimes = [
  { id: 1, title: "15 Minutes", value: 15 },
  { id: 2, title: "30 Minutes", value: 30 },
  { id: 3, title: "45 Minutes", value: 45 },
  { id: 4, title: "60 Minutes", value: 60 },
];

export function NoteEditor() {
  const [value, setValue] = useState(0);
  const id = nanoid(5);
  const [text, setText] = useState("");
  const [sprint, setSprint] = useState({
    content: "",
    id: id,
    duration: 0,
    speed: 0,
    countWords: 0,
    createdAt: "",
    metaData: {},
  });

  const dispatch = useDispatch();

  //setSprint countWords
  let integer = useAmountWords(text);
  useEffect(() => {
    setSprint((prevState) => {
      return { ...prevState, countWords: integer };
    });
    // setup to state countWords
    dispatch(updateCountWords(sprint.countWords));
  }, [text]);

  useEffect(() => {
    const currentDate = new Date();

    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();
    const currentHours = currentDate.getHours();
    const currentMinutes = currentDate.getMinutes();
    const currentSeconds = currentDate.getSeconds();

    const date = `${currentYear}-${currentMonth}-${currentDay} ${currentHours}:${currentMinutes}:${currentSeconds}`;
    console.log(date);
    // setSprint created at
    setSprint((prevState) => {
      return { ...prevState, createdAt: date };
    });
    // dispatch(addSprint(sprint));
    dispatch(setSprintId(sprint.id));

    const textarea = document.getElementById("customTextarea");

    textarea.addEventListener("paste", (event) => {
      event.preventDefault();
    });
  }, []);

  useEffect(() => {
    // dispatch(addSprint(sprint));
    //setSprint text from textarea
    setSprint((prevState) => {
      return { ...prevState, content: text };
    });
    dispatch(inputSprintsText(text));
  }, [text]);
  console.log(sprint);
  useAutosave(sprint);

  return (
    <div id="header" className="bg-[#F4F1F9] sm:bg-[#F4F4F4]">
      <Header
        sprintId={sprint.id}
        timerTimes={timerTimes}
        value={value}
        setValue={setValue}
        countWords={sprint.countWords}
      />
      <section className="flex justify-center items-center">
        <div className="w-full flex justify-center items-center px-5 sm:px-[40px] pb-[20px] sm:pb-[40px] lg:px-[280px]">
          <textarea
            id="customTextarea"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full sm:w-[880px] lg:w-full lg:rounded-[20px] min-h-screen overflow-scroll scrollbar-hide focus:outline-none p-10 rounded-[15px] font-courier"
            placeholder={
              value ? "Let the words flow through your fingers..." : " "
            }
          />
        </div>
      </section>
    </div>
  );
}
