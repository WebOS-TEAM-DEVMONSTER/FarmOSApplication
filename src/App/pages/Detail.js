import { useParams, useNavigate } from "react-router-dom";
import Nav from './components/CommunityNav';
import DetailCss from './css/Detail.module.less';
import { useState, useEffect } from "react";
import Tap from './components/Tap';
import axios from 'axios';
import Cookies from 'js-cookie';
import CommentSection from './components/Comment'; // 댓글 컴포넌트 추가

function Detail(props) {
  let { id } = useParams(); // URL에서 id를 추출
  const [postData, setPostData] = useState(null); // 게시물 데이터 상태
  const [currentUser, setCurrentUser] = useState(''); // 현재 사용자 이름
  const [postAuthorId, setPostAuthorId] = useState(''); // 게시글 작성자 ID

  let navigate = useNavigate();

  // 페이지가 로드될 때 API 호출
  useEffect(() => {
    const fetchPostData = async () => {
      const accessToken = Cookies.get('accessToken'); // 쿠키에서 accessToken 가져오기

      try {
        // 게시글 데이터 호출
        const response = await axios.get(`http://52.63.12.126/api/v1/posts/${id}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`, // 쿠키에서 가져온 토큰을 헤더에 넣기
            'accept': 'application/hal+json'
          }
        });

        console.log('API Response:', response.data); // 응답 데이터 구조 확인을 위해 추가

        if (response.data && response.data.user && response.data.user.username) {
          setPostData(response.data); // API 응답 데이터를 상태에 저장
          setPostAuthorId(response.data.user.id); // 게시글 작성자 ID 저장
        } else {
          console.error('Invalid response structure:', response.data);
        }
      } catch (error) {
        console.error('Error fetching post data:', error);
      }
    };

    const fetchCurrentUser = async () => {
      const accessToken = Cookies.get('accessToken'); // 쿠키에서 accessToken 가져오기

      try {
        // 현재 사용자 정보 호출
        const response = await axios.get(`http://52.63.12.126/api/v1/users/me`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`, // 쿠키에서 가져온 토큰을 헤더에 넣기
            'accept': 'application/hal+json'
          }
        });

        console.log('Current User Response:', response.data); // 응답 데이터 구조 확인을 위해 추가

        if (response.data && response.data.username) {
          setCurrentUser(response.data.username); // 현재 로그인한 사용자 이름 저장
        } else {
          console.error('Invalid currentUser response structure:', response.data);
        }
      } catch (error) {
        console.error('Error fetching current user data:', error);
      }
    };

    fetchPostData(); // 게시글 데이터 호출
    fetchCurrentUser(); // 현재 사용자 정보 호출
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
              <h1>{postData.user && postData.user.username ? postData.user.username : 'Unknown User'}</h1>
              <span>
                <button>&#8942;</button>
                {/* Tap 버튼 (간단히 유지) */}
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

          {/* 댓글 컴포넌트에 props로 넘기기 */}
          <CommentSection postId={id} currentUser={currentUser} postAuthorId={postAuthorId} {...props} />
        </div>
      </div>
    </>
  );
}

export default Detail;