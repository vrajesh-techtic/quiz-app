import React from "react";

import WithAuth from "../../auth/WithAuth";

const CreateSider = ({ currQues, setCurrQues, quesList }) => {
  return (
    <>
      <div className="w-[230px] flex flex-col items-center bg-gray-100 h-full">
        <div className="mt-4">
          <span className="text-2xl my-3 font-medium">Question List</span>
        </div>

        {/* Question List  */}
        <div className="create-ques-list  overflow-auto flex flex-col items-center  mt-5 w-full">
          <ul className="w-[80%] h-full mx-3 ">
            {quesList?.length === 0 ? (
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
              quesList?.map((i, key) => (
                <li
                  key={key}
                  style={{
                    backgroundColor:
                      currQues === key + 1 ? "#ca89fd" : "#04c1cc",
                  }}
                  onClick={() => setCurrQues(key + 1)}
                  className="cursor-pointer rounded-lg  my-2 p-2 text-center w-full"
                >
                  {key < quesList?.length - 1
                    ? `Question ${key + 1}`
                    : "Create Question"}
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default WithAuth(CreateSider);
