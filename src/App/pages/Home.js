import { useNavigate } from "react-router-dom";
import HomeCss from "./css/Home.module.css";

function Home() {
  let navigate = useNavigate();
  return (
    <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh"}}>
      <div className={HomeCss.container}>
        <div className={HomeCss.profile}>
          <div className= {HomeCss.photo} />
          <h1>유저님<br />스마트팜</h1>
        </div>
        <div className={HomeCss.content}>
          <div className={HomeCss.box}><h1>CCTV</h1></div>
          <div className={HomeCss.box}><h1>온도/습도/토양</h1></div>
          <div className={HomeCss.box}><h1>건강리포트</h1></div>
          <div className={HomeCss.box} onClick={()=>{ navigate('/community') }}><h1>게시판</h1></div>
        </div>
      </div>
    </div>
  )
}

export default Home;