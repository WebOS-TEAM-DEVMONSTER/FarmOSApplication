import styles from "./css/Login.module.less";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");   // 이메일 상태 관리
  const [password, setPassword] = useState(""); // 비밀번호 상태 관리
  const [message, setMessage] = useState(""); // 오류 메시지 관리

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log('*** 로그인 시도 ***');

      const data = {
        email: email,
        password: password,
      };

      const response = await axios.post('http://52.63.12.126/api/v1/auth/login', data, {
        headers: {
          'Content-Type': 'application/hal+json',
          'accept': 'application/hal+json',
        },
      });
      console.log(response.data);

      if (response.status === 200) {
        console.log("*");
        const accessToken = response.data.accessToken; // 서버로부터 accessToken 받기
        console.log("**");

        // LocalStorage에 accessToken 저장
        window.localStorage.setItem('accessToken', accessToken);

        console.log("***");
        console.log(accessToken);

        // 로그인 성공 시 메인 페이지로 이동
        navigate('/mainhome');
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        setMessage('잘못된 이메일이나 비밀번호입니다. 다시 입력해주세요');
      } else {
        setMessage('로그인 요청 중 오류가 발생했습니다.');
      }
    }
  };

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const containerStyle = {
    height: '100vh',
    backgroundColor: '#F5F6F3',
    margin: '0',
  };

  return (
    <div style={containerStyle}>
      <form className={styles.login} onSubmit={handleSubmit}>
        <fieldset>
          <h1>로그인</h1>
          <label htmlFor="id">이메일을 입력 후 인증번호 전송 버튼을 눌러주세요</label>
          <div className={styles.phone}>
            <input
              type="text"
              id="id"
              className={styles.id}
              value={email}
              onChange={handleEmailChange}
              placeholder="이메일"
            />
            <button>인증번호 전송</button>
          </div>
          <label htmlFor="password">인증번호 입력 후 인증하기 버튼을 눌러주세요</label>
          <input
            type="password"
            id="password"
            value={password}
            className={styles.password}
            onChange={handlePasswordChange}
            placeholder="비밀번호"
          />
          <div>
            <button className={styles.loginButton} type="submit">
              로그인하기
            </button>
          </div>
          <ul>
            <li>
              <span>아직 회원이 아니신가요?</span> <Link to="/signup">회원가입</Link>
            </li>
          </ul>
        </fieldset>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Login;
