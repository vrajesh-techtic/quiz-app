import React, { useContext, useEffect, useState } from "react";
import CreateCustomSider from "./CreateCustomSider";
import { QuestionContextAPI } from "./AdminContextAPI";
import Toastify from "toastify-js";
import { Radio } from "antd";

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

const CreateQuizPage = ({
  currQues,
  quesText,
  setquesText,
  optionsArr,
  setOptionsArr,
  onSave,
  isSaved,
  onDelete,
  corrAns,
  setcorrAns,
}) => {
  // const [value, setValue] = useState(1);
  const onCorrectOption = (e) => {
    setcorrAns(e.target.value);
  };

  const { quesList, setquesList } = useContext(QuestionContextAPI);

  const existQuesId = quesList[currQues - 1].quesId;

  function onQuesChange(e) {
    setquesText(e.target.value);
  }

  function onOptionChange(e, key) {
    let newArr = [...optionsArr];
    const newval = e.target.value;
    newArr[key] = newval;
    setOptionsArr(() => newArr);
  }

  function verifySave() {
    if (quesText.trim() === "") {
      // alert("Please enter question correctly!");
      displayToast("Please enter question correctly!");
    } else if (corrAns === 0) {
      displayToast("Select correct answer!");
    } else if (optionsArr.findIndex((i) => i.trim() === "") !== -1) {
      // alert("Please enter all options correctly!");
      displayToast("Please enter all options correctly!");
    } else {
      onSave({
        quesId: existQuesId !== -1 ? existQuesId : currQues,
        ques: quesText,
        options: optionsArr,
        isSaved: true,
        answer: corrAns,
      });
    }
  }

  function verifyDelete() {
    const res = window.confirm("Are you sure you want to delete the question?");
    if (res) {
      onDelete(existQuesId);
    }
  }

  return (
    <div className="flex flex-col bg-black rounded-lg text-white h-full items-center">
      {/* Question Container  */}
      <div className=" flex justify-center  items-center w-full h-[45%] ">
        <div className="w-[90%] h-[80%] rounded-lg flex justify-center  border-2 border-black text-3xl items-center ">
          <textarea
            placeholder="Enter your Question here"
            value={quesText}
            onChange={(e) => onQuesChange(e)}
            style={{ resize: "none" }}
            className="w-full h-full flex justify-center text-center pt-20 items-center bg-gray-500 text-white rounded-lg"
          ></textarea>
        </div>
      </div>

      <div className="w-full flex flex-col items-center">
        <span className="text-xl">Choose correct answer</span>
        <Radio.Group
          className="w-full flex justify-evenly"
          onChange={onCorrectOption}
          value={corrAns}
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
              value={optionsArr[0]}
              style={{ resize: "none" }}
              className="w-full text-center h-full pt-20 px-3 block align-middle  bg-blue-500 rounded-lg "
            ></textarea>
          </div>
          <div className=" w-[200px] h-[200px] rounded-lg border-2 border-black flex justify-center items-center text-xl">
            <textarea
              placeholder="Option 2"
              onChange={(e) => onOptionChange(e, 1)}
              value={optionsArr[1]}
              style={{ resize: "none" }}
              className="w-full text-center h-full pt-20 px-3 block align-middle  bg-red-500 rounded-lg "
            ></textarea>
          </div>
          <div className=" w-[200px] h-[200px] rounded-lg border-2 border-black flex justify-center items-center text-xl">
            <textarea
              placeholder="Option 3"
              onChange={(e) => onOptionChange(e, 2)}
              value={optionsArr[2]}
              style={{ resize: "none" }}
              className="w-full text-center h-full pt-20 px-3 block align-middle  bg-green-500 rounded-lg "
            ></textarea>
          </div>
          <div className=" w-[200px] h-[200px] rounded-lg border-2 border-black flex justify-center items-center text-xl">
            <textarea
              placeholder="Option 4"
              onChange={(e) => onOptionChange(e, 3)}
              value={optionsArr[3]}
              style={{ resize: "none" }}
              className="w-full text-center h-full pt-20 px-3 block align-middle  bg-yellow-500 rounded-lg "
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

          {isSaved && existQuesId !== -1 ? (
            <button
              onClick={verifyDelete}
              className="bg-[#04c1cc] w-[70px] p-2 mx-3 rounded-lg font-medium"
            >
              Delete
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateQuizPage;
