import React, { useContext, useEffect, useState } from "react";
import { QuestionContextAPI } from "./AdminContextAPI";
import api from "../../database/apiCall";
import { useDispatch, useSelector } from "react-redux";
import { demoActions } from "../../store";
import { all } from "axios";
import WithAuth from "../../auth/WithAuth";

// const quesList = [
//   {
//     id: 1,
//     content: "What is Capital of India ?",
//     options: ["Gujarat", "Rajasthan", "New Delhi", "Mumbai"],
//     correctAns: "New Delhi",
//   },
//   {
//     id: 2,
//     content: "What is Capital of Pakistan ?",
//     options: ["Islamabad", "Karachi", "Kargil", "Lahore"],
//     correctAns: "Islamabad",
//   },
//   {
//     id: 3,
//     content: "What is Capital of China ?",
//     options: ["Beijing", "Shanghai", "Wuhan", "Korea"],
//     correctAns: "Beijing",
//   },
//   {
//     id: 4,
//     content: "What is Capital of USA ?",
//     options: ["Washington DC", "Toronto", "Chicago", "Texas"],
//     correctAns: "Washington DC",
//   },
// ];

const CreateSider = ({ allQues, currQues, setCurrQues }) => {
  // console.log(existQuizData);
  // quesList.sort((a, b) => {
  //   if (a.quesId === -1 || b.quesId === -1) {
  //     return 1;
  //   } else {
  //     return a.quesId - b.quesId;
  //   }
  // });

  const [quesList, setquesList] = useState([]);

  return (
    <div className="w-[230px] flex flex-col items-center bg-gray-100 h-full">
      <div className="mt-4">
        <span className="text-2xl my-3 font-medium">Question List</span>
      </div>

      {/* Question List  */}
      <div className="create-ques-list  overflow-auto flex flex-col items-center  mt-5 w-full">
        <ul className="w-[80%] h-full mx-3 ">
          {allQues.length === 0 ? (
            <li
              style={{
                backgroundColor: "#ca89fd",
              }}
              // onClick={() => setCurrQues(key + 1)}
              className="cursor-pointer rounded-lg  my-2 p-2 text-center w-full"
            >
              Create Question
            </li>
          ) : (
            allQues.map((i, key) => (
              <li
                key={key}
                style={{
                  backgroundColor: currQues === key + 1 ? "#ca89fd" : "#04c1cc",
                }}
                onClick={() => setCurrQues(key + 1)}
                className="cursor-pointer rounded-lg  my-2 p-2 text-center w-full"
              >
                {key < allQues.length - 1
                  ? `Question ${key + 1}`
                  : "Create Question"}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default WithAuth(CreateSider);
