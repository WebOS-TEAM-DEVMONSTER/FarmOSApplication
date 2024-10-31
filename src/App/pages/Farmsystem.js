import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Scroller } from '@enact/moonstone/Scroller';
import Nav from './components/CommunityNav';
import Temperature from './components/Temperature';
import Humidity from './components/Humidity';
import SoilStatus from './components/SoilStatus';
import PlantStatus from './components/PlantStatus';
import styles from './css/Farmsystem.module.less';
import { GlobalContext } from '../../global_provider';
import {useHeartBeat} from '../functions/use_heartbeat';


const Farmsystem = () => {
  const { id } = useParams();
  const [farmData, setFarmData] = useState(null);
  const accessToken = window.localStorage.getItem('accessToken');
  const {temperature, humidity, ecOfSoil, phOfSoil, moistureOfSoil, evaluation} = useContext(GlobalContext)
  
  useHeartBeat(id);

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
        setFarmData(response.data);
      } catch (error) {
        console.error('Error fetching farm data:', error);
      }
    };

    fetchFarmData();

      //함수호출

  }, [id, accessToken]);

  if (!farmData) {
    return <div>Loading farm system data...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.navWrapper}>
        <Nav />
      </div>

      <Scroller className={styles.section} verticalScrollbar="visible">
        <h1 className={styles.title}>
          {farmData.farmName} 스마트팜 상태 확인
        </h1>

        <div className={styles['data-container']}>
          <div className={styles.card}>
            <Temperature value={temperature} />
          </div>
          <div className={styles.card}>
            <Humidity value={humidity} />
          </div>
          <div className={styles.card}>
            <SoilStatus value={moistureOfSoil} />
          </div>
          <div className={styles.card}>
            <PlantStatus value={evaluation} />
          </div>
        </div>
      </Scroller>
    </div>
  );
};

export default Farmsystem;
