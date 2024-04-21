import React, { useContext, useEffect, useState } from "react";

import ContextAPI from "../components/participants/ContextAPI";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import ParticipantWithoutAuth from "../auth/ParticipantWithoutAuth";
import { useParams } from "react-router-dom";
import axios from "axios";
import useToast from "../components/NotificationPopup";

const ResultPage = () => {
  const params = useParams();
  const [resultData, setResultData] = useState();
  const { contextHolder, showToast } = useToast();
  const quizCode = params.id;
  const user_id = sessionStorage.getItem("token");

  const sendResult = () => {
    if (!resultData) {
      showToast("error", "No Result found!");
    } else {
      showToast("success", "Result sent on your registered email address");
    }
  };
  useEffect(() => {
    async function fetchResult() {
      const obj = { user_id, quizCode };
      const api = await axios
        .post("http://localhost:5000/get-result", obj)
        .then((res) => res.data);

      if (api.status) {
        setResultData(api?.data);
      } else {
        showToast("error", api.message);
      }
      // sessionStorage.removeItem('token')
    }

    fetchResult();
  }, []);

  console.log("resultData", resultData);

  const percentage = (resultData?.accuracy || 0).toFixed(2);

  return (
    <>
      {contextHolder}
      <div className="h-screen flex items-center">
        <div className="result-main-container h-fit mx-auto w-[40%] flex flex-col items-center bg-gray-100 py-8 rounded-xl">
          <span className="text-3xl font-medium">Congratulations!</span>

          <div
            style={{ border: "solid 1px #d9d8d9" }}
            className=" w-[70%] mt-4"
          ></div>
          <div className="message w-[80%]  text-center text-xl my-7">
            Hey,{" "}
            <span className="font-medium">
              {resultData ? resultData?.name + ". " : "Unknown. "}
            </span>
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
                <span className=" font-medium text-4xl">
                  {resultData?.totalScore || 0}
                </span>
              </CircularProgressbarWithChildren>
            </div>
          </div>

          <div className="result-details-container flex">
            {/* Left Side Container  */}
            <div className="">
              <div className="totalQueContainer flex flex-col w-[170px] rounded-lg bg-blue-300  mx-2 text-center py-3 my-5 ">
                <span>Total Questions</span>
                <span className="font-medium text-3xl">
                  {resultData?.totalQuizQuestions || 0}
                </span>
              </div>
              <div className="attemptedContainer flex flex-col w-[170px] rounded-lg bg-green-300 mx-2 text-center py-3 my-5 ">
                <span>Attempted</span>
                <span className="font-medium text-3xl">
                  {resultData?.totalAttempted || 0}
                </span>
              </div>
            </div>
            {/* Right Side Container  */}
            <div className="">
              <div className="attemptedContainer flex flex-col w-[170px] rounded-lg bg-yellow-300 mx-2 text-center py-3 my-5 ">
                <span>Wrong</span>
                <span className="font-medium text-3xl">
                  {resultData?.totalAttempted - resultData?.totalScore || 0}
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

          <button
            // disabled={ true : false}
            onClick={sendResult}
            className="email-container bg-black hover:shadow-xl text-white font-medium text-lg p-3 rounded-lg"
          >
            Email your Result
          </button>
        </div>
      </div>
    </>
  );
};

export default ParticipantWithoutAuth(ResultPage);
