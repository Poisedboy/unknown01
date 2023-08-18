import backArrow from "../../../components/icons/back-arrow.svg";
import pencil from "../../../components/icons/pencil.svg";

export function SprintInfoSmall({ sprint, isSprintInfo, setSprintInfo }) {
  const handleClick = () => {
    setSprintInfo(null);
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
              {sprint.metaData.title}
            </p>
          </div>
          <div className="space-y-5">
            <div className="flex justify-between">
              <p className="w-[75px] font-mulish font-[400] text-[12px] text-[#1A062E]">
                {sprint.createdAt}
              </p>
              <img
                src={pencil}
                alt="edit"
                style={{ width: "24px", height: "100%" }}
              />
            </div>
            <div className="w-full bg-white px-[28px] py-[16px] rounded-[10px]">
              <div className="w-full flex justify-between">
                <p className="text-[#A6A3A9] text-[14px] font-[500] font-mulish">
                  Words
                </p>
                <span className="flex justify-end text-[16px] font-[700] font-mulish">
                  {sprint.countWords}
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
            <div className="pb-5 border-b-2 h-[400px] overflow-scroll scrollbar-hide">
              <p className="text-[16px] font-[400] font-mulish">
                {sprint.content}
              </p>
            </div>
            <div className="border-b-2 pb-[20px]">
              <p className="text-[16px] font-[400] font-mulish">
                How did you feel?
              </p>
              <img src={sprint.metaData.emotion} alt="emotion" />
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
