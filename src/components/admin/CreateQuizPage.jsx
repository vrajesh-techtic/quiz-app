import React, { useContext, useState } from "react";
import CreateCustomSider from "./CreateCustomSider";
import { QuestionContextAPI } from "./AdminContextAPI";

const CreateQuizPage = ({ currQues, setCurrQues }) => {
  const [quesText, setQuesText] = useState("");
  const [optionsArr, setOptionsArr] = useState([null, null, null, null]);

  const { quesList, setquesList } = useContext(QuestionContextAPI);

  console.log("create quiz page", currQues);

  // console.log(quesList[currQues-1].options[0]);

  function onQuesChange(e) {
    setQuesText(e.target.value);
  }

  function onOptionChange(e, key) {
    setOptionsArr((prev) => {
      let newArr = prev;
      newArr[key] = e.target.value.trim();
      return newArr;
    });
  }

  function onSave() {
    if (quesText.trim() === "") {
      alert("Please enter question!");
    } else {
      let isEmpty = false;
      for (let i = 0; i < optionsArr.length; i++) {
        if (optionsArr[i] === null || optionsArr[i].trim() === "") {
          isEmpty = true;
        }
      }
      if (isEmpty) {
        alert("Please enter all options correctly!");
      } else {
        alert("Questions added successfully!");

        const obj = {
          content: quesText,
          options: optionsArr,
        };

        setquesList((prev) => [...prev, obj]);
      }
    }
  }

  return (
    <div className="flex flex-col h-full items-center">
      {/* Question Container  */}
      <div className=" flex justify-center items-center w-full h-[50%] ">
        <div className="w-[90%] h-[80%] rounded-lg flex justify-center border-2 border-black text-3xl items-center ">
          <textarea
            placeholder="Enter your Question here"
            defaultValue={
              quesList.length !== 0 ? quesList[currQues - 1].content : ""
            }
            onChange={(e) => onQuesChange(e)}
            style={{ resize: "none" }}
            className="w-full h-full flex justify-center text-center pt-20 items-center bg-purple-300 rounded-lg"
          ></textarea>
        </div>
      </div>

      {/* Options Container  */}
      <div className="w-full flex justify-center items-center h-[40%]">
        <div className="flex w-full justify-evenly">
          <div className=" w-[200px] h-[200px] rounded-lg border-2 border-black flex justify-center items-center text-xl">
            <textarea
              placeholder="Option 1"
              onChange={(e) => onOptionChange(e, 0)}
              defaultValue={
                quesList.length !== 0 ? quesList[currQues - 1].options[0] : ""
              }
              style={{ resize: "none" }}
              className="w-full text-center h-full pt-20 px-3 block align-middle  bg-blue-300 rounded-lg "
            ></textarea>
          </div>
          <div className=" w-[200px] h-[200px] rounded-lg border-2 border-black flex justify-center items-center text-xl">
            <textarea
              defaultValue={
                quesList.length !== 0 ? quesList[currQues - 1].options[1] : ""
              }
              placeholder="Option 2"
              onChange={(e) => onOptionChange(e, 1)}
              style={{ resize: "none" }}
              className="w-full text-center h-full pt-20 px-3 block align-middle  bg-red-300 rounded-lg "
            ></textarea>
          </div>
          <div className=" w-[200px] h-[200px] rounded-lg border-2 border-black flex justify-center items-center text-xl">
            <textarea
              defaultValue={
                quesList.length !== 0 ? quesList[currQues - 1].options[2] : ""
              }
              placeholder="Option 3"
              onChange={(e) => onOptionChange(e, 2)}
              style={{ resize: "none" }}
              className="w-full text-center h-full pt-20 px-3 block align-middle  bg-green-300 rounded-lg "
            ></textarea>
          </div>
          <div className=" w-[200px] h-[200px] rounded-lg border-2 border-black flex justify-center items-center text-xl">
            <textarea
              defaultValue={
                quesList.length !== 0 ? quesList[currQues - 1].options[3] : ""
              }
              placeholder="Option 4"
              onChange={(e) => onOptionChange(e, 3)}
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
            onClick={onSave}
            className="bg-[#ca89fd] w-[70px] p-2 mx-3 rounded-lg font-medium"
          >
            Save
          </button>
          <button className="bg-[#04c1cc] w-[70px] p-2 mx-3 rounded-lg font-medium">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateQuizPage;
