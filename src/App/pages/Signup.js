import { func } from "prop-types";
import signupCss from "./css/signup.module.less";
import {useState} from 'react';
import { Link } from "react-router-dom";


function Signup() {
  const [name, setName] = useState("");

  function handleName(e) {
    setName(e.target.value)
  }
  
  return(
    <div>
      <form className={signupCss.container}>
        <fieldset>
          <div className={signupCss.header}>
            <h1>회원가입</h1>
            <hr />
          </div>
          <div className={signupCss.content}>
            <p>이름을 입력해주세요</p>
            <input value ={name} className={signupCss.nameInput} id="name" onChange={handleName} placeholder="이름" />
            <button>회원가입</button>
          </div>
          <div className={signupCss.footer}>
            <Link to="/login">로그인하러 가기</Link>
          </div>
        </fieldset>
      </form>
    </div>
  )
}

export default Signup;