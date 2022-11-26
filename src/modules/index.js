import memberReducer from "./MemberModule";
import consReducer from "./ConsModule";
import subjectReducer from "./SubjectModule";
import { combineReducers } from "redux";
import subjectListReducer from "./SubjectListModule";
import teacherListReducer from "./TeacherListModule";
import teacherReducer from "./TeacherModule";
import qnaListReducer from "./QnaListModule";

import accListReducer from "./AccListModule";
import accReducer from "./AccModule";
import smsListReducer from "./SmsListModule";
import teacherClassReducer from "./TeacherClassModule";
import qnaReducer from "./QnaModule";

const rootReducer = combineReducers({
    memberReducer,
    consReducer,
    subjectReducer,
    subjectListReducer,
    teacherReducer,
    teacherListReducer,
    qnaListReducer,
    accListReducer,
    accReducer,
    smsListReducer,
    teacherClassReducer,
    qnaReducer,
    
});

export default rootReducer;