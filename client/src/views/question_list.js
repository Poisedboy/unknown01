import React, { useState } from "react";
import "../css/question_list.css";
import { useNavigate } from "react-router-dom";

export function QuestionList() {
  const [disable, setDisable] = useState(false);
  const navigate = useNavigate();

  const handleCheckboxChange = (e) => {
    const checkboxes = document.querySelectorAll('input[type="radio"]');
    const checkboxesChecked = Array.from(checkboxes).filter(
      (checkbox) => checkbox.checked
    );

    if (checkboxesChecked.length >= 2) {
      navigate("/note-editor");
    }
  };

  return (
    <div>
      <div className="questionWrapper">
        <p className="mainTitle">You want to use Writaa for</p>
        <div className="listBox">
          <div className="checkboxField">
            <label htmlFor="novel" className="labelText">
              Writting novel
            </label>
            <input
              id="novel"
              type="radio"
              className="customCheckbox"
              disabled={disable}
              onChange={handleCheckboxChange}
            />
          </div>

          <div className="checkboxField">
            <label htmlFor="non-fiction" className="labelText">
              Writting non-fiction
            </label>
            <input
              id="non-fiction"
              type="radio"
              className="customCheckbox"
              disabled={disable}
              onChange={handleCheckboxChange}
            />
          </div>

          <div className="checkboxField">
            <label htmlFor="blog" className="labelText">
              Writting a blog
            </label>
            <input
              id="blog"
              type="radio"
              className="customCheckbox"
              disabled={disable}
              onChange={handleCheckboxChange}
            />
          </div>

          <div className="checkboxField">
            <label htmlFor="other" className="labelText">
              Other
            </label>
            <input
              id="other"
              type="radio"
              className="customCheckbox"
              disabled={disable}
              onChange={handleCheckboxChange}
            />
          </div>
        </div>
        <div className="btn">
          <button>Save</button>
        </div>
      </div>
    </div>
  );
}
