import React, { useContext, useEffect, useState } from "react";

import questionBank from "../questions/questionBank";
import OptionsContainer from "./OptionsContainer";
import ContextAPI from "./ContextAPI";
const Question = ({ quesNo = 1, btnDisable, userAns, correctAns }) => {
  // console.log('Question Called!')

  // Getting main object of Questions JSON file

  // const [questionObj, setQuestionObj] = useState(questionBank);
  const { questionObj, setQuestionObj } = useContext(ContextAPI);

  const [selectedAns, setselectedAns] = useState(
    questionObj.at(quesNo).selected
  );

  // Obtaining Question
  const ques = questionObj.at(quesNo).ques;
  // Obtaining all four options
  const optionsArr = questionObj.at(quesNo).options;

  useEffect(() => {
    setQuestionObj((prev) => {
      prev.at(quesNo).selected = selectedAns;
      return prev;
    });
  }, [selectedAns]);

  return (
    <div className="question-box bg-gray-200 rounded-lg h-full">
      {/* Question Container  */}
      <div className="top-container  h-[40%] flex justify-center items-center ">
        <span className="text-4xl ms-5">
          {quesNo}. {ques}
        </span>
      </div>

      {/* Below Container  */}
      <div className="below-container  h-[60%] flex  ">
        {/* Options Container  */}

        <OptionsContainer
          optionsArr={optionsArr}
          questionObj={questionObj}
          setQuestionObj={setQuestionObj}
          selectedAns={selectedAns}
          setselectedAns={setselectedAns}
          quesNo={quesNo}
          btnDisable={btnDisable}
          userAns={userAns}
          correctAns={correctAns}
        />
      </div>
    </div>
  );
};

export default Question;
