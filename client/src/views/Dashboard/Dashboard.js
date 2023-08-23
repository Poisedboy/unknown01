import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SprintsSmallScreen } from "./Sprints/SprintsSmallScreen";
import book from "../../components/icons/outline.svg";
import { SprintsDescktopScreen } from "./Sprints/SprintsDescktopScreen";
import { SprintInfo } from "./Sprints/SprintsInfo";
import { SprintInfoSmall } from "./Sprints/SprintInfoSmall";
import "../../css/dashboard.css";
import { getSprints } from "redux/noteEditorSlice";
import { verifyToken } from "api/verifyToken";
import { deleteUserInfo } from "redux/userSlice";
import { useNavigate } from "react-router-dom";
import logo from "../../components/icons/logo.png";

export function Dashboard() {
  const sprints = useSelector((state) => state.noteEditor.sprints);
  const userId = useSelector((state) => state.userInfo.user.id);
  const userPhoto = useSelector((state) => state.userInfo.user.picture);
  const token = localStorage.getItem("token");

  const [type, setType] = useState("view");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isMoblieWidth, setMobileWidth] = useState(false);
  const [isActive, setActive] = useState(null);
  const [isSprintInfo, setSprintInfo] = useState(null);

  useEffect(() => {
    async function validateToken() {
      const session = await verifyToken(token);
      if (!session) {
        dispatch(deleteUserInfo());
        navigate("/");
      }
    }
    validateToken();
  }, []);

  useEffect(() => {
    dispatch(getSprints({ userId, token }));
    if (window.innerWidth <= 959) {
      setMobileWidth(true);
    } else {
      setMobileWidth(false);
    }
  }, [sprints.length]);

  return (
    <div
      className={
        isMoblieWidth
          ? "min-h-screen bg-[#F4F1F9]"
          : "bg-[#F4F4F4] min-h-screen pb-10 lg:flex flex-col items-center"
      }
    >
      <div
        className={
          isMoblieWidth
            ? "w-full h-[80px] p-[20px] flex justify-between items-center"
            : "w-full h-[80px] p-10 flex justify-end items-center"
        }
      >
        {isMoblieWidth && (
          <img
            src={logo}
            alt="logo"
            style={{ width: "90px", height: "24px" }}
          />
        )}
        <div
          className={
            isMoblieWidth
              ? "flex items-center gap-[20px]"
              : "flex justify-end gap-10"
          }
        >
          <button
            onClick={() => navigate("/note-editor")}
            className="h-[40px] px-[28px] rounded-[10px] bg-[#5C2D8B] font-mulish text-[18px] font-[700] text-[white]"
          >
            Write
          </button>
          <img
            src={userPhoto}
            alt="user`s photo"
            style={{
              width: "39px",
              height: "39px",
              borderRadius: "10px",
              border: "2px solid #1A062E",
            }}
          />
        </div>
      </div>
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
                    type={type}
                    setType={setType}
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
                  type={type}
                  setType={setType}
                />
              );
            })}
          </article>
        )}
      </div>
    </div>
  );
}
