import React, { useState } from "react";
import "../css/question_list.css";
import { useDispatch, useSelector } from "react-redux";
import { postServey } from "redux/userSlice";

export function QuestionList({ setServeyInfo, setModalVisible }) {
  const [disable, setDisable] = useState(false);
  const [options, setOptions] = useState([]);

  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const userId = useSelector((state) => state.userInfo.user.id);

  const handleCheckboxChange = (e) => {
    const checkboxes = document.querySelectorAll('input[type="radio"]');
    const checkboxesChecked = Array.from(checkboxes).filter(
      (checkbox) => checkbox.checked
    );
    setOptions((prevState) => {
      return [...prevState, e.target.id];
    });

    if (checkboxesChecked.length >= 2) {
      setDisable(true);
    }
  };

  const handleSubmit = () => {
    setServeyInfo(true);
    setModalVisible(false);
    dispatch(postServey({ options, userId, token }));
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
          <button onClick={handleSubmit}>Save</button>
        </div>
      </div>
    </div>
  );
}
