import ClassHistoryCSS from "./ClassHistoryModal.module.css";
import ClassRegistrationCSS from "../../../pages/classes/ClassRegistration.module.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callClassHistoryUpdateAPI, callClassHistoryDetailAPI} from "../../../api/ClassHistoryAPICalls";
import { callClassListForAdminNoPagingAPI } from "../../../api/ClassAPICalls";
function ClassHistoryUpdateModal({ setClassHistoryUpdateModal, classHistoryCode, classCode, classStatus,startDate }) {

  const classList = useSelector((state) => state.classReducer);
  const member = useSelector(state => state.studentManagerDetailReducer);
  const classHistoryLists = useSelector((state) => state.classHistoryReducer);

  
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    classHistoryCode : classHistoryCode,
    classCode: classCode,
    memberCode: member.memberCode,
    startDate: startDate,
    classStatus : classStatus
  });
  useEffect(() => {
    dispatch(callClassListForAdminNoPagingAPI({

    }));
    dispatch(callClassHistoryDetailAPI({
      classHistoryCode : classHistoryCode
    }))
    }, []);

  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onClickUpdateHandler = () => {

    dispatch(
      callClassHistoryUpdateAPI({
        form: form
        
      }));
    setClassHistoryUpdateModal(false);
    alert("수강수정이 완료되었습니다.");
      
  };

  
  /* 강의 속성 값 데이터 가공*/ 
  if(classList){
  for(var i =0; i < classList.length; i++){
    if(form.classCode ==classList[i].classCode){
      var arr = []
      arr = classList[i]
      var str = arr?.classStartDate.split('T',1) || ''   
       str += " ~ "
       str +=  arr?.classEndDate.split('T',1) || ''

       var ctr = arr?.classStudents || 0;
       ctr += " / ";
       ctr += arr?.classQuota
       console.log(ctr)
    }
    }

}

return (
    <div className={ClassHistoryCSS.modal}>
      <div className={ClassHistoryCSS.modalContainer}>
        <div className={ClassHistoryCSS.loginModalDiv}>
            {classList && classHistoryLists && (
          <table>
            {Array.isArray(classList) && (
              <tbody>
                <tr>
                  <td><label>강의명</label></td>
                  <td>
                    <select
                      id="classList"
                      name='classCode'
                      placeholder='강의명'
                      className={ClassRegistrationCSS.classInfoInput}
                      onChange={onChangeHandler}
                      value={form.classCode}
                    >
                      <option>강의명</option>
                      {classList.map((item, idx) => (
                         <option key={idx} name='classCode' value={item?.classCode}>
                          {item?.className}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label> 과목명</label>
                  </td>
                  <td>
                    <input
                      name="subjectName"
                      placeholder="과목명"
                      className={ClassRegistrationCSS.classInfoInput}
                      value={arr?.subject.subjectName || ''}
                      readOnly={true}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>수강 정원</label>
                  </td>
                  <td>
                    <input
                      name="classQuota"
                      placeholder="수강 정원"
                      className={ClassRegistrationCSS.classInfoInput}
                      value={ctr|| ''}
                      readOnly = {true}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>수업일</label>
                  </td>
                  <td>
                    <label>
                      <input
                        name="classStartDate"
                        placeholder="2022-10-15"
                        className={ClassRegistrationCSS.classInfoInput}
                        value={str || ''}
                        readOnly = {true}
                      />
                    </label>
                  </td>
                  </tr>
                <tr>
                  <td>
                    <label>수업료</label>
                  </td>
                  <td>
                    <label>
                      <input
                        name="classPrice"
                        placeholder="800000"
                        className={ClassRegistrationCSS.classInfoInput}
                        value={arr?.classPrice || ''}
                        readOnly = {true}
                      />
                    </label>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>수강 시작일</label>
                  </td>
                  <td>
                    <label>
                      <input
                        name="startDate"
                        placeholder="2022-10-15"
                        className={ClassRegistrationCSS.classInfoInput}
                        onChange={onChangeHandler}
                        value={form.startDate.split('T',1)}
                      />
                    </label>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>수강 상태</label>
                  </td>
                  <td>
                    <select
                      name='classStatus'
                      className={ClassRegistrationCSS.classInfoInput}
                      onChange={onChangeHandler}
                      value={form.classStatus}
                    >
                      <option value="수강중">수강중</option>
                      <option value="수강완료">수강완료</option>
                      <option value="수강포기">수강포기</option>
                    </select>
                  </td>
                </tr>
              </tbody>
              
            )}
          </table>
          
          )}
            <button  style={{
                    border: "none",
                    margin: 0,
                    fontSize: "20px",
                    height: "10px",
                    color: "black"
                  }}
                  onClick={onClickUpdateHandler}>수정</button>
                <button
                  style={{
                    border: "none",
                    margin: 0,
                    fontSize: "20px",
                    height: "10px",
                    color: "black"
                  }}
                  onClick={() => setClassHistoryUpdateModal(false)}
                >
                  돌아가기
                </button>
        </div>
      
      </div>
    </div>
  );
                }

export default ClassHistoryUpdateModal;
