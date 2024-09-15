import UserDetailCss from "../css/UserDetail.module.less";
import { useNavigate } from "react-router-dom";

function UserDetail(props) {
  let navigate = useNavigate();
  return(
    <div className={UserDetailCss.container}>
      <div className={props.showCss ? UserDetailCss.contentUser :UserDetailCss.contentMy}>
      {props.showButtons ? null:(
          <p className={UserDetailCss.Header}>내정보</p>
        )}
        <div className={UserDetailCss.user }>
          <p>이름:{props.products[props.id].name}</p>
          <p>전화번호: {props.products[props.id].phone}</p>
          <p>{props.products[props.id].farm}</p>
        </div>
        <div className={UserDetailCss.information}>
          <div style={{clear:"both"}}>
            <p>&#9825;</p>
            <p>신선함 점수: {props.products[props.id].score}</p>
          </div>
          <div style={{clear:"both"}}>
            <p>&#9825;</p>
            <p>채팅하기</p>
          </div>
        </div>
         {props.showButtons && (
          <div className={UserDetailCss.click}>
            <button onClick={() => {props.onUpScore(props.id)}}>신선함 점수 주기</button>
            <button onClick={()=>navigate('/chatting')}>채팅하기</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserDetail;