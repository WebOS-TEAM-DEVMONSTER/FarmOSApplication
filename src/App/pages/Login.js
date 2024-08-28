import styles from "./css/Login.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";

function Login() {

	const [id, setId] = useState(null);   // useState 훅을 사용해 'id' 상태를 관리 (초기값은 null)
 	const [passWord,setPassWord] = useState(null);

  // 아이디 입력 필드에서 사용자가 입력한 값을 업데이트하는 함수
  // e.target.value를 사용해 입력된 값을 가져오고 'setId'를 통해 'id' 상태를 변경
	const handleIdChange = (e) => {
    setId(e.target.value);
  };

  // 비밀번호 입력 필드에서 사용자가 입력한 값을 업데이트하는 함수
  // e.target.value를 사용해 입력된 값을 가져오고 'setPassWord'를 통해 'passWord' 상태를 변경
  const handlePasswordChange = (e) => {
    setPassWord(e.target.value);
  };

  // 로그인 페이지의 전체 컨테이너에 적용할 인라인 스타일 정의
  // height: '100vh'는 화면 전체 높이를 의미하며, 배경색을 설정
  const containerStyle = {
    height: '100vh',
    backgroundColor: 	'#F5F6F3', 
    margin: 0
  };

  
	return(
		<div  style={containerStyle}>
			<form className={styles.login}>
				<fieldset>
          <h1>팜OS</h1>
					<ul>
						<li><input type="text" value = {id} className ={styles.id} onChange={handleIdChange} placeholder='전화번호 (-없이 작성하세요)'/></li>
						<li><input type="password" value = {passWord} className={styles.password} onChange={handlePasswordChange} placeholder='비밀번호'/></li>
					</ul>
          <div>
					  <button className={styles.loginButton}>로그인</button>
          </div>
          <ul>
            <li><span>아직 회원이 아니신가요?</span>  <Link to="/signup">회원가입</Link></li>
            <li><span>비밀 번호가 기억이 안나시나요?</span>  <a href="/">비밀번호 찾기</a></li>
          </ul>
				</fieldset>
			</form>
			
		</div>
	)
}

export default Login