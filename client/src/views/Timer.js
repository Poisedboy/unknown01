import React, { useState, useEffect, useRef } from "react";
import "../css/timer.css";
import { DisplaySVG } from "./DisplaySVG";
import pauseIcon from "../components/icons/pause.svg";
import stopIcon from "../components/icons/stop.svg";
import WithFormPage from "./FormPage/FormPage";
import WithFormPageSmall from "./FormPage/SmallFormPage";

const STATUS = {
  STARTED: "Started",
  STOPPED: "Stopped",
};

export function Timer({ value, isMobile, sprintId }) {
  const INITIAL_COUNT = value;
  const [secondsRemaining, setSecondsRemaining] = useState(0);
  const [isStopped, setIsStopped] = useState(false);
  const [status, setStatus] = useState(STATUS.STOPPED);
  const secondsToDisplay = secondsRemaining % 60;
  const minutesRemaining = (secondsRemaining - secondsToDisplay) / 60;
  const minutesToDisplay = minutesRemaining % 60;

  const [durationSeconds, setDurationSeconds] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [type, setType] = useState("");

  const [smallScreen, setSmallScreen] = useState(false);
  const [isGreeenBg, setGreenBg] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 959) {
      setSmallScreen(true);
    } else {
      setSmallScreen(false);
    }
  }, []);

  useEffect(() => {
    setStatus(STATUS.STARTED);
    setSecondsRemaining(INITIAL_COUNT);
  }, [value]);

  useEffect(() => {
    if (status === "Started") {
      setGreenBg(true);
    } else {
      setGreenBg(false);
    }
  }, [status]);

  const handleStop = () => {
    if (status === STATUS.STARTED) {
      setIsStopped(true);
      setStatus(STATUS.STOPPED);
      setType("Edit");
      setOpenModal(true);
    } else if (status === STATUS.STOPPED) {
      setIsStopped(false);
      setStatus(STATUS.STARTED);
    }
  };

  const handleReset = () => {
    setStatus(STATUS.STOPPED);
    setSecondsRemaining(INITIAL_COUNT);
    setOpenModal(true);
    setType("Save");
  };

  useInterval(
    () => {
      if (secondsRemaining > 0) {
        setSecondsRemaining(secondsRemaining - 1);
        secondsRemaining <= 1 ? setOpenModal(true) : setOpenModal(false);
      } else if (secondsRemaining === 0) {
        setStatus(STATUS.STOPPED);
      }
      const newDurationSeconds = value - secondsRemaining;
      setDurationSeconds(newDurationSeconds);
    },
    status === STATUS.STARTED ? 1000 : null
  );
  return (
    <div
      className={`flex gap-5 ${isMobile ? "justify-between" : "justify-end"}`}
    >
      {smallScreen ? (
        <WithFormPageSmall
          openModal={openModal}
          closeModal={() => setOpenModal(false)}
          sprintId={sprintId}
          setIsStopped={setIsStopped}
          setStatus={setStatus}
          STATUS={STATUS}
          type={type}
          durationSeconds={durationSeconds}
        />
      ) : (
        <WithFormPage
          openModal={openModal}
          closeModal={() => setOpenModal(false)}
          sprintId={sprintId}
          setIsStopped={setIsStopped}
          setStatus={setStatus}
          STATUS={STATUS}
          type={type}
          durationSeconds={durationSeconds}
        />
      )}
      <div
        className={`w-full flex gap-5 ${
          isMobile ? "flex-row-reverse" : ""
        } justify-between`}
      >
        <div className={isGreeenBg ? "greenTimer" : "purpleTimer"}>
          <span className={isGreeenBg ? "greenCircle" : "purpleCircle"}></span>
          {twoDigits(minutesToDisplay)}:{twoDigits(secondsToDisplay)}
        </div>
        <div className="flex gap-5">
          <button className="navButton purpleFrame" onClick={handleStop}>
            {isStopped ? (
              "Start"
            ) : (
              <>
                <DisplaySVG
                  path={pauseIcon}
                  style={{
                    width: "32px",
                    height: "32px",
                    paddingRight: "12px",
                    paddingLeft: "12px",
                    paddingTop: "9px",
                    paddingBottom: "9px",
                  }}
                />
                {isMobile ? "" : "Pause"}
              </>
            )}
          </button>
          <button className="navButton redFrame" onClick={handleReset}>
            <DisplaySVG path={stopIcon} />
            {isMobile ? "" : "Stop"}
          </button>
        </div>
      </div>
    </div>
  );
}

function useInterval(callback, delay) {
  const savedCallback = useRef();
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
const twoDigits = (num) => String(num).padStart(2, "0");
