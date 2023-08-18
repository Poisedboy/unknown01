import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { SprintsSmallScreen } from "./Sprints/SprintsSmallScreen";
import book from "../../components/icons/outline.svg";
import { SprintsDescktopScreen } from "./Sprints/SprintsDescktopScreen";
import { SprintInfo } from "./Sprints/SprintsInfo";
import { SprintInfoSmall } from "./Sprints/SprintInfoSmall";
import "../../css/dashboard.css";

export function Dashboard() {
  const sprints = useSelector((state) => state.noteEditor.sprints);
  const [isMoblieWidth, setMobileWidth] = useState(false);
  const [isActive, setActive] = useState(null);
  const [isSprintInfo, setSprintInfo] = useState(null);

  useEffect(() => {
    if (window.innerWidth <= 959) {
      setMobileWidth(true);
    } else {
      setMobileWidth(false);
    }
  }, []);

  return (
    <div
      className={
        isMoblieWidth
          ? "min-h-screen bg-[#F4F1F9]"
          : "bg-[#F4F4F4] min-h-screen pb-10 lg:flex flex-col items-center"
      }
    >
      <div className="w-full h-[80px]"></div>
      <div
        className={
          isMoblieWidth
            ? ""
            : "flex bg-[#E6D8F3] mx-10 rounded-[15px] md:mx-20 lg:w-[959px]"
        }
      >
        <div className="pb-[28px]">
          <div
            className={
              isMoblieWidth
                ? "flex p-[20px] gap-2"
                : "w-[260px] p-[28px] flex md:w-[320px]"
            }
          >
            <img
              src={book}
              alt="book"
              style={{ width: "22px", height: "22px" }}
            />
            <h4 className="font-mulish text-xl font-semibold">Sprints</h4>
          </div>
          <aside
            className={
              isMoblieWidth
                ? ""
                : "w-[260px] md:w-[320px] pt-[28px] pl-[28px] m-0 space-y-[16px] h-[576px] relative overflow-scroll scrollbar-hide"
            }
          >
            {sprints.map((sprint) => {
              return isMoblieWidth ? (
                !isSprintInfo && (
                  <div key={sprint.id} className="flex flex-col">
                    <SprintsSmallScreen
                      sprint={sprint}
                      isSprintInfo={isSprintInfo}
                      setSprintInfo={setSprintInfo}
                    />
                  </div>
                )
              ) : (
                <SprintsDescktopScreen
                  key={sprint.id}
                  sprint={sprint}
                  isActive={isActive}
                  setActive={setActive}
                  isMoblieWidth={isMoblieWidth}
                />
              );
            })}
          </aside>
        </div>
        {isMoblieWidth ? (
          <div>
            {sprints.map((sprint) => {
              return (
                isSprintInfo && (
                  <SprintInfoSmall
                    key={sprint.id}
                    sprint={sprint}
                    isSprintInfo={isSprintInfo}
                    setSprintInfo={setSprintInfo}
                  />
                )
              );
            })}
          </div>
        ) : (
          <article className="bg-white rounded-[15px] w-[100%] p-10 lg:w-[959px]">
            {sprints.map((sprintInfo) => {
              return (
                <SprintInfo
                  key={sprintInfo.id}
                  isActive={isActive}
                  sprint={sprintInfo}
                />
              );
            })}
          </article>
        )}
      </div>
    </div>
  );
}
