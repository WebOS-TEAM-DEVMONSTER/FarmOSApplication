import styles from "./css/signup.module.less";
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom"; // useNavigate import
import axios from 'axios';

function Signup() {
  const navigate = useNavigate(); // useNavigate 훅을 초기화하여 navigate 함수 사용
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
      const uri = 'http://52.63.12.126/api/v1/auth/register';
      const body = {
        email: email,
        password: password,
        passwordCheck: password,
        username: username,
        phoneNumber: phoneNumber,
      };
      
      const response = await axios.post(uri, body, {
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/hal+json'
        }
      });

      // 성공 응답 처리
      if (response.status === 200) {
        setSuccessMessage("회원가입이 성공적으로 완료되었습니다.");
        // 회원가입 성공 후 페이지 이동
        navigate('/login'); // 성공 시 이동할 경로 (예: 회원가입 성공 페이지)
      }

    } catch (error) {
      if (error.response) {
        console.log('서버 응답 오류:', error.response.data);
        setErrorMessage('회원가입 중 문제가 발생했습니다. 다시 시도해주세요.');
      } else if (error.request) {
        console.log('요청이 전송되지 않았습니다.');
        setErrorMessage('서버와 연결되지 않았습니다.');
      } else {
        console.log('기타 오류:', error.message);
        setErrorMessage('알 수 없는 오류가 발생했습니다.');
      }
    }
  };

  return (
    <div>
      <form className={styles.container} onSubmit={handleSignup}>
        <fieldset>
          <div className={styles.content}>
            <div className={styles.header}>
              <h1>회원가입</h1>
              <hr />
            </div>
            <p>이메일을 입력해주세요</p>
            <input
              value={email}
              onChange={handleEmailChange}
              className={styles.nameInput}
              id="email"
              placeholder="이메일"
            />
            <p>비밀번호를 입력해주세요</p>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              className={styles.nameInput}
              id="password"
              placeholder="비밀번호"
            />
            <p>이름을 입력해주세요</p>
            <input
              type="name"
              value={username}
              onChange={handleNameChange}
              className={styles.nameInput}
              id="name"
              placeholder="이름"
            />
            <p>휴대폰번호를 입력해주세요</p>
            <input
              type="phone"
              value={phoneNumber}
              onChange={handlePhoneChange}
              className={styles.nameInput}
              id="phone"
              placeholder="휴대폰번호"
            />
            <button type="submit">회원가입</button>

            {errorMessage && <p className={styles.error}>{errorMessage}</p>}
            {successMessage && <p className={styles.success}>{successMessage}</p>}
            
            <div className={styles.footer}>
              <Link to="/login">로그인하러 가기</Link>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );
}

export default Signup;
