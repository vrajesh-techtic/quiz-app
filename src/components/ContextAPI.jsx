import { createContext } from "react";

const ContextAPI = createContext({
  questionObj: null,
  setQuestionObj: null,
  isUserAuth: false,
  setisUserAuth: null,
});

export default ContextAPI;
