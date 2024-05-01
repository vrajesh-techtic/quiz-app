import React from "react";
import OptionsContainer from "./OptionsContainer";
import ParticipantWithAuth from "../../auth/ParticipantWithAuth";
const Question = ({
  userAns,
  quesNo,
  selectedAns,
  setSelectedAns,
  setansArr,
  quesList,
  quizCode,
}) => {
  return (
    <div className="question-box bg-gray-200 rounded-lg h-[90%]">
      {/* Question Container  */}
      <div className="top-container  h-[40%] flex justify-center items-center ">
        <span className="text-4xl ms-5">
          {quesNo}. {quesList[quesNo - 1]?.ques}
        </span>
      </div>

      {/* Below Container  */}
      <div className="below-container  h-[60%] flex  ">
        {/* Options Container  */}

        <OptionsContainer
          code={quizCode}
          setansArr={setansArr}
          selectedAns={selectedAns}
          setSelectedAns={setSelectedAns}
          ansArr={userAns}
          quesNo={quesNo}
          quesList={quesList}
        />
      </div>
    </div>
  );
};

export default ParticipantWithAuth(Question);
