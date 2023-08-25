import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import extremelyHappyIcon from "../../components/icons/Extremely Happy.png";
import happyIcon from "../../components/icons/Happy.png";
import sadIcon from "../../components/icons/Emoticon - Sad.png";
import neutralIcon from "../../components/icons/Neutral.png";
import extremelySadIcon from "../../components/icons/Extremely Sad.png";
import {
  addMetaData,
  calcDurationAndSpeed,
  postSprint,
  deleteSprint,
} from "redux/noteEditorSlice";

const smiles = [
  { id: 0, title: "excited", img: extremelyHappyIcon },
  { id: 1, title: "good", img: happyIcon },
  { id: 2, title: "normal", img: sadIcon },
  { id: 3, title: "sad", img: neutralIcon },
  { id: 4, title: "extremely sad", img: extremelySadIcon },
];

export const FormHOC = (
  Component,
  closeModal,
  sprintId,
  setIsStopped,
  setStatus,
  STATUS,
  type,
  durationSeconds
) => {
  console.log(
    "PROPS IN HOC",
    closeModal,
    sprintId,
    setIsStopped,
    setStatus,
    STATUS,
    type,
    durationSeconds
  );
  const WithHOC = (props) => {
    console.log("PROPS", props);
    const [form, setForm] = useState({
      title: "",
      project: "",
      emotion: "",
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const speed = useSelector((state) => state.noteEditor.sprint.speed);
    const userId = useSelector((state) => state.userInfo.user.id);
    const sprint = useSelector((state) => state.noteEditor.sprint);
    const token = localStorage.getItem("token");

    useEffect(() => {
      dispatch(addMetaData({ form, sprintId: props.sprintId }));
    }, [form]);

    const handleSubmit = (e) => {
      e.preventDefault();
      if (props.type === "Save") {
        dispatch(
          calcDurationAndSpeed({
            duration: props.durationSeconds,
            id: props.sprintId,
          })
        );
        if (speed) {
          dispatch(postSprint({ sprint, userId, token }));
          navigate("/dashboard");
        }
      } else {
        props.closeModal(false);
        props.setIsStopped(false);
        props.setStatus(props.STATUS.STARTED);
      }
    };

    const handleStateChange = (fieldName, value) => {
      setForm((prevState) => ({
        ...prevState,
        [fieldName]: value,
      }));
    };

    const handleCloseModal = () => {
      props.closeModal(false);
      props.setIsStopped(false);
      props.setStatus(props.STATUS.STARTED);
      if (props.type === "Save") {
        navigate(0);
      }
    };

    const handleDelete = () => {
      if (props.type === "Edit") {
        setForm(() => {
          return {
            title: "",
            project: "",
            emotion: "",
          };
        });
        props.closeModal(false);
        props.setIsStopped(false);
        props.setStatus(props.STATUS.STARTED);
      } else if (props.type === "Save") {
        dispatch(deleteSprint({ id: props.sprintId }));
        navigate("/note-editor");
      }
    };

    return (
      <Component
        openModal={props.openModal}
        type={props.type}
        handleSubmit={handleSubmit}
        handleStateChange={handleStateChange}
        handleCloseModal={handleCloseModal}
        handleDelete={handleDelete}
        STATUS={props.STATUS}
        smiles={smiles}
        form={form}
        setForm={setForm}
      />
    );
  };

  return WithHOC;
};
