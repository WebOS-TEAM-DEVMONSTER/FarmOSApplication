import signupCss from "./css/signup.module.css";
import {useState} from 'react';
import { Link } from 'react-router-dom';

function Signup() {
  // 전화번호, 비밀번호, 비밀번호 확인, 이름, 비밀번호 메시지를 관리
  const [phone, setPhone] = useState(null); // 전화번호 
  const [passWord, setPassword] = useState(null); // 비밀번호 
  const [isPassWord, setIsPassword] = useState(null); // 비밀번호  
  const [passwordMessage, setPasswordMessage] = useState(null); // 비밀번호 불일치 메시지 상태
  const [name, setName] = useState(null); // 이름 상태

    // 전화번호 입력 시 호출되는 함수, 입력값을 'phone' 상태로 업데이트
  const handlePhoneChange = (e)=> {
    setPhone(e.target.value);
  }

  // 비밀번호 입력 시 호출되는 함수, 입력값을 'passWord' 상태로 업데이트
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }
  // 비밀번호 확인 입력 시 호출되는 함수, 입력값을 'isPassWord' 상태로 업데이트 나중에 비밀번호를 똑같이 입력 했는지 확인 하려고 할때 쓰는 거임
  const handleIsPasswordChange = (e) => {
    setIsPassword(e.target.value);
  }
  // 이름 입력 시 호출되는 함수, 입력값을 'name' 상태로 업데이트
  const handleName = (e) => {
    setName(e.target.value);
  }

  const handleSignupClick = (e) => { 
    if (passWord !== isPassWord) {
      e.preventDefault();
      setPasswordMessage("비밀번호가 불일치합니다.");
    }
  };
  
  return(
    <div>
      <form className={signupCss.container}>
        <fieldset>
          <h1>팜OS</h1>
          <ul>
            <li><input type="text" value = {phone} onChange={handlePhoneChange} placeholder='전화번호 (-없이 작성하세요)' /></li>
            <li><input type="password" value = {passWord} onChange={handlePasswordChange} placeholder='비밀번호' /></li>
            <li><input type="password" value = {isPassWord} onChange={handleIsPasswordChange} placeholder='비밀번호'/></li>
            {passwordMessage && <span className={signupCss.passwordError}>{passwordMessage}</span>}  {/*&&는 첫번째  falsy를 찾음. 즉 
            passwordMessage가 null일때는 아무것도 안하다가 무슨 값이 할당되는 순간 참임으로 맨 마지막 <span> 태그가 출력됨.*/}
            
            <li><input type="text"value = {name} onChange={handleName} placeholder='이름' /></li>
            <li><input type="date" /></li>
          </ul>
          <button onClick={handleSignupClick}>가입</button>
        </fieldset>
        <fieldset>
          <p>이미 회원이신가요? <Link to ="/">로그인</Link></p>
        </fieldset>
      </form>
    </div>
  )
}

export default Signup;