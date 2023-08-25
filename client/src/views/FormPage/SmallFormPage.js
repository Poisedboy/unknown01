import { FormField } from "./FormField/FormField";
import deleteBin from "../../components/icons/delete.svg";
import close from "../../components/icons/close.svg";

import { FormHOC } from "./FormHOC";

export function SmallFormPage({
  openModal,
  type,
  handleSubmit,
  handleStateChange,
  handleCloseModal,
  handleDelete,
  smiles,
  form,
  setForm,
}) {
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

let WithFormPage = FormHOC(SmallFormPage);
export default WithFormPage;
