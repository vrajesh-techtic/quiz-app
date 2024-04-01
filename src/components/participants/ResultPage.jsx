import React, { useContext, useState } from "react";

import ContextAPI from "./ContextAPI";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";

function calculateResult(finalAns, correctAnsArr) {
  let score = 0;
  let unAttempted = 0;
  for (let i = 1; i < correctAnsArr.length; i++) {
    if (correctAnsArr[i] === finalAns[i]) score++;
    else if (finalAns[i] === null) unAttempted++;
  }

  return { score, unAttempted };
}

const ResultPage = () => {
  const finalAns = JSON.parse(localStorage.getItem("userAns"));
  const [userAns, questionBank] = useContext(ContextAPI);
  const correctAnsArr = questionBank.map((i) => i.answer);
  const resultDetails = calculateResult(finalAns, correctAnsArr);
  const score = resultDetails.score;
  const totalQues = questionBank.length - 1;
  const unAttempted = resultDetails.unAttempted;

  console.log("unAttempted", unAttempted);
  const percentage = ((score / (totalQues - unAttempted)) * 100).toFixed(2);

  return (
    <>
      <div className="h-screen flex items-center">
        <div className="result-main-container h-fit mx-auto w-[40%] flex flex-col items-center bg-gray-100 py-8 rounded-xl">
          <span className="text-3xl font-medium">Congratulations!</span>

          <div
            style={{ border: "solid 1px #d9d8d9" }}
            className=" w-[70%] mt-4"
          ></div>
          <div className="message w-[80%]  text-center text-xl my-7">
            You've completed the Quiz. It was super fun with you. We hope you've
            enjoyed today!
          </div>
          <div className="score-card text-xl">
            <span>Your Quiz Score is:</span>
            <div style={{ width: 100, height: 100 }} className="mx-auto my-5">
              <CircularProgressbarWithChildren
                value={isNaN(percentage) ? 0 : percentage}
                strokeWidth={9}
                styles={buildStyles({
                  textColor: "red",
                  pathColor: "#0cd8b1",
                  trailColor: "#c2f3df",
                })}
              >
                <span className=" font-medium text-4xl">{score}</span>
              </CircularProgressbarWithChildren>
            </div>
          </div>

          <div className="result-details-container flex">
            {/* Left Side Container  */}
            <div className="">
              <div className="totalQueContainer flex flex-col w-[170px] rounded-lg bg-blue-300  mx-2 text-center py-3 my-5 ">
                <span>Total Questions</span>
                <span className="font-medium text-3xl">{totalQues}</span>
              </div>
              <div className="attemptedContainer flex flex-col w-[170px] rounded-lg bg-green-300 mx-2 text-center py-3 my-5 ">
                <span>Attempted</span>
                <span className="font-medium text-3xl">
                  {totalQues - unAttempted}
                </span>
              </div>
            </div>
            {/* Right Side Container  */}
            <div className="">
              <div className="attemptedContainer flex flex-col w-[170px] rounded-lg bg-yellow-300 mx-2 text-center py-3 my-5 ">
                <span>Wrong</span>
                <span className="font-medium text-3xl">
                  {totalQues - unAttempted - score}
                </span>
              </div>
              <div className="attemptedContainer flex flex-col w-[170px] rounded-lg bg-violet-300 mx-2 text-center py-3 my-5 ">
                <span>Accuracy</span>
                <span className="font-medium text-3xl">
                  {isNaN(percentage) ? 0 : percentage}%
                </span>
              </div>
            </div>
          </div>

          <button className="email-container bg-black hover:shadow-xl text-white font-medium text-lg p-3 rounded-lg">
            Email your Result
          </button>
        </div>
      </div>
    </>
  );
};

export default ResultPage;
