import { useLocalTime } from "hooks/useLocalTime";
import pencil from "../../../components/icons/pencil.svg";

export function SprintInfo({ sprint, isActive }) {
  const convertedTime = useLocalTime(sprint.created_at);
  return (
    <>
      {isActive === sprint.id && (
        <div className="w-full">
          <div className="flex justify-between mb-[20px]">
            <div>
              <p className=" font-mulish text-[#5C2D8B] text-[18px] font-[700]">
                {sprint.title}
              </p>
              <p className="text-[#A6A3A9] text-[14px] font-[400] font-mulish">
                {convertedTime}
              </p>
            </div>
            <button className="w-[32px] h-[54px] flex items-center">
              <img
                src={pencil}
                alt="edit"
                style={{ maxWidth: "32px", height: "100%" }}
              />
            </button>
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
              <img src={sprint.emotion} alt="emotion" />
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
