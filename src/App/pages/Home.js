import { useNavigate } from "react-router-dom";
import HomeCss from "./css/Home.module.css";
import React, { useState, useEffect } from 'react';
import Nav from './components/CommunityNav';
import axios from 'axios';
import Cookies from 'js-cookie';



function Home() {

  const [username, setUsername] = useState('');
 
  const accessToken = Cookies.get('accessToken'); // 쿠키에서 accessToken 가져오기

  useEffect(() => {
    console.log("Access Token:", accessToken); // accessToken이 제대로 들어오는지 확인

    // 첫 번째 API: 사용자 이름 가져오기
    const fetchUsername = async () => {
      if (!accessToken) {
        console.error('No access token available');
        return;
      }

      try {
        const response = await axios.get('http://52.63.12.126/api/v1/user/my', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            accept: 'application/hal+json',
          },
        });
        setUsername(response.data.username);
      } catch (error) {
        console.error('Error fetching username:', error);
      }
    };

    
    // API 호출
    fetchUsername();
    
  }, [accessToken]); // accessToken이 변경될 때만 useEffect 재실행
  return (
    <>
      <div className="flex w-screen h-screen bg-white">
        
        <Nav />

        <section className="flex-grow h-full p-10 bg-white flex flex-col items-end">
          <h1 className="w-full text-center text-[#1a1c16] text-7xl font-bold mb-10">스마트팜</h1>

          <div className="w-full flex flex-col items-end space-y-8 pr-10">
            <div className="w-full max-w-[75%]">
              %formCategory% 스마트팜에 입장하셨습니다.
            </div>
            <div className="w-full max-w-[75%]">
              OWNER<br/>{username}님.
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Home;
