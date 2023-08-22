import React, { useState, useEffect } from "react";
import { QuestionListModal } from "views/Modals/QuestionListModal";
import { QuestionList } from "../question_list";

export const QuestionListHoc = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

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

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <QuestionListModal
      openModal={openModal}
      closeModal={closeModal}
      isMobile={isMobile}
      modalVisible={modalVisible}
    >
      <QuestionList />
    </QuestionListModal>
  );
};
