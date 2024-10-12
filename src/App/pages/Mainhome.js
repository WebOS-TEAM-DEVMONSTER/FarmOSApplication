import Maincard from './components/Maincard';
import React, { useState, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import axios from 'axios';
import Cookies from 'js-cookie';

const Mainhome = () => {
  const [username, setUsername] = useState('');
  const [farmName, setItems] = useState([]); // 초기값을 빈 배열로 설정
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

    // 두 번째 API: 아이템 목록 가져오기
    const fetchItems = async () => {
      if (!accessToken) {
        console.error('No access token available');
        return;
      }

      try {
        const response = await axios.get('http://52.63.12.126/api/v1/farms/my', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            accept: 'application/hal+json',
          },
        });
        setItems(response.data.farmName || []); // farmName이 없을 때 빈 배열로 처리
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    // API 호출
    fetchUsername();
    fetchItems();
  }, [accessToken]); // accessToken이 변경될 때만 useEffect 재실행

  return (
    <div className="w-full h-screen flex justify-center items-center bg-white">
      <div className="flex flex-col items-center mr-10">
        
        {/* 사용자 프로필 */}
        <div className="w-32 h-32 bg-green-400 rounded-full flex justify-center items-center mb-4">
          <FaUserCircle size={100} color="white" />
        </div>
        
        {/* 사용자 이름 표시 */}
        <div className="text-[#1a1c16] text-[45px] font-normal font-['Roboto'] leading-tight text-center">
          {username ? `${username}님` : 'Loading...'}
        </div>
        
        {/* 스마트팜 텍스트 */}
        <div className="text-[#1a1c16] text-[45px] font-normal font-['Roboto'] leading-tight text-center">
          스마트팜
        </div>
      </div>

      {/* Maincard 컴포넌트에 items 전달 */}
      <div className="flex flex-col gap-4">
        {Array.isArray(farmName) && farmName.length > 0 ? (
          farmName.map((farm, index) => (
            <Maincard key={index} title={farm} />
          ))
        ) : (
          <div>Loading items...</div> 
        )}
      </div>
    </div>
  );
};

export default Mainhome;
