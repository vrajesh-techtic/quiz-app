import { Radio } from "antd";
import React, { useEffect, useState } from "react";
import ParticipantWithAuth from "../../auth/ParticipantWithAuth";
import axios from "axios";
import useToast from "../NotificationPopup";

const OptionsContainer = ({ ansArr, setansArr, quesNo, quesList, code }) => {
  const [selectedAns, setSelectedAns] = useState(ansArr[quesNo]);
  const { contextHolder, showToast } = useToast();
  const optionsArr = quesList[quesNo - 1]?.options || ["", "", "", ""];

  const onSelect = async (key) => {
    setansArr((prev) => {
      let newObj = prev;
      newObj[quesNo] = optionsArr[key];
      return newObj;
    });

    const userAns = key + 1;
    const user_id = sessionStorage.getItem("token");
    const quizCode = code;
    const quesId = quesList[quesNo - 1]?._id;

    const obj = {
      userAns,
      user_id,
      quizCode,
      quesId,
    };

    console.log("obj", obj);

    const attemptQues = await axios
      .post("http://localhost:5000/attempt-question", obj)
      .then((res) => res.data);

    if (attemptQues.status) {
      showToast("success", attemptQues.message);
    } else {
      showToast("error", attemptQues.message);
    }
  };

  // console.log("selectedAns", selectedAns);

  return (
    <>
      {contextHolder}
      <div className="options-container  w-full flex flex-col  justify-center">
        <Radio.Group
          value={ansArr[quesNo]}
          optionType="button"
          onChange={(e) => {
            setSelectedAns(e.target.value);
          }}
          buttonStyle
          className="flex flex-col h-[90%]  px-5 py-5"
        >
          <div className="flex text-center h-full my-3 w-full">
            {/* 1st option  */}
            <Radio
              onClick={() => {
                console.log("quesList[quesNo - 1]", quesList[quesNo - 1]);
                onSelect(0);
              }}
              value={optionsArr[0]}
              className="flex mx-3 h-full rounded-lg hover:shadow-xl items-center text-2xl bg-yellow-300 w-1/2 justify-center px-5"
            >
              {optionsArr[0]}
            </Radio>

            {/* 2nd Option  */}
            <Radio
              onClick={() => {
                onSelect(1);
              }}
              value={optionsArr[1]}
              className="flex mx-3 h-full rounded-lg hover:shadow-xl items-center text-2xl bg-red-300 w-1/2 justify-center px-5"
            >
              {optionsArr[1]}
            </Radio>

            {/* 3rd option  */}
            <Radio
              onClick={() => {
                onSelect(2);
              }}
              value={optionsArr[2]}
              className="flex mx-3 h-full rounded-lg hover:shadow-xl items-center text-2xl bg-blue-300 w-1/2 justify-center px-5"
            >
              {optionsArr[2]}
            </Radio>

            {/* 4th option  */}
            <Radio
              onClick={() => {
                onSelect(3);
              }}
              value={optionsArr[3]}
              className="flex mx-3 h-full rounded-lg hover:shadow-xl items-center text-2xl bg-green-300 w-1/2 justify-center px-5"
            >
              {optionsArr[3]}
            </Radio>
          </div>
        </Radio.Group>
      </div>
    </>
  );
};

export default ParticipantWithAuth(OptionsContainer);
