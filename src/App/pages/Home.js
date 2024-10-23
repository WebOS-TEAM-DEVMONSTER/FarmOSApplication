import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import Nav from './components/CommunityNav';

function Home() {
  const { id } = useParams(); // URL에서 농장 ID 가져오기
  const [farm, setFarm] = useState(null);
  const [username, setUsername] = useState('');
  const accessToken = Cookies.get('accessToken');

  useEffect(() => {
    const fetchUsername = async () => {
      if (!accessToken) return;
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

    const fetchFarm = async () => {
      if (!accessToken) return;
      try {
        const response = await axios.get(`http://52.63.12.126/api/v1/farms/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            accept: 'application/hal+json',
          },
        });
        setFarm(response.data);
      } catch (error) {
        console.error('Error fetching farm:', error);
      }
    };

    fetchUsername();
    fetchFarm();
  }, [accessToken, id]);

  if (!farm) return <div>Loading farm details...</div>;

  return (
    <div className="flex w-screen h-screen bg-white">
      <Nav />
      <section className="flex-grow h-full p-10 bg-white flex flex-col items-end">
        <h1 className="w-full text-center text-[#1a1c16] text-7xl font-bold mb-10">
          {farm.farmName} 스마트팜
        </h1>
        <div className="w-full max-w-[75%]">
          {farm.farmCategory} 스마트팜에 입장하셨습니다.
        </div>
        <div className="w-full max-w-[75%]">
          OWNER<br />{username}님.
        </div>
      </section>
    </div>
  );
}

export default Home;
