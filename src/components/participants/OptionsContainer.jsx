import { Radio } from "antd";
import React, { useEffect, useState } from "react";
import ParticipantWithoutAuth from "../../auth/ParticipantWithoutAuth";

const OptionsContainer = ({ ansArr, setansArr, quesNo, quesList }) => {
  const [selectedAns, setSelectedAns] = useState(ansArr[quesNo]);

  const optionsArr = quesList[quesNo - 1]?.options || ["", "", "", ""];

  return (
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
            onClick={() =>
              setansArr((prev) => {
                let newObj = prev;
                newObj[quesNo] = optionsArr[0];
                return newObj;
              })
            }
            value={optionsArr[0]}
            className="flex mx-3 h-full rounded-lg hover:shadow-xl items-center text-2xl bg-yellow-300 w-1/2 justify-center px-5"
          >
            {optionsArr[0]}
          </Radio>

          {/* 2nd Option  */}
          <Radio
            onClick={() =>
              setansArr((prev) => {
                let newObj = prev;
                newObj[quesNo] = optionsArr[1];
                return newObj;
              })
            }
            value={optionsArr[1]}
            className="flex mx-3 h-full rounded-lg hover:shadow-xl items-center text-2xl bg-red-300 w-1/2 justify-center px-5"
          >
            {optionsArr[1]}
          </Radio>

          {/* 3rd option  */}
          <Radio
            onClick={() =>
              setansArr((prev) => {
                let newObj = prev;
                newObj[quesNo] = optionsArr[2];
                return newObj;
              })
            }
            value={optionsArr[2]}
            className="flex mx-3 h-full rounded-lg hover:shadow-xl items-center text-2xl bg-blue-300 w-1/2 justify-center px-5"
          >
            {optionsArr[2]}
          </Radio>

          {/* 4th option  */}
          <Radio
            onClick={() =>
              setansArr((prev) => {
                let newObj = prev;
                newObj[quesNo] = optionsArr[3];
                return newObj;
              })
            }
            value={optionsArr[3]}
            className="flex mx-3 h-full rounded-lg hover:shadow-xl items-center text-2xl bg-green-300 w-1/2 justify-center px-5"
          >
            {optionsArr[3]}
          </Radio>
        </div>
      </Radio.Group>

      {/* <div className="flex text-center h-full my-3 w-full">
          <Radio
            style={
              btnDisable
                ? (correctAns.find((i) => i === optionsArr[0])
                    ? { border: "solid 5px", borderColor: "green" }
                    : null) ||
                  (userAns.find((i) => i === optionsArr[0])
                    ? { border: "solid 5px", borderColor: "red" }
                    : null)
                : null
            }
            value={optionsArr[0]}
            className="flex mx-3 h-full rounded-lg hover:shadow-xl items-center text-2xl bg-yellow-300 w-1/2 justify-center px-5"
          >
            {optionsArr[0]}
          </Radio>

          <Radio
            style={
              btnDisable
                ? (correctAns.find((i) => i === optionsArr[1])
                    ? { border: "solid 5px", borderColor: "green" }
                    : null) ||
                  (userAns.find((i) => i === optionsArr[1])
                    ? { border: "solid 5px", borderColor: "red" }
                    : null)
                : null
            }
            value={optionsArr[1]}
            className="flex mx-3 h-full rounded-lg hover:shadow-xl items-center text-2xl bg-red-300 w-1/2 justify-center px-5"
          >
            {optionsArr[1]}
          </Radio>

          <Radio
            style={
              btnDisable
                ? (correctAns.find((i) => i === optionsArr[2])
                    ? { border: "solid 5px", borderColor: "green" }
                    : null) ||
                  (userAns.find((i) => i === optionsArr[2])
                    ? { border: "solid 5px", borderColor: "red" }
                    : null)
                : null
            }
            value={optionsArr[2]}
            className="flex mx-3 h-full rounded-lg hover:shadow-xl items-center text-2xl bg-blue-300 w-1/2 justify-center px-5"
          >
            {optionsArr[2]}
          </Radio>

          <Radio
            style={
              btnDisable
                ? (correctAns.find((i) => i === optionsArr[3])
                    ? { border: "solid 5px", borderColor: "green" }
                    : null) ||
                  (userAns.find((i) => i === optionsArr[3])
                    ? { border: "solid 5px", borderColor: "red" }
                    : null)
                : null
            }
            value={optionsArr[3]}
            className="flex mx-3 h-full rounded-lg hover:shadow-xl items-center text-2xl bg-green-300 w-1/2 justify-center px-5"
          >
            {optionsArr[3]}
          </Radio>
        </div> */}
    </div>
  );
};

export default ParticipantWithoutAuth(OptionsContainer);
