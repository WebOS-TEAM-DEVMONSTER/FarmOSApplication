import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Nav from './components/CommunityNav';
import styles from './css/Home.module.less'; // CSS 모듈 import

function Home() {
  const { id } = useParams(); // URL에서 농장 ID 가져오기
  const [farm, setFarm] = useState(null);
  const [username, setUsername] = useState('');

  // localStorage에서 accessToken 가져오기
  const accessToken = window.localStorage.getItem('accessToken');

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
    <div className={styles.container}>
      <Nav />
      <section className={styles.section}>
        <h1 className={styles.title}>{farm.farmName} 스마트팜</h1>
        <div className={styles.text}>
          {farm.farmCategory} 스마트팜에 입장하셨습니다.
        </div>
        <div className={styles.text}>
          OWNER<br />{username}님.
        </div>
      </section>
    </div>
  );
}

export default Home;
