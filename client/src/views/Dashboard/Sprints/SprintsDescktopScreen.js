export function SprintsDescktopScreen({ sprint, isActive, setActive }) {
  return (
    <>
      <div
        // id={isActive == sprint.id && "roundCorner}
        className={`pt-[20px] pl-[28px] pb-[28px] ${
          isActive === sprint.id &&
          "bg-white rounded-l-[15px] transition duration-300 ease-in-out"
        } `}
        onClick={() => setActive(sprint.id)}
      >
        <p className="text-[16px] font-[700] font-mulish text-[#1A062E]">
          {sprint.countWords} words
        </p>
        <p className="text-[14px] font-[400] font-mulish text-[#1A062E] pb-[18px]">
          {sprint.metaData.title || "No title"}
        </p>
        <p className="text-[14px] font-[400] font-mulish text-[#1A062E]">
          {sprint.duration} mins
        </p>
      </div>
    </>
  );
}
