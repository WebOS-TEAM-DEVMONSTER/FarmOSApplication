import UserDetailCss from "../css/UserDetail.module.less";
import { useNavigate } from "react-router-dom";

function UserDetail(props) {
  let navigate = useNavigate();
  
  // props로 전달받은 사용자 정보가 있는지 확인
  const product = props.products[props.id];

  return (
    <div className={UserDetailCss.container}>
      <div className={props.showCss ? UserDetailCss.contentUser : UserDetailCss.contentMy}>
        {!props.showButtons && (
          <p className={UserDetailCss.Header}>내정보</p>
        )}
        <div className={UserDetailCss.user}>
          <p>이름: {product.user.username}</p> {/* 게시물 작성자의 이름 */}
          <p>전화번호: {product.user.phone || '정보 없음'}</p> {/* 게시물 작성자의 전화번호 (예시) */}
          <p>농장 정보: {product.user.farm || '정보 없음'}</p> {/* 게시물 작성자의 농장 정보 (예시) */}
        </div>
        <div className={UserDetailCss.information}>
          <div style={{ clear: "both" }}>
            <p>&#9825;</p>
            <p>신선함 점수: {product.user.score || '0점'}</p> {/* 신선함 점수 (예시) */}
          </div>
          <div style={{ clear: "both" }}>
            <p>&#9825;</p>
            <p onClick={() => navigate('/chatting')} style={{ cursor: 'pointer' }}>채팅하기</p> {/* 채팅 버튼 */}
          </div>
        </div>
        {props.showButtons && (
          <div className={UserDetailCss.click}>
            <button onClick={() => { props.onUpScore(props.id); }}>
              신선함 점수 주기
            </button>
            <button onClick={() => navigate('/chatting')}>채팅하기</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserDetail;
