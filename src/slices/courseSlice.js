import { createSlice } from "@reduxjs/toolkit";

//const initialState = [];
const initialState = {
  CourseId: "",
  CourseName: "",
  Academy: "",
  AcademyAbbr: "",
  CourseTotalHrs: 0,
  CourseEvaluation: ""
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    addToCourse: (state, action) => { 
        return (action.payload);
    },
    updateHrs: (state, action) => {
      state.CourseTotalHrs = action.payload
    },
  },
});

//Action Creators
export const { addToCourse,updateHrs } = courseSlice.actions;

//Reducer
export default courseSlice.reducer;
