import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Nav from './components/CommunityNav';
import Temperature from './components/Temperature';
import Humidity from './components/Humidity';
import SoilStatus from './components/SoilStatus';
import PlantStatus from './components/PlantStatus';
import styles from './css/Farmsystem.module.less'; // CSS 모듈 import

const Farmsystem = () => {
  const { id } = useParams(); // URL에서 농장 ID 가져오기
  const [farmData, setFarmData] = useState(null); // 농장 데이터 상태
  const accessToken = window.localStorage.getItem('accessToken'); // localStorage에서 accessToken 가져오기

  // 농장 데이터를 API로부터 가져오는 함수
  useEffect(() => {
    const fetchFarmData = async () => {
      if (!accessToken) return;

      try {
        const response = await axios.get(
          `http://52.63.12.126/api/v1/farms/${id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              accept: 'application/hal+json',
            },
          }
        );
        setFarmData(response.data); // 농장 데이터 설정
      } catch (error) {
        console.error('Error fetching farm data:', error);
      }
    };

    fetchFarmData();
  }, [id, accessToken]);

  if (!farmData) {
    return <div>Loading farm system data...</div>; // 데이터 로딩 시 표시
  }

  return (
    <>
      <div className={styles.container}>
        <Nav />
      </div>

      <section className={styles.section}>
        <h1 className={styles.title}>
          {farmData.farmName} 스마트팜 상태 확인
        </h1>

        <div className={styles['data-container']}>
          <div className={styles.card}>
            <Temperature value={farmData.temperature} /> {/* 온도 데이터 */}
          </div>
          <div className={styles.card}>
            <Humidity value={farmData.humidity} /> {/* 습도 데이터 */}
          </div>
          <div className={styles.card}>
            <SoilStatus value={farmData.soilMoisture} /> {/* 토양 상태 */}
          </div>
          <div className={styles.card}>
            <PlantStatus value={farmData.plantHealth} /> {/* 식물 상태 */}
          </div>
        </div>
      </section>
    </>
  );
};

export default Farmsystem;
