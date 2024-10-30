import React, { useState, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import axios from 'axios';
import Maincard from './components/Maincard';
import styles from './css/Mainhome.module.less'; // CSS 모듈 import

const Mainhome = () => {
  const [username, setUsername] = useState('');
  const [farms, setFarms] = useState([]);

  // localStorage에서 accessToken 가져오기
  const accessToken = window.localStorage.getItem('accessToken');

  useEffect(() => {
    console.log('Access Token:', accessToken);

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

    const fetchFarms = async () => {
      if (!accessToken) return;
      try {
        const response = await axios.get('http://52.63.12.126/api/v1/farms/my', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            accept: 'application/hal+json',
          },
        });
        console.log('Farms:', response.data);
        setFarms(response.data || []);
      } catch (error) {
        console.error('Error fetching farms:', error);
      }
    };

    fetchUsername();
    fetchFarms();
  }, [accessToken]);

  return (
    <div className={styles.container}>
      <div className={styles['profile-wrapper']}>
        <div className={styles['profile-icon']}>
          <FaUserCircle size={100} color="white" />
        </div>

        <div className={styles.username}>
          {username ? `${username}님` : 'Loading...'}
        </div>

        <div className={styles.title}>스마트팜</div>
      </div>

      <div className={styles['farm-list']}>
        {farms.length > 0 ? (
          farms.map((farm) => <Maincard key={farm.id} farm={farm} />)
        ) : (
          <div>Loading items...</div>
        )}
      </div>
    </div>
  );
};

export default Mainhome;
