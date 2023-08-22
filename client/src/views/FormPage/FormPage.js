import { useEffect, useState } from "react";
import { Modal } from "views/Modals/Modal";
import { FormField } from "./FormField/FormField";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import deleteBin from "../../components/icons/delete.svg";
import extremelySadIcon from "../../components/icons/Extremely Sad.png";
import neutralIcon from "../../components/icons/Neutral.png";
import sadIcon from "../../components/icons/Emoticon - Sad.png";
import happyIcon from "../../components/icons/Happy.png";
import extremelyHappyIcon from "../../components/icons/Extremely Happy.png";
import {
  addMetaData,
  deleteSprint,
  calcDurationAndSpeed,
} from "redux/noteEditorSlice";
import close from "../../components/icons/close.svg";
import { postSprint } from "redux/noteEditorSlice";

const smiles = [
  { id: 0, title: "excited", img: extremelyHappyIcon },
  { id: 1, title: "good", img: happyIcon },
  { id: 2, title: "normal", img: sadIcon },
  { id: 3, title: "sad", img: neutralIcon },
  { id: 4, title: "extremely sad", img: extremelySadIcon },
];

export function FormPage({
  openModal,
  closeModal,
  sprintId,
  setIsStopped,
  setStatus,
  STATUS,
  type,
  durationSeconds,
}) {
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
    dispatch(addMetaData({ form, sprintId }));
  }, [form]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === "Save") {
      dispatch(
        calcDurationAndSpeed({ duration: durationSeconds, id: sprintId })
      );
      if (speed) {
        dispatch(postSprint({ sprint, userId, token }));
        navigate("/dashboard");
      }
    } else {
      closeModal(false);
      setIsStopped(false);
      setStatus(STATUS.STARTED);
    }
  };

  const handleStateChange = (fieldName, value) => {
    setForm((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  const handleCloseModal = () => {
    closeModal(false);
    setIsStopped(false);
    setStatus(STATUS.STARTED);
  };

  const handleDelete = () => {
    if (type === "Edit") {
      setForm(() => {
        return {
          title: "",
          project: "",
          emotion: "",
        };
      });
      closeModal(false);
      setIsStopped(false);
      setStatus(STATUS.STARTED);
    } else if (type === "Save") {
      dispatch(deleteSprint({ id: sprintId }));
      navigate("/note-editor");
    }
  };

  return (
    <>
      <Modal isOpen={openModal}>
        <form className="inline-block w-[90vw] sm:w-[50vw] lg:w-[35vw] rounded-2xl border-2 shadow-3xl border-[#5C2D8B] bg-white">
          <div className="w-inherit flex justify-start items-center flex-col">
            <div className="w-full flex justify-around items-center">
              <div className="w-[80px]"></div>
              <h2 className="uppercase text-center text-2xl text-black my-5">
                {type} Sprint
              </h2>
              <div className="w-[80px] flex justify-end">
                <button>
                  <img
                    src={close}
                    alt="close"
                    onClick={handleCloseModal}
                    style={{ width: "32px", height: "32px" }}
                  />
                </button>
              </div>
            </div>
            <FormField
              title="Sprint Title"
              state={form.title}
              placeholder="Title"
              setState={(value) => handleStateChange("title", value)}
            />
            <FormField
              title="Project"
              state={form.project}
              placeholder=""
              setState={(value) => handleStateChange("project", value)}
            />
            <div className="w-[70vw] sm:w-[45vw] lg:w-[30vw]">
              <h4 className="mt-5 font-bold">How did it feel?</h4>
              <ul className="flex p-2 mb-4 gap-2">
                {smiles.map((smile) => {
                  return (
                    <li key={smile.id}>
                      <button
                        aria-required
                        onClick={(e) => {
                          e.preventDefault();
                          return setForm((prevState) => {
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
            </div>
            <button
              className="mb-[10px] w-[170px] text-white rounded py-1 bg-[#5C2D8B]"
              type="submit"
              onClick={handleSubmit}
            >
              Save
            </button>
            <button
              className="mb-7 flex items-center text-[#5C2D8B]"
              onClick={handleDelete}
            >
              <img
                src={deleteBin}
                alt="delete bin"
                style={{ width: "32px", height: "32px" }}
              />
              Delete
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
