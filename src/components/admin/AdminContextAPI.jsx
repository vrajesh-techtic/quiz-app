import { createContext } from "react";

const AdminContextAPI = createContext({
  "profile-image": null,
  "admin-name": "",
  "admin-email": "",
  "admin-username": "",
  "total-dept": null,
  "total-quizzes": null,
  "total-all-participants": null,
  "live-quizzes": null,
  "dept-quiz-list": [],
  "recent-quiz": null,
});

const QuestionContextAPI = createContext({
  quesList: [],
  setquesList: () => {},
});

export { AdminContextAPI as default, QuestionContextAPI };
