import { createContext } from "react";
import questionBank from "../../questions/questionBank";

const ContextAPI = createContext({
  userAns: null,
  questionBank: questionBank,
});

export default ContextAPI;
