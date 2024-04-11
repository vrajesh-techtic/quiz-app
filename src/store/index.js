import { configureStore, createSlice } from "@reduxjs/toolkit";

const demoSlice = createSlice({
  name: "demo",
  initialState: {
    quizData: { quizCode: "", quizTitle: "", totalQues: 0, questions: [] },
    deptList: [],
    currQuesData: {},
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

const store = configureStore({
  reducer: demoSlice.reducer,
});

export const demoActions = demoSlice.actions;

export default store;
