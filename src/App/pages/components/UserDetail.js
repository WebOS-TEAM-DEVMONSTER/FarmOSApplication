import UserDetailCss from "../css/UserDetail.module.less";

function UserDetail(props) {
  return(
    <div className={UserDetailCss.container}>
      <div className={UserDetailCss.content}>
        <div className={UserDetailCss.user}>
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
        <div className={UserDetailCss.click}>
          <button onClick={()=>{props.onUpScore(props.id)}}>신선함 점수 주기</button>
          <button>채팅하기</button>
        </div>
      </div>
    </div>
  )
}

export default UserDetail;