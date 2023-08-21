import React, { useState } from "react";
import "../css/question_list.css";
import { useNavigate } from "react-router-dom";

export function QuestionList() {
  const [disable, setDisable] = useState(false);
  const navigate = useNavigate();

  const handleCheckboxChange = (e) => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const checkboxesChecked = Array.from(checkboxes).filter(
      (checkbox) => checkbox.checked
    );

    if (checkboxesChecked.length >= 2) {
      navigate("/note-editor");
    }
  };

  return (
    <div className="wrapper">
      <div className="questionWrapper">
        <h3 className="mainTitle">
          What kind of writting projects will you be using writaa for?
        </h3>
        <p className="underTitle">
          This helps us improve Writaa to better serve you writting needs
        </p>
        <div className="listBox">
          <div className="checkboxField">
            <input
              id="novel"
              type="checkbox"
              className="customCheckbox"
              disabled={disable}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="novel" className="labelText">
              Writting novel
            </label>
          </div>

          <div className="checkboxField">
            <input
              id="non-fiction"
              type="checkbox"
              className="customCheckbox"
              disabled={disable}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="non-fiction" className="labelText">
              Writting non-fiction
            </label>
          </div>

          <div className="checkboxField">
            <input
              id="blog"
              type="checkbox"
              className="customCheckbox"
              disabled={disable}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="blog" className="labelText">
              Writting a blog
            </label>
          </div>

          <div className="checkboxField">
            <input
              id="other"
              type="checkbox"
              className="customCheckbox"
              disabled={disable}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="other" className="labelText">
              Other
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
