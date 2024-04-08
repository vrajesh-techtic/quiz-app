import React, { useContext, useState } from "react";

import CreateNavbar from "./CreateNavbar";
import CreateSider from "./CreateSider";
import Footer from "./Footer";

import CreateQuizPage from "./CreateQuizPage";
import { QuestionContextAPI } from "./AdminContextAPI";

const CreateCustomSider = () => {
  const { quesList, setquesList } = useContext(QuestionContextAPI);

  const [currQues, setCurrQues] = useState(1);

  console.log("Custom Sider");

  // console.log('currQues', currQues)

  return (
    <div className="h-screen">
      <CreateNavbar />

      {/* Sider & Content Container  */}
      <div className="flex h-[82%]">
        <CreateSider currQues={currQues} setCurrQues={setCurrQues} />
        {/* Content  */}
        <div className=" h-full p-5 w-full">
          <div className="bg-gray-100 h-full rounded-lg ">
            <CreateQuizPage quesData={quesList[currQues - 1]} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CreateCustomSider;
