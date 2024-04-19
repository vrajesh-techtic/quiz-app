import React, { useContext, useEffect, useState } from "react";

import questionBank from "../../questions/questionBank";
import OptionsContainer from "./OptionsContainer";
import ContextAPI from "./ContextAPI";
import ParticipantWithoutAuth from "../../auth/ParticipantWithoutAuth";
const Question = ({
  userAns,
  quesNo,
  selectedAns,
  setSelectedAns,
  setansArr,
  quesList,
}) => {
  // console.log('Question Called!')

  return (
    <div className="question-box bg-gray-200 rounded-lg h-[90%]">
      {/* Question Container  */}
      <div className="top-container  h-[40%] flex justify-center items-center ">
        <span className="text-4xl ms-5">
          {/* {quesNo}. {ques} */}
          {quesNo}. {quesList[quesNo - 1]?.ques}
        </span>
      </div>

      {/* Below Container  */}
      <div className="below-container  h-[60%] flex  ">
        {/* Options Container  */}

        <OptionsContainer
          // optionsArr={optionsArr}
          setansArr={setansArr}
          selectedAns={selectedAns}
          setSelectedAns={setSelectedAns}
          ansArr={userAns}
          quesNo={quesNo}
          quesList={quesList}
        />

        {/* <OptionsContainer
          optionsArr={optionsArr}
          questionObj={questionObj}
          setQuestionObj={setQuestionObj}
          selectedAns={selectedAns}
          setselectedAns={setselectedAns}
          quesNo={quesNo}
          btnDisable={btnDisable}
          userAns={userAns}
          correctAns={correctAns}
        /> */}
      </div>
    </div>
  );
};

export default ParticipantWithoutAuth(Question);
