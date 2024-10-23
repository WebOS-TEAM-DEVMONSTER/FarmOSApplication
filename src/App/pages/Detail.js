import { useParams, useNavigate } from "react-router-dom";
import Nav from './components/CommunityNav';
import DetailCss from './css/Detail.module.less';
import { useState, useEffect, useContext } from "react";
import Cookies from 'js-cookie';
import CommentSection from './components/Comment';
import axios from "axios";
import { GlobalContext } from "../../global_provider";

function Detail(props) {
  let { id } = useParams();
  const [postData, setPostData] = useState(null);
  const [currentUser, setCurrentUser] = useState('');
  const [postAuthorId, setPostAuthorId] = useState('');
  const [currentUserId, setCurrentUserId] = useState(''); // 로그인한 사용자 ID 저장
  const [showDropdown, setShowDropdown] = useState(false);
  const { accessToken } = useContext(GlobalContext);

  let navigate = useNavigate();

  // 게시글 데이터를 불러오는 함수
  const fetchPostData = async () => {
    try {
      const response = await axios.get(`http://52.63.12.126/api/v1/posts/${id}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'accept': 'application/hal+json'
        }
      });

      if (response.data && response.data.user && response.data.user.username) {
        setPostData(response.data);
        setPostAuthorId(response.data.user.id);
      } else {
        console.error('Invalid response structure:', response.data);
      }
    } catch (error) {
      console.error('Error fetching post data:', error);
    }
  };

  // 로그인한 사용자 정보를 가져오는 함수
  const fetchCurrentUser = async () => {
    try {
      const response = await axios.get('http://52.63.12.126/api/v1/user/my', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'accept': 'application/hal+json'
        }
      });

      if (response.data && response.data.id) {
        setCurrentUser(response.data.username);
        setCurrentUserId(response.data.id); // 로그인한 사용자 ID 설정
      } else {
        console.error('Invalid currentUser response structure:', response.data);
      }
    } catch (error) {
      console.error('Error fetching current user data:', error);
    }
  };

  // 페이지가 로드될 때 데이터를 불러옴
  useEffect(() => {
    fetchPostData();
    fetchCurrentUser(); // 로그인한 사용자 정보 로드
  }, [id]);

  // 드롭다운 메뉴 토글 함수
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // 게시글 수정 페이지로 이동
  const handleUpdateClick = () => {
    navigate(`/update/${id}`);
  };

  // 게시글 삭제 요청
  const handleDeleteClick = async () => {

    try {
      await axios.delete(`http://52.63.12.126/api/v1/posts/${id}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'accept': 'application/hal+json'
        }
      });

      navigate('/community');
    } catch (error) {
      console.error('게시글 삭제 실패:', error.response ? error.response.data : error.message);
    }
  };

  // 게시글 판매 요청 (로그인한 사용자 ID를 전달)
  const handleSellClick = async () => {

    try {
      await axios.patch(`http://52.63.12.126/api/v1/posts/${id}/sell?buyerId=${currentUserId}`, null, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'accept': 'application/hal+json'
        }
      });
      navigate('/community');
    } catch (error) {
      console.error('판매 요청 실패:', error.response ? error.response.data : error.message);
    }
  };

  if (!postData) {
    return <div>Loading...</div>;
  }

  const isPostAuthor = currentUserId === postAuthorId;

  return (
    <>
      <Nav />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className={DetailCss.detail_container}>
          <div className={DetailCss.detail_wrapper}>
            <div className={DetailCss.detail_header}>
              <div className={DetailCss.profile} />
              <h1 className={DetailCss.username}>{postData.user && postData.user.username ? postData.user.username : 'Unknown User'}</h1>
              {isPostAuthor && (
                <span className={DetailCss.more_options}>
                  <button onClick={toggleDropdown}>&#8942;</button>
                  {showDropdown && (
                    <div className={DetailCss.dropdown_menu}>
                      <button onClick={handleUpdateClick}>수정하기</button>
                      <button onClick={handleDeleteClick}>삭제하기</button>
                    </div>
                  )}
                </span>
              )}
            </div>

            <div className={DetailCss.detail_img}>
              <img src={process.env.PUBLIC_URL + '/vegetable.jpg'} alt="상품 이미지" />
            </div>

            <div className={DetailCss.detail_title}>
              <h1>{postData.title}</h1>
            </div>

            <div className={DetailCss.detail_price}>
              <p>{postData.price}원</p>
            </div>

            <div className={DetailCss.detail_info}>
              <p>{postData.content}</p>
            </div>
          </div>
          <button className={DetailCss.buy} onClick={handleSellClick}>구매하기</button> {/* 로그인한 사용자 ID로 판매 요청 */}
          <div className={DetailCss.comment_section}>
            <CommentSection postId={id} currentUser={currentUser} postAuthorId={postAuthorId} {...props} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Detail;
