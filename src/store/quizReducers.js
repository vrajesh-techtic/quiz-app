import { createSlice } from "@reduxjs/toolkit";

const quizSlice = createSlice({
  name: "quizSlice",
  initialState: {
    quizData: { quizCode: "", quizTitle: "", totalQues: 0, questions: [] },
    currQuesData: {},
    deptList: [],
  },

  reducers: {
    setQuizTitle(state, action) {
      state.quizData.quizTitle = action.payload;
    },

    setQuizCode(state, action) {
      state.quizData.quizCode = action.payload;
    },

    setQuestions(state, action) {
      state.quizData.questions = action.payload;
    },

    setCurrQuesData(state, action) {
      state.currQuesData = state.quizData.questions[action.payload - 1];
    },

    setTotalQues(state, action) {
      state.quizData.totalQues = action.payload;
    },

    setDeptList(state, action) {
      state.deptList = action.payload;
    },

    addDept(state, action) {
      state.deptList.push(action.payload);
    },
  },
});

export const quizActions = quizSlice.actions;
export const quizReducers = quizSlice.reducer;
