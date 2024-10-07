import { useParams, useNavigate } from "react-router-dom";
import Nav from './components/CommunityNav';
import DetailCss from './css/Detail.module.less';
import { useState, useEffect } from "react";
import Tap from './components/Tap';
import axios from 'axios';
import Cookies from 'js-cookie';

function Detail(props) {
  let { id } = useParams(); // URL에서 id를 추출
  const [comment, setComment] = useState(''); // 댓글 입력 상태
  const [showTap, setShowTap] = useState(false); // Tap 토글 상태
  const [postData, setPostData] = useState(null); // 게시물 데이터 상태

  // 댓글 입력 핸들러
  const handleComment = (e) => {
    setComment(e.target.value);
  };

  // Tap 토글 핸들러
  const toggleTap = () => {
    setShowTap(!showTap);
  };

  let navigate = useNavigate();

  // 페이지가 로드될 때 API 호출
  useEffect(() => {
    const fetchPostData = async () => {
      const accessToken = Cookies.get('accessToken'); // 쿠키에서 accessToken 가져오기

      try {
        const response = await axios.get(`http://52.63.12.126/api/v1/posts/${id}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`, // 쿠키에서 가져온 토큰을 헤더에 넣기
            'accept': 'application/hal+json'
          }
        });
        setPostData(response.data); // API 응답 데이터를 상태에 저장
      } catch (error) {
        console.error('Error fetching post data:', error);
      }
    };

    fetchPostData(); // API 호출 함수 실행
  }, [id]);

  // postData가 아직 로드되지 않았을 때 로딩 메시지 출력
  if (!postData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Nav />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className={DetailCss.detail_container}>
          <div className={DetailCss.detail_wrapper}>
            <div className={DetailCss.detail_header}>
              <div className={DetailCss.profile} />
              <h1>{postData.user && postData.user.username ? postData.user.username : 'Unknown User'}</h1> {/* postData.user.username이 존재할 때만 출력 */}
              <span>
                <button onClick={toggleTap}>&#8942;</button>
                {showTap && <Tap />}
              </span>
            </div>

            <div className={DetailCss.detail_img}>
              <img src={process.env.PUBLIC_URL + '/vegetable.jpg'} alt="상품 이미지" />
            </div>

            <div className={DetailCss.detail_title}>
              <h1>{postData.title}</h1> {/* postData가 로드된 후 제목 출력 */}
            </div>

            <div className={DetailCss.detail_price}>
              <p>{postData.price}원</p> {/* postData가 로드된 후 가격 출력 */}
            </div>

            <div className={DetailCss.detail_info}>
              <p>{postData.content}</p> {/* postData가 로드된 후 내용 출력 */}
            </div>
          </div>

          <form>
            <div className={DetailCss.inputBox}>
              <input
                className={DetailCss.detail_comment}
                onChange={handleComment}
                value={comment}
                placeholder="댓글 입력"
              />
              <button type="button">댓글 등록</button>
            </div>
          </form>

          <p style={{ margin: "50px 0 0 0" }}>댓글</p>
          <hr style={{ margin: "10px 0 0 0" }} />
        </div>
      </div>
    </>
  );
}

export default Detail;
