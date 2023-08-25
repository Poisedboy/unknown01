import { Modal } from "views/Modals/Modal";
import { FormField } from "./FormField/FormField";
import deleteBin from "../../components/icons/delete.svg";
import close from "../../components/icons/close.svg";
import { FormHOC } from "./FormHOC";

function FormPage({
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

let WithFormPage = FormHOC(FormPage);
export default WithFormPage;
