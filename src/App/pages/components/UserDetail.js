import UserDetailCss from "../css/UserDetail.module.less";

function UserDetail() {
  return(
    <div className={UserDetailCss.container}>
      <div className={UserDetailCss.content}>
        <div className={UserDetailCss.user}>
          <p>이름:김동현</p>
          <p>전화번호: 010-7546-3169</p>
          <p>고구마 스마트팜</p>
        </div>
        <div className={UserDetailCss.information}>
          <div style={{clear:"both"}}>
            <p>&#9825;</p>
            <p>신선함 점수: 24</p>
          </div>
          <div style={{clear:"both"}}>
            <p>&#9825;</p>
            <p>채팅하기</p>
          </div>
        </div>
        <div className={UserDetailCss.click}>
          <button>신선함 점수 주기</button>
          <button>채팅하기</button>
        </div>
      </div>
    </div>
  )
}

export default UserDetail;