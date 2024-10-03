import styles from "./css/Login.module.less";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import Cookies from 'js-cookie';

function Login() {
  const navigate = useNavigate();
	const [email, setEmail] = useState("");   // useState 훅을 사용해 'id' 상태를 관리 (초기값은 null)
 	const [password,setPassword] = useState("");
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    try {
      console.log('***');
      
      const data ={
        email: email,
        password : password,
      };
  
      const response = await axios.post('http://52.63.12.126/api/v1/auth/login',data,{
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/hal+json',
          

        },
      }); //로그인하면 accesstoken과 refreshtoken이 주어짐. 헤더에 accesstoken을 넣어야함
      
      if (response.status === 200) {
        const { accessToken } = response.data; // 서버로부터 accessToken 받기
        Cookies.set('accessToken', accessToken, {expires:180});
  
        navigate('/mainhome'); // 로그인 성공 후 페이지 이동
      }


    } catch(error){
      if(error.response && error.response.status === 403){
        setMessage('잘못된 이메일이나 비밀번호입니다. 다시 입력해주세요');
      } else {
        setMessage('로그인 요청 중 오류가 발생했습니다.');
      }
    }
  };

	const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
  }
  

  const containerStyle = {
    height: '100vh',
    backgroundColor: 	'#F5F6F3', 
    margin: "0"
  };
	return(
		<div  style={containerStyle}>
			<form className={styles.login} onSubmit={handleSubmit}>
				<fieldset>
          <h1>로그인</h1>
            <label for="id">전화번호 입력 후 인증번호 전송 버튼을 눌러주세요</label>
            <div className={styles.phone}>
              <input type="text" id= "id"  className={styles.id} value={email} onChange={handleEmailChange} placeholder='이메일' />
              <button>인증번호 전송</button> 
            </div>
						<label for="password">인증번호 입력 후 인증하기 버튼을 눌러주세요</label>
            <input type="password" id="password" value = {password} className={styles.password} onChange={handlePasswordChange} placeholder='비밀번호'/>
          <div>
					  <button className={styles.loginButton} type="submit">로그인하기</button>
          </div>
          <ul>
            <li><span>아직 회원이 아니신가요?</span>  <Link to="/signup">회원가입</Link></li>
          </ul>
				</fieldset>
			</form>
			
		</div>
	)
}

export default Login