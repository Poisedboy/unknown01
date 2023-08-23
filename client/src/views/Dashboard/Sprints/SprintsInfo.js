import { useLocalTime } from "hooks/useLocalTime";
import pencil from "../../../components/icons/pencil.svg";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
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

export function SprintInfo({ sprint, isActive, type, setType }) {
  const convertedTime = useLocalTime(sprint.created_at);

  const [editedSprint, setSprint] = useState({
    title: "",
    emotion: "",
    id: "",
    user_id: "",
  });
  const token = localStorage.getItem("token");

  const dispatch = useDispatch();

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
    <>
      {isActive === sprint.id && (
        <div className="w-full">
          <div className="flex justify-between mb-[20px]">
            <div>
              <p className=" font-mulish text-[#5C2D8B] text-[18px] font-[700]">
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
              <p className="text-[#A6A3A9] text-[14px] font-[400] font-mulish">
                {convertedTime}
              </p>
            </div>
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
          <div>
            <div className="flex justify-around bg-[#F4F1F9] px-[28px] py-[16px] rounded-[10px] mb-[40px]">
              <div className="flex justify-center items-center gap-3">
                <p className="text-[#A6A3A9] text-[14px] font-[500] font-mulish">
                  Words
                </p>
                <span className="text-[20px] font-[700] font-mulish">
                  {sprint.count_words}
                </span>
              </div>
              <div className="flex justify-center items-center gap-3">
                <p className="text-[#A6A3A9] text-[14px] font-[500] font-mulish">
                  Duration
                </p>
                <span className="flex justify-end text-[20px] font-[700] font-mulish">
                  {sprint.duration}
                </span>
              </div>
              <div className="flex justify-center items-center gap-3">
                <p className="text-[#A6A3A9] text-[14px] font-[500] font-mulish">
                  Speed
                </p>
                <span className="flex justify-end text-[20px] font-[700] font-mulish">
                  {sprint.speed} wpm
                </span>
              </div>
            </div>
            <div className="pb-10 border-b-2">
              <p className="text-[#1A062E] text-[18px] loading-[24px] font-[400] font-courier">
                {sprint.content}
              </p>
            </div>
            <div className="border-b-2 py-10">
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
            <div className="py-10">
              <p className="text-[16px] font-[400] font-mulish">Notes</p>
              <p className="text-[#A6A3A9] text-[12px] font-[400] font-mulish">
                No notes for this activity
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
