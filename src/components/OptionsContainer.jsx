import { Radio } from "antd";
import React, { useEffect, useState } from "react";

const OptionsContainer = ({
  optionsArr,
  questionObj,
  setQuestionObj,
  selectedAns,
  setselectedAns,
  quesNo,
  btnDisable,
  userAns,
  correctAns,
}) => {
  useEffect(() => {
    setselectedAns(questionObj.at(quesNo).selected);
  }, [questionObj.at(quesNo).selected]);

  // console.log('Options called!')
  return (
    <div className="options-container  w-full flex flex-col  justify-center">
      <Radio.Group
        value={btnDisable ? null : selectedAns}
        onChange={
          !btnDisable
            ? (e) => {
                setselectedAns(e.target.value);

                questionObj.at(quesNo).selected = e.target.value;
                console.log("e", e.target.value);
              }
            : null
        }
        optionType="button"
        buttonStyle
        className="flex flex-col h-[90%]  px-5 py-5"
      >
        <div className="flex text-center h-full my-3 w-full">
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
        </div>
      </Radio.Group>
    </div>
  );
};

export default OptionsContainer;
