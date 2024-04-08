import React, { useContext, useEffect, useState } from "react";
import CreateCustomSider from "./CreateCustomSider";
import { QuestionContextAPI } from "./AdminContextAPI";

const CreateQuizPage = ({ quesData }) => {
  const { quesList, setquesList } = useContext(QuestionContextAPI);

  const [quesText, setquesText] = useState(quesData.content);
  const [optionsArr, setOptionsArr] = useState(["", "", "", ""]);

  console.log("quesData.options", quesData.options);
  // const [currData, setCurrData] = useState(quesData);

  useEffect(() => {
    // setCurrData({ ...quesData, quesId: quesList.length + 1 });
    setOptionsArr(quesData.options);
  }, [quesData.options]);

  // console.log("{currData.content}", currData.content);

  function onQuesChange(e) {
    setquesText(e.target.value);
  }

  function onOptionChange(e, key) {
    let newArr = optionsArr;
    // newArr[key] = e.target.value.trim();
    newArr.splice(key, 1, e.target.value);
    console.log(newArr);

    setOptionsArr(newArr);

    // console.log("key", key);

    // let newOptions = optionsArr;

    // setOptionsArr(newOptions);
  }
  function onSave() {
    let obj = {
      content: quesText,
      options: optionsArr,
    };

    setquesList((prev) => {
      let arr = prev;
      arr.push(obj);
      return arr;
    });

    // if (quesList.findIndex((i) => i.quesId === currData.quesId) === -1) {
    //   setquesList([
    //     { ...currData, options: optionsArr },
    //     ...quesList.map((x) => {
    //       if (x?.quesId == -1) {
    //         x.options = [null, null, null, null];
    //       }
    //       return x;
    //     }),
    //   ]);
    //   setOptionsArr(["", "", "", ""]);
    // } else {
    //   console.log("Updated");
    // }
    // setquesList([{ ...currData, quesId: quesList.length + 1 }, ...quesList]);
  }

  console.log("quesList", quesList);

  // function onSave() {
  //   let isEmpty = false;
  //   for (let i = 0; i < optionsArr.length; i++) {
  //     if (optionsArr[i] === null || optionsArr[i].trim() === "") {
  //       isEmpty = true;
  //     }
  //   }
  //   if (isEmpty) {
  //     alert("Please enter all options correctly!");
  //   } else {
  //     alert("Questions added successfully!");

  //     const obj = {
  //       quesId: quesList.length,
  //       content: quesText,
  //       options: optionsArr,
  //     };

  //     setquesList((prev) => [obj, ...prev]);
  //   }
  // }

  return (
    <div className="flex flex-col h-full items-center">
      {/* Question Container  */}
      <div className=" flex justify-center items-center w-full h-[50%] ">
        <div className="w-[90%] h-[80%] rounded-lg flex justify-center border-2 border-black text-3xl items-center ">
          <textarea
            placeholder="Enter your Question here"
            value={quesText}
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
              value={optionsArr[0]}
              style={{ resize: "none" }}
              className="w-full text-center h-full pt-20 px-3 block align-middle  bg-blue-300 rounded-lg "
            ></textarea>
          </div>
          <div className=" w-[200px] h-[200px] rounded-lg border-2 border-black flex justify-center items-center text-xl">
            <textarea
              placeholder="Option 2"
              onChange={(e) => onOptionChange(e, 1)}
              value={optionsArr[1]}
              style={{ resize: "none" }}
              className="w-full text-center h-full pt-20 px-3 block align-middle  bg-red-300 rounded-lg "
            ></textarea>
          </div>
          <div className=" w-[200px] h-[200px] rounded-lg border-2 border-black flex justify-center items-center text-xl">
            <textarea
              placeholder="Option 3"
              onChange={(e) => onOptionChange(e, 2)}
              value={optionsArr[2]}
              style={{ resize: "none" }}
              className="w-full text-center h-full pt-20 px-3 block align-middle  bg-green-300 rounded-lg "
            ></textarea>
          </div>
          <div className=" w-[200px] h-[200px] rounded-lg border-2 border-black flex justify-center items-center text-xl">
            <textarea
              placeholder="Option 4"
              onChange={(e) => onOptionChange(e, 3)}
              value={optionsArr[3]}
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
