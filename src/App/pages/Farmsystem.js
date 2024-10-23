import Nav from './components/CommunityNav';
import Temperature from './components/Temperature';
import StatusCard2 from './components/StatusCard2';
import Humidity from './components/Humidity';
import SoilStatus from './components/SoilStatus';
import PlantStatus from './components/PlantStatus';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const Farmsystem = () => {
  const { id } = useParams(); // URL에서 농장 ID 가져오기
  const [farmData, setFarmData] = useState(null); // 농장 데이터 상태
  const accessToken = Cookies.get('accessToken');

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
      <div className="flex w-full h-full">
        <Nav />
      </div>

      <section className="flex-grow h-full p-10 bg-white flex flex-col items-end">
        <h1 className="w-full text-center text-[#1a1c16] text-7xl font-bold mb-10">
          {farmData.farmName} 스마트팜 상태 확인
        </h1>

        <div className="w-full flex flex-col items-end space-y-8 pr-10">
          <div className="w-full max-w-[75%]">
            <Temperature value={farmData.temperature} /> {/* 온도 데이터 */}
          </div>
          <div className="w-full max-w-[75%]">
            <Humidity value={farmData.humidity} /> {/* 습도 데이터 */}
          </div>
          <div className="w-full max-w-[75%]">
            <SoilStatus value={farmData.soilMoisture} /> {/* 토양 상태 */}
          </div>
          <div className="w-full max-w-[75%]">
            <PlantStatus value={farmData.plantHealth} /> {/* 식물 상태 */}
          </div>
        </div>
      </section>
    </>
  );
};

export default Farmsystem;
