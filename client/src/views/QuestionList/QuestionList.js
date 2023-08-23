import React, { useState, useEffect } from "react";
import { QuestionListModal } from "views/Modals/QuestionListModal";
import { QuestionList } from "../question_list";
import { useSelector } from "react-redux";

export const QuestionListCalcSize = ({ setServeyInfo }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const serveyOptions = useSelector(
    (state) => state.userInfo.user.options_servey
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 959); // Adjust the breakpoint as needed
    };

    handleResize(); // Initial call to set the initial value
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setModalVisible(true);
    if (serveyOptions.lenght > 0) {
      setServeyInfo(true);
    }
  }, []);

  return (
    <QuestionListModal isMobile={isMobile} modalVisible={modalVisible}>
      <QuestionList
        setServeyInfo={setServeyInfo}
        setModalVisible={setModalVisible}
      />
    </QuestionListModal>
  );
};
