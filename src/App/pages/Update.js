import Nav from "./components/CommunityNav";
import updateCss from "./css/Update.module.less";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';
import Cookies from 'js-cookie';

function Update(props) { 
  const { id } = useParams(); // 게시글 ID 가져오기
  const [title, setTitle] = useState(""); // 제목 상태
  const [price, setPrice] = useState(""); // 가격 상태
  const [content, setContent] = useState(""); // 내용 상태
  const navigate = useNavigate(); // 네비게이션 훅

  // 수정 페이지가 로드될 때 기존 데이터를 가져오는 함수
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const accessToken = Cookies.get('accessToken'); // Access Token 가져오기
        const response = await axios.get(
          `http://52.63.12.126/api/v1/posts/${id}`, // 게시글 데이터 불러오기
          {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'accept': 'application/hal+json',
            },
          }
        );

        // 기존 데이터를 로컬 상태에 저장하여 form에 표시
        setTitle(response.data.title);
        setPrice(response.data.price);
        setContent(response.data.content);
      } catch (error) {
        console.error('게시글 데이터를 불러오는 데 실패했습니다:', error.response ? error.response.data : error.message);
      }
    };

    fetchPostData();
  }, [id]);

  // 수정 요청 함수
  const handleUpdate = async (event) => {
    event.preventDefault(); // 폼 제출 시 페이지 새로고침 방지

    const accessToken = Cookies.get('accessToken'); // Access Token 가져오기

    try {
      // API 요청: 게시글 수정
      const response = await axios.patch(
        `http://52.63.12.126/api/v1/posts/${id}`,
        {
          title: title,
          price: Number(price), // 가격을 숫자로 변환해서 전송
          content: content,
          tags: [], // 태그는 빈 배열로 전송
          cropsImages: [] // 이미지도 빈 배열로 전송
        },
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`, // Access Token을 헤더에 포함
            'Content-Type': 'application/json',
            'accept': 'application/hal+json',
          },
        }
      );

      console.log('게시글 수정 성공:', response.data);
      
      // 수정 후 페이지 이동 (예: 수정된 게시글 상세 페이지)
      navigate(`/detail/${id}`);
    } catch (error) {
      console.error('게시글 수정 실패:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <>
      <Nav />
      <form 
        style={{display: "flex", justifyContent: "center"}} 
        onSubmit={handleUpdate} // 폼 제출 시 handleUpdate 실행
      >
        <div className={updateCss.container}>
          <h1>게시글 수정하기</h1>
          <input 
            className={updateCss.title} 
            name="title" 
            value={title}  
            placeholder="제목"
            onChange={event => setTitle(event.target.value)} // 제목 수정
          />
          <input 
            className={updateCss.price} 
            name="price" 
            value={price} 
            placeholder="가격"
            onChange={event => setPrice(event.target.value)} // 가격 수정
          />
          <textarea 
            className={updateCss.content} 
            name="content"  
            value={content} 
            placeholder="내용"
            onChange={event => setContent(event.target.value)} // 내용 수정
          />
          
          <section>
            <button type="submit">게시글 수정</button> {/* 폼 제출 버튼 */}
          </section>
        </div>
      </form>
    </>
  );
}

export default Update;
