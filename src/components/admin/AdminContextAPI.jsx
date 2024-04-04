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

export default AdminContextAPI;
