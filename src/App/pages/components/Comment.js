import { useState, useEffect, useContext } from "react";
import axios from 'axios';
import Cookies from 'js-cookie';
import CommentCss from '../css/Comment.module.less'; // Comment용 CSS
import { GlobalContext } from "../../../global_provider";

function CommentSection(props) {
  const [postId, setPostId] = useState(props.postId); // props로 받은 postId를 상태로 관리
  const [currentUser, setCurrentUser] = useState(''); // 현재 사용자 ID
  const [postAuthorId, setPostAuthorId] = useState(props.postAuthorId); // props로 받은 post 작성자 ID 관리
  const [comment, setComment] = useState(''); // 댓글 입력 상태
  const [comments, setComments] = useState([]); // 댓글 리스트 상태
  const [menuOpen, setMenuOpen] = useState(null); // 드롭다운 메뉴 상태
  const { accessToken } = useContext(GlobalContext); // GlobalContext에서 accessToken 가져오기

  // 댓글 입력 핸들러
  const handleComment = (e) => {
    setComment(e.target.value);
    console.log('Comment:', e.target.value); // 입력된 댓글 로그 출력 (디버깅용)
  };

  // 댓글 데이터 불러오기
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://52.63.12.126/api/v1/comments/post/${postId}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'accept': 'application/hal+json'
          }
        });
        console.log('Comments Response:', response.data); // 댓글 데이터 확인용
        setComments(response.data); // 댓글 데이터를 상태에 저장
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments(); // 댓글 데이터 호출
  }, [postId]);

  // 현재 사용자 정보 불러오기
  useEffect(() => {
    const fetchCurrentUser = async () => {

      if (!accessToken) {
        console.error('No access token found. Please log in.');
        return;
      }

      try {
        // 현재 사용자 정보 호출
        const response = await axios.get(`http://52.63.12.126/api/v1/users/me`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`, // 쿠키에서 가져온 토큰을 헤더에 넣기
            'accept': 'application/hal+json'
          }
        });

        console.log('Current User Response:', response.data); // 현재 사용자 데이터 확인용

        if (response.data && response.data.id) {
          setCurrentUser(response.data.id); // 현재 로그인한 사용자 ID 저장
        } else {
          console.error('Invalid currentUser response structure:', response.data);
        }
      } catch (error) {
        console.error('Error fetching current user data:', error);
      }
    };

    fetchCurrentUser();
  }, []);

  // 댓글 삭제 함수
  const handleDelete = async (commentId) => {

    try {
      await axios.delete(`http://52.63.12.126/api/v1/comments/${commentId}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      // 댓글 삭제 후 새로 고침
      const response = await axios.get(`http://52.63.12.126/api/v1/comments/post/${postId}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'accept': 'application/hal+json'
        }
      });
      console.log('Updated Comments after delete:', response.data); // 삭제 후 댓글 데이터 확인
      setComments(response.data);
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  // 댓글 등록 함수
  const handleCommentSubmit = async (e) => {
    e.preventDefault(); // 새로고침 방지

    if (!accessToken) {
      console.error('No access token found. Please log in.');
      return; // 토큰이 없으면 함수 종료
    }

    try {
      // 댓글 등록
      await axios.post(
        `http://52.63.12.126/api/v1/comments/post/${postId}`,
        { content: comment }, // 댓글 내용 (필요한 다른 데이터가 있는지 확인)
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );
      setComment(''); // 댓글 입력창 초기화
      // 댓글 다시 불러오기
      const response = await axios.get(`http://52.63.12.126/api/v1/comments/post/${postId}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'accept': 'application/hal+json'
        }
      });
      console.log('Comments after submit:', response.data); // 댓글 등록 후 데이터 확인
      setComments(response.data); // 댓글 갱신
    } catch (error) {
      console.error('Error posting comment:', error.response ? error.response.data : error.message); // 서버 에러 출력
    }
  };

  // 드롭다운 메뉴 토글
  const toggleMenu = (index) => {
    setMenuOpen(menuOpen === index ? null : index); // 메뉴가 열려 있으면 닫고, 닫혀 있으면 염
  };

  return (
    <div>
      <div className={CommentCss.comment_container}>
        {comments.length > 0 ? (
          comments.map((comment, index) => {
            console.log('Comment Author ID:', comment.commentAuthorId, 'Current User ID:', currentUser);
            return (
              <div key={index} className={CommentCss.commentBox}>
                <p>
                  <strong>
                    {comment.commentAuthorName}
                    {comment.commentAuthorId === postAuthorId && ' (작성자)'}
                  </strong>
                </p>
                <p>{comment.content}</p>

                {/* 댓글 작성자 ID와 현재 로그인한 사용자 ID 비교 */}
                {comment.commentAuthorId === currentUser && (
                  <div className={CommentCss.commentActions}>
                    {/* 3개의 점 버튼 */}
                    <button onClick={() => toggleMenu(index)} className={CommentCss.menuButton}>...</button>
                    {menuOpen === index && (
                      <div className={CommentCss.dropdownMenu}>
                        <button onClick={() => handleDelete(comment.commentId)}>삭제하기</button>
                        <button>수정하기</button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <p>댓글이 없습니다.</p>
        )}
      </div>

      <form onSubmit={handleCommentSubmit}>
        <div className={CommentCss.inputBox}>
          <input
            className={CommentCss.detail_comment}
            onChange={handleComment}
            value={comment}
            placeholder="댓글 입력"
          />
          <button type="submit">댓글 등록</button>
        </div>
      </form>
    </div>
  );
}

export default CommentSection;
