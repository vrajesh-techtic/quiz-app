import profileImage from "../../assets/Vrajesh Pic.jpeg";

export const dataAdmin = {
  "profile-image": profileImage,
  "admin-name": "Vraj Patel",
  "admin-email": "vraj542003@gmail.com",
  "admin-username": "vraj1705",
  "total-dept": 3,
  "total-quizzes": 5,
  "total-all-participants": 65,
  "live-quizzes": 2,
  "recent-quiz": {
    "quiz-name": "Maths Quiz",
    "dept-name": "Maths Department",
    "total-ques": 5,
    "time-remaining": Date.now() + 30 * 1000,
    "total-participants": 24,
    submissions: 14,
    "highest-score": 4,
  },

  "dept-quiz-list": [
    {
      "dept-name": "Department-1",
      "quiz-list": [
        "Department-1 Quiz-1",
        "Department-1 Quiz-2",
        "Department-1 Quiz-3",
        "Department-1 Quiz-4",
        "Department-1 Quiz-5",
        "Department-1 Quiz-6",
        "Department-1 Quiz-7",
        "Department-1 Quiz-8",
      ],
    },
    {
      "dept-name": "Department-2",
      "quiz-list": ["Department-2 Quiz-1", "Department-2 Quiz-2"],
    },

    {
      "dept-name": "Department-3",
      "quiz-list": [
        "Department-3 Quiz-1",
        "Department-3 Quiz-2",
        "Department-3 Quiz-3",
      ],
    },
  ],
};
