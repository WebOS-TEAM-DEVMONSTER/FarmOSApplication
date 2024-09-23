import styles from "./css/Login.module.less";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

function Login() {

	const [id, setId] = useState("");   // useState 훅을 사용해 'id' 상태를 관리 (초기값은 null)
 	const [passWord,setPassWord] = useState("");

  
	const handleIdChange = (e) => {
    setId(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassWord(e.target.value);
  };

  // 로그인 페이지의 전체 컨테이너에 적용할 인라인 스타일 정의
  // height: '100vh'는 화면 전체 높이를 의미하며, 배경색을 설정
  const containerStyle = {
    height: '100vh',
    backgroundColor: 	'#F5F6F3', 
    margin: "0"
  };
	return(
		<div  style={containerStyle}>
			<form className={styles.login}>
				<fieldset>
          <h1>로그인</h1>
            <label for="id">전화번호 입력 후 인증번호 전송 버튼을 눌러주세요</label>
            <div className={styles.phone}>
              <input type="text" id= "id"  className={styles.id} value={id} onChange={handleIdChange} placeholder='전화번호' />
              <button>인증번호 전송</button> 
            </div>
						<label for="id">인증번호 입력 후 인증하기 버튼을 눌러주세요</label>
            <input type="password" id="password" value = {passWord} className={styles.password} onChange={handlePasswordChange} placeholder='인증번호'/>
          <div>
					  <button className={styles.loginButton}>인증하기</button>
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