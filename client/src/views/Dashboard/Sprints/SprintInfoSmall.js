import { useEffect, useState } from "react";
import backArrow from "../../../components/icons/back-arrow.svg";
import pencil from "../../../components/icons/pencil.svg";
import { useLocalTime } from "hooks/useLocalTime";
import { useDispatch } from "react-redux";
import { updateSprint, updateLocalSprint } from "redux/noteEditorSlice";
import extremelySadIcon from "../../../components/icons/Extremely Sad.png";
import neutralIcon from "../../../components/icons/Neutral.png";
import sadIcon from "../../../components/icons/Emoticon - Sad.png";
import happyIcon from "../../../components/icons/Happy.png";
import extremelyHappyIcon from "../../../components/icons/Extremely Happy.png";

const smiles = [
  { id: 0, title: "excited", img: extremelyHappyIcon },
  { id: 1, title: "good", img: happyIcon },
  { id: 2, title: "normal", img: sadIcon },
  { id: 3, title: "sad", img: neutralIcon },
  { id: 4, title: "extremely sad", img: extremelySadIcon },
];

export function SprintInfoSmall({
  sprint,
  isSprintInfo,
  setSprintInfo,
  type,
  setType,
}) {
  const [editedSprint, setSprint] = useState({
    title: "",
    emotion: "",
    id: "",
    user_id: "",
  });
  const token = localStorage.getItem("token");

  const dispatch = useDispatch();

  const convertedTime = useLocalTime(sprint.created_at);
  const handleClick = () => {
    setSprintInfo(null);
  };

  useEffect(() => {
    setSprint((prevState) => {
      return {
        ...prevState,
        title: sprint.title,
        emotion: sprint.emotion,
        id: sprint.id,
        user_id: sprint.user_id,
      };
    });
  }, []);

  const handleChange = (fieldName, e) => {
    setSprint((prevState) => {
      return { ...prevState, [fieldName]: e.target.value };
    });
  };

  const handleSubmit = () => {
    setType("view");
    dispatch(updateLocalSprint(editedSprint));
    dispatch(updateSprint({ updatedSprint: editedSprint, token }));
  };

  return (
    sprint.id === isSprintInfo && (
      <div
        className={
          isSprintInfo
            ? "absolute inset-0 flex items-center justify-center"
            : "hidden"
        }
      >
        <article className={` w-full min-h-screen bg-[#F4F1F9] px-5 shadow-lg`}>
          <div className="flex items-center p-5 pt-[20px]">
            <button onClick={handleClick}>
              <img
                src={backArrow}
                alt="arrow back"
                style={{
                  width: "32px",
                  height: "32px",
                }}
              />
            </button>
            <p className="font-mulish font-[700] text-[20px] text-[#1A062E]">
              {type === "edit" ? (
                <input
                  type="text"
                  value={editedSprint.title}
                  onChange={(e) => handleChange("title", e)}
                />
              ) : (
                sprint.title
              )}
            </p>
          </div>
          <div className="space-y-5">
            <div className="flex justify-between">
              <p className="w-[75px] font-mulish font-[400] text-[12px] text-[#1A062E]">
                {convertedTime}
              </p>
              {type === "edit" ? (
                <button onClick={() => handleSubmit()}>Sumbit</button>
              ) : (
                <img
                  onClick={() => setType("edit")}
                  src={pencil}
                  alt="edit"
                  style={{ width: "24px", height: "100%" }}
                />
              )}
            </div>
            <div className="w-full bg-white px-[28px] py-[16px] rounded-[10px]">
              <div className="w-full flex justify-between">
                <p className="text-[#A6A3A9] text-[14px] font-[500] font-mulish">
                  Words
                </p>
                <span className="flex justify-end text-[16px] font-[700] font-mulish">
                  {sprint.count_words}
                </span>
              </div>
              <div className="w-full flex justify-between">
                <p className="text-[#A6A3A9] text-[14px] font-[500] font-mulish">
                  Duration
                </p>
                <span className="flex justify-end text-[16px] font-[700] font-mulish">
                  {sprint.duration}
                </span>
              </div>
              <div className="w-full flex justify-between">
                <p className="text-[#A6A3A9] text-[14px] font-[500] font-mulish">
                  Speed
                </p>
                <span className="flex justify-end text-[16px] font-[700] font-mulish">
                  {sprint.speed} wpm
                </span>
              </div>
            </div>
            <div className="pb-5 border-b-2 h-[100%] overflow-scroll scrollbar-hide">
              <p className="text-[16px] font-[400] font-mulish">
                {sprint.content}
              </p>
            </div>
            <div className="border-b-2 pb-[20px]">
              <p className="text-[16px] font-[400] font-mulish">
                How did you feel?
              </p>
              {type === "edit" ? (
                <ul className="flex markers:none">
                  {smiles.map((smile) => {
                    return (
                      <li key={smile.id} className="mr-3">
                        <button
                          aria-required
                          onClick={(e) => {
                            e.preventDefault();
                            return setSprint((prevState) => {
                              return {
                                ...prevState,
                                emotion: smile.img,
                              };
                            });
                          }}
                        >
                          <img src={smile.img} />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <img src={sprint.emotion} alt="emotion" />
              )}
            </div>
            <div className="pb-5">
              <p className="text-[16px] font-[400] font-mulish">Notes</p>
              <p className="text-[#A6A3A9] text-[12px] font-[400] font-mulish">
                No notes for this activity
              </p>
            </div>
          </div>
        </article>
      </div>
    )
  );
}
