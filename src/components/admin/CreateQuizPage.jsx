import React, { useContext, useEffect, useState } from "react";
import CreateCustomSider from "../../pages/CreateCustomSider";
import { QuestionContextAPI } from "./AdminContextAPI";
import Toastify from "toastify-js";
import { Radio } from "antd";
import { useDispatch, useSelector } from "react-redux";
import WithAuth from "../../auth/WithAuth";

const displayToast = (message) => {
  Toastify({
    text: message,
    duration: 2000,
    close: false,
    gravity: "top", // `top` or `bottom`
    position: "center", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      // background: "linear-gradient(to right, #00b09b, #96c93d)",
      background: "red",
    },
  }).showToast();
};

const CreateQuizPage = ({ quesData, quizDept, onQuestionSave }) => {
  // console.log("quesData", quesData);

  const [quesText, setquesText] = useState(quesData?.ques || "");
  const [optionArr, setoptionArr] = useState(quesData?.options || []);
  const [corrAns, setcorrAns] = useState(quesData?.correctAns || 0);
  const quizCode = useSelector((state) => state.quizData.quizCode);

  useEffect(() => {
    setquesText(quesData?.ques || "");
    setoptionArr(quesData?.options || []);
    setcorrAns(quesData?.correctAns || 0);
  }, [quesData]);

  const onQuesChange = (e) => {
    setquesText(e.target.value);
  };

  const onAnsChange = (e) => {
    setcorrAns(e.target.value);
  };

  const onOptionChange = (e, key) => {
    let prev = [...optionArr];
    prev[key] = e.target.value;
    setoptionArr(prev);
  };

  const verifySave = () => {
    if (quizDept === "") {
      displayToast("Please select a department!", "red");
    } else if (quesText.trim() === "") {
      displayToast("Please enter a question!", "red");
    } else if (corrAns === 0) {
      displayToast("Please select correct option!", "red");
    } else if (optionArr.findIndex((i) => i.trim() === "") !== -1) {
      displayToast("Please enter all options!", "red");
    } else {
      onQuestionSave({
        quesId: quesData._id,
        quizCode: quizCode,
        ques: quesText,
        correctAns: corrAns,
        options: optionArr,
        isSaved: true,
      });
    }
  };

  return (
    <div className="flex flex-col  rounded-lg  h-full items-center">
      {/* Question Container  */}
      <div className=" flex justify-center  items-center w-full h-[45%] ">
        <div className="w-[90%] h-[80%] rounded-lg flex justify-center  border-2 border-black text-3xl items-center ">
          <textarea
            placeholder="Enter your Question here"
            value={quesText}
            onChange={(e) => onQuesChange(e)}
            style={{ resize: "none" }}
            className="w-full h-full flex justify-center text-center pt-20 items-center bg-violet-300  rounded-lg"
          ></textarea>
        </div>
      </div>

      <div className="w-full flex flex-col items-center">
        <span className="text-xl">Choose correct answer</span>
        <Radio.Group
          className="w-full flex justify-evenly"
          onChange={(e) => onAnsChange(e)}
          value={parseInt(corrAns)}
        >
          <Radio className="w-[200px] flex justify-center" value={1}></Radio>
          <Radio className="w-[200px] flex justify-center" value={2}></Radio>
          <Radio className="w-[200px] flex justify-center" value={3}></Radio>
          <Radio className="w-[200px] flex justify-center" value={4}></Radio>
        </Radio.Group>
      </div>
      {/* Options Container  */}
      <div className="w-full flex flex-col justify-center items-center mt-3 h-[35%]">
        <div className="flex w-full justify-evenly">
          <div className=" w-[200px] h-[200px] rounded-lg border-2 border-black flex justify-center items-center text-xl">
            <textarea
              placeholder="Option 1"
              onChange={(e) => onOptionChange(e, 0)}
              value={optionArr[0]}
              style={{ resize: "none" }}
              className="w-full text-center h-full pt-20 px-3 block align-middle  bg-blue-300 rounded-lg "
            ></textarea>
          </div>
          <div className=" w-[200px] h-[200px] rounded-lg border-2 border-black flex justify-center items-center text-xl">
            <textarea
              placeholder="Option 2"
              onChange={(e) => onOptionChange(e, 1)}
              value={optionArr[1]}
              style={{ resize: "none" }}
              className="w-full text-center h-full pt-20 px-3 block align-middle  bg-red-300 rounded-lg "
            ></textarea>
          </div>
          <div className=" w-[200px] h-[200px] rounded-lg border-2 border-black flex justify-center items-center text-xl">
            <textarea
              placeholder="Option 3"
              onChange={(e) => onOptionChange(e, 2)}
              value={optionArr[2]}
              style={{ resize: "none" }}
              className="w-full text-center h-full pt-20 px-3 block align-middle  bg-green-300 rounded-lg "
            ></textarea>
          </div>
          <div className=" w-[200px] h-[200px] rounded-lg border-2 border-black flex justify-center items-center text-xl">
            <textarea
              placeholder="Option 4"
              onChange={(e) => onOptionChange(e, 3)}
              value={optionArr[3]}
              style={{ resize: "none" }}
              className="w-full text-center h-full pt-20 px-3 block align-middle  bg-yellow-300 rounded-lg "
            ></textarea>
          </div>
        </div>
      </div>

      {/* Save & delete button container  */}
      <div className="w-full flex justify-end items-center h-[9%]">
        <div className="me-8 flex justify-center">
          <button
            onClick={verifySave}
            className="bg-[#ca89fd] w-[70px] p-2 mx-3 rounded-lg font-medium"
          >
            Save
          </button>

          {/* {isSaved && existQuesId !== -1 ? ( */}
          {quesData?.isSaved === false ? null : (
            <button
              // onClick={verifyDelete}
              className="bg-[#04c1cc] w-[70px] p-2 mx-3 rounded-lg font-medium"
            >
              Delete
            </button>
          )}
          {/* ) : (
            ""
          )} */}
        </div>
      </div>
    </div>
  );
};

export default WithAuth(CreateQuizPage);
