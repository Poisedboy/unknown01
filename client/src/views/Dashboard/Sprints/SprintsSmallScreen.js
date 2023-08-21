import rightArrow from "../../../components/icons/right-arrow.svg";
import "../../../css/sprints.css";

export function SprintsSmallScreen({ sprint, setSprintInfo }) {
  return (
    <div className="mt-[20px] mx-[20px] border-b-2">
      <div className={`flex`}>
        <div className={` w-[100px] mb-5`}>
          <button
            className="color-[#1A062E] text-[16px] font-[700] font-mulish"
            onClick={() => setSprintInfo(sprint.id)}
          >
            {sprint.count_words} words
          </button>
          <p className="text-[14px] font-[400] font-mulish mb-[18px]">
            {sprint.title}
          </p>
          <p className="text-[14px] font-[400] font-mulish">
            {sprint.duration} mins
          </p>
        </div>
        <img
          src={rightArrow}
          alt="right arrow"
          style={{ width: "20px", height: "20px" }}
        />
      </div>
    </div>
  );
}
