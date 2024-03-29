import React, { useContext, useEffect, useState } from "react";

import questionBank from "../questions/questionBank";
import OptionsContainer from "./OptionsContainer";
import ContextAPI from "./ContextAPI";
const Question = ({ ansArr, quesNo }) => {
  // console.log('Question Called!')

  const questionList = questionBank;

  const optionsArr = questionList[quesNo].options;

  return (
    <div className="question-box bg-gray-200 rounded-lg h-full">
      {/* Question Container  */}
      <div className="top-container  h-[40%] flex justify-center items-center ">
        <span className="text-4xl ms-5">
          {/* {quesNo}. {ques} */}
          {quesNo}. {questionList[quesNo].ques}
        </span>
      </div>

      {/* Below Container  */}
      <div className="below-container  h-[60%] flex  ">
        {/* Options Container  */}

        <OptionsContainer optionsArr={optionsArr} ansArr={ansArr} quesNo={quesNo} />

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

export default Question;
