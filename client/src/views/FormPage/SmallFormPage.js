import { useState } from "react";
import { FormField } from "./FormField/FormField";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import deleteBin from "../../components/icons/delete.svg";
import extremelySadIcon from "../../components/icons/Extremely Sad.png";
import neutralIcon from "../../components/icons/Neutral.png";
import sadIcon from "../../components/icons/Emoticon - Sad.png";
import happyIcon from "../../components/icons/Happy.png";
import extremelyHappyIcon from "../../components/icons/Extremely Happy.png";
import close from "../../components/icons/close.svg";
import { addMetaData, deleteSprint } from "redux/noteEditorSlice";

const smiles = [
  { id: 0, title: "excited", img: extremelyHappyIcon },
  { id: 1, title: "good", img: happyIcon },
  { id: 2, title: "normal", img: sadIcon },
  { id: 3, title: "sad", img: neutralIcon },
  { id: 4, title: "extremely sad", img: extremelySadIcon },
];

export function SmallFormPage({
  openModal,
  closeModal,
  sprintId,
  setIsStopped,
  setStatus,
  STATUS,
  type,
}) {
  const [form, setForm] = useState({
    title: "",
    project: "",
    emotion: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(form);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addMetaData({ form, sprintId }));
    if (type === "Save") {
      navigate("/dashboard");
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

  const handleClose = () => {
    closeModal(false);
    setIsStopped(false);
    setStatus(STATUS.STARTED);
  };

  const handleDelete = () => {
    console.log(type, "type");
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
    openModal && (
      <div className="fixed w-full inset-0 top-[165px] flex items-center justify-center z-50">
        <div className="rounded-t-2xl h-[100%] border-2 bg-white overflow-hidden transform transition-all">
          <div className="bg-white h-[70vh] p-4">
            <form className="inline-block w-[90vw] sm:w-[50vw] lg:w-[35vw]">
              <div className="flex justify-start items-center flex-col">
                <div className="w-full">
                  <div>
                    <h2 className="relative uppercase text-center text-2xl text-black my-5">
                      {type} Sprint
                    </h2>
                  </div>
                  <div className="absolute end-9 top-9 ">
                    <button>
                      <img
                        src={close}
                        alt="close"
                        onClick={handleClose}
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
                <div className="w-[80vw] sm:w-[45vw] lg:w-[30vw]">
                  <h4 className="mt-5 font-bold">How did it feel?</h4>
                  <ul className="flex p-2 mb-4 gap-2">
                    {smiles.map((smile) => (
                      <li key={smile.id}>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            setForm((prevState) => {
                              return {
                                ...prevState,
                                emotion: smile.img,
                              };
                            });
                          }}
                        >
                          <img src={smile.img} alt="smile" />
                        </button>
                      </li>
                    ))}
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
                  onClick={handleDelete}
                  className="mb-7 flex items-center text-[#5C2D8B]"
                  // onClick={() => navigate("/")}
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
          </div>
        </div>
      </div>
    )
  );
}
