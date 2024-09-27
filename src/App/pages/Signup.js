import { func } from "prop-types";
import signupCss from "./css/signup.module.less";
import {useState} from 'react';
import { Link } from "react-router-dom";

import axios from 'axios';




import api from '../service/api';


function Signup() {
  //const [name, setName] = useState("");
  // function handle(e) {
  //   setName(e.target.value)
  // }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setName] = useState("");
  const [phoneNumber, setPhone] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);
  const handlePhoneChange = (e) => setPhone(e.target.value);

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      console.log("***")
      // Axios 인스턴스(api)를 사용하여 요청
      
      const uri = 'http://52.63.12.126/api/v1/auth/register';
     
      const body = {
        email: email,
        password: password,
        passwordCheck: password,
        username: username,
        phoneNumber: phoneNumber,
      };
      
      const response = await axios.post(uri,body, {headers:{
        'Content-Type': 'application/json',
        'accept': 'application/hal+json'
      } });

      


      // if (response.status === 200) {
      //   setSuccessMessage("회원가입이 성공적으로 완료되었습니다.");
      // }
    } catch (error) {
      if (error.response) {
        // 서버에서 반환된 오류 메시지 출력
        console.log('서버 응답 오류:', error.response.data);
      } else if (error.request) {
        // 요청이 서버에 도달하지 못했을 때
        console.log('요청이 전송되지 않았습니다.');
      } else {
        console.log('기타 오류:', error.message);
      }
    }
  };

  
  return(
    <div>
      <form className={signupCss.container}>
        <fieldset>
          <div className={signupCss.content}>
          <div className={signupCss.header}>
            <h1>회원가입</h1>
            <hr />
          </div>
            <p>이메일을 입력해주세요</p>
            <input
              value={email}
              onChange={handleEmailChange}
              className={signupCss.nameInput}
              id="email"
              placeholder="이메일"
            />
            <p>비밀번호를 입력해주세요</p>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              className={signupCss.nameInput}
              id="password"
              placeholder="비밀번호"
            />
            <p>이름을 입력해주세요</p>
            <input
              type="name"
              value={username}
              onChange={handleNameChange}
              className={signupCss.nameInput}
              id="name"
              placeholder="이름"
            />
            <p>휴대폰번호를 입력해주세요</p>
            <input
              type="phone"
              value={phoneNumber}
              onChange={handlePhoneChange}
              className={signupCss.nameInput}
              id="phone"
              placeholder="휴대폰번호"
            />
            <button onClick={handleSignup}>회원가입</button>

            {errorMessage && <p className={signupCss.error}>{errorMessage}</p>}
            {successMessage && <p className={signupCss.success}>{successMessage}</p>}
            
            <div className={signupCss.footer}>
              <Link to="/login">로그인하러 가기</Link>
            </div>
          </div>
        
        </fieldset>
      </form>
    </div>
  )
}

export default Signup;