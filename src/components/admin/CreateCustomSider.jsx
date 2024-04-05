import React, { useContext, useState } from "react";

import CreateNavbar from "./CreateNavbar";
import CreateSider from "./CreateSider";
import Footer from "./Footer";
import { QuestionContextAPI } from "./AdminContextAPI";
import CreateQuizPage from "./CreateQuizPage";

const CreateCustomSider = ({ children }) => {
  const { quesList, setquesList } = useContext(QuestionContextAPI);
  const [currQues, setCurrQues] = useState(1);

  console.log("Custom Sider");

  return (
    <div className="h-screen">
      <CreateNavbar />

      {/* Sider & Content Container  */}
      <div className="flex h-[82%]">
        <CreateSider
          quesList={quesList}
          currQues={currQues}
          setCurrQues={setCurrQues}
        />
        {/* Content  */}
        <div className=" h-full p-5 w-full">
          <div className="bg-gray-100 h-full rounded-lg ">
            <CreateQuizPage currQues={currQues} setCurrQues={setCurrQues} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CreateCustomSider;
