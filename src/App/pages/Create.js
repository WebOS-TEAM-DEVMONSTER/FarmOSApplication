import Nav from "./components/CommunityNav";
import "react";
import createCss from "./css/Create.module.less";
import "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom"; // useNavigate 가져오기

function Create(props) {
  const [farms, setFarms] = useState([]);
  const [selectedFarmId, setSelectedFarmId] = useState("");
  const accessToken = Cookies.get('accessToken'); // 쿠키에서 accessToken 가져오기
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 사용

  // 농장 목록을 서버에서 가져오는 함수
  useEffect(() => {
    const fetchFarms = async () => {
      try {
        console.log('Access Token:', accessToken); // 토큰이 제대로 있는지 확인
        const response = await axios.get("http://52.63.12.126/api/v1/farms/my", {
          headers: {
            "Authorization": `Bearer ${accessToken}`, // Authorization 헤더 추가
          },
        });
        console.log('Farms data:', response.data); // 응답 데이터 로그로 확인
        setFarms(response.data); // 서버에서 받아온 농장 데이터를 상태로 저장
      } catch (error) {
        console.error("Failed to fetch farms", error); // 에러 메시지 확인
        if (error.response && error.response.status === 403) {
          console.error('403 Forbidden: 인증 또는 권한 문제');
        }
      }
    };
  
    fetchFarms();
  }, [accessToken]);

  const handleFarmChange = (e) => {
    setSelectedFarmId(e.target.value);
  };

  return(
    <>
      <Nav />
      <form style={{display :"flex", justifyContent : "center" } }
          onSubmit= { async (event) =>  {
          event.preventDefault();
          const title = event.target.title.value;
          const price = event.target.price.value;
          const content = event.target.content.value;
          const farmId = selectedFarmId;

          const postData = {
            title: title,
            price: price,
            content: content,
            farmId: farmId,
          };
          
          let header = {
            'accept': 'application/hal+json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+accessToken // 쿠키에서 찾기
          };

          try {
            const response = await axios.post('http://52.63.12.126/api/v1/posts', postData, {
              headers: header
            });
            console.log('Post created successfully:', response.data);
            navigate('/community'); // 게시글이 성공적으로 생성되면 /community로 이동
          } catch (error) {
            console.error('There was an error creating the post!', error);
          }
        }}
      >
        <div className={createCss.container}>
          <h1>게시글 작성하기</h1>
          <input className={createCss.title} name="title" placeholder="제목"/>
          <input className={createCss.price} name="price" placeholder="가격"/>
          <textarea className={createCss.content} name="content" placeholder="내용"/>
          
          {/* 서버에서 받아온 농장 목록을 이용해 드롭다운 생성 */}
          <div>
            <label htmlFor="farm-select">농장을 선택하세요:</label>
            <select
              id="farm-select"
              onChange={handleFarmChange}
              value={selectedFarmId}
            >
              <option value="" disabled>
                농장 선택
              </option>
              {farms.map((farm) => (
                <option key={farm.id} value={farm.id}>
                  {farm.farmName}
                </option>
              ))}
            </select>
          </div>
          <section>
            <button>게시글 등록</button>
          </section>
        </div>
      </form>
    </>
  )
}

export default Create;
