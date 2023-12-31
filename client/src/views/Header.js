import "../css/header.css";
import { DisplaySVG } from "./DisplaySVG";
import { useEffect, useState } from "react";
import fullScreen from "../components/icons/expand.svg";
import { Modal } from "./Modals/Modal";
import { Timer } from "./Timer";
import { AuthenticationScreen } from "./authentication_screen";
import { useSelector } from "react-redux";
import { QuestionListCalcSize } from "./QuestionList/QuestionListCalcSize";

export function Header({ sprintId, timerTimes, value, setValue, countWords }) {
  const [isMobile, setIsMobile] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [serveyInfo, setServeyInfo] = useState(false);
  const token = localStorage.getItem("token");
  const user = useSelector((state) => state.userInfo.user.id);
  const serveyOptions = useSelector(
    (state) => state.userInfo.user.options_servey
  );

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleFullscreen = () => {
    setIsFullscreen(true);
    const div = document.getElementById("header");
    if (div.requestFullscreen) {
      div.requestFullscreen();
    } else if (div.mozRequestFullScreen) {
      div.mozRequestFullScreen(); // Firefox
    } else if (div.webkitRequestFullscreen) {
      div.webkitRequestFullscreen(); // Safari
    } else if (div.msRequestFullscreen) {
      div.msRequestFullscreen(); // IE/Edge
    }
  };

  const handleExitFullscreen = () => {
    setIsFullscreen(false);
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  };

  useEffect(() => {
    if (window.location.pathname === "/note-editor") {
      setModalOpen(true);
    }
    if (value !== 0) {
      return setModalOpen(false);
    }
    if (window.innerWidth <= 959) {
      setIsMobile(true);
    }
  }, [value]);

  return (
    <div className={` ${isMobile ? "p-5" : "p-10"} w-full flex items-center`}>
      <nav
        className={`w-full ${
          isMobile ? "" : "flex justify-between  items-center "
        }`}
      >
        {isMobile ? (
          ""
        ) : isFullscreen ? (
          <button className="fullScreen" onClick={handleExitFullscreen}>
            Exit Fullscreen
          </button>
        ) : (
          <button className="fullScreen" onClick={handleFullscreen}>
            <DisplaySVG path={fullScreen} />
            Enter Fullscreen
          </button>
        )}
        {value ? (
          <Timer
            isMobile={isMobile}
            value={value * 60}
            sprintId={sprintId}
            setTimeModal={modalOpen}
            countWords={countWords}
          />
        ) : (
          ""
        )}
      </nav>
      <div>
        {(token && user && serveyInfo) || serveyOptions.length > 5 ? (
          <Modal isOpen={modalOpen} onClose={closeModal}>
            <div className="modal-content">
              <div className="setTimerContent">
                <h3 className="selectDuration">Select Duration</h3>
                <div className="btnContainer">
                  {timerTimes.map((value) => (
                    <button
                      key={value.id}
                      onClick={() => setValue(value.value)}
                      className="timerTimes"
                    >
                      {value.title}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Modal>
        ) : user ? (
          <QuestionListCalcSize setServeyInfo={setServeyInfo} />
        ) : (
          <Modal isOpen={modalOpen} onClose={closeModal}>
            <AuthenticationScreen />
          </Modal>
        )}
      </div>
    </div>
  );
}
