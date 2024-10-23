import Maincard from './components/Maincard';
import React, { useState, useEffect, useContext } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import axios from 'axios';
import Cookies from 'js-cookie';
import { GlobalContext } from '../../global_provider';

const Mainhome = () => {
  const [username, setUsername] = useState('');
  const [farms, setFarms] = useState([]);
  const { accessToken } = useContext(GlobalContext);

  useEffect(() => {
    console.log("Access Token:", accessToken);

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
    <div className="w-full h-screen flex justify-center items-center bg-white">
      <div className="flex flex-col items-center mr-10">
        <div className="w-32 h-32 bg-green-400 rounded-full flex justify-center items-center mb-4">
          <FaUserCircle size={100} color="white" />
        </div>

        <div className="text-[#1a1c16] text-[45px] font-normal font-['Roboto'] leading-tight text-center">
          {username ? `${username}님` : 'Loading...'}
        </div>

        <div className="text-[#1a1c16] text-[45px] font-normal font-['Roboto'] leading-tight text-center">
          스마트팜
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {farms.length > 0 ? (
          farms.map((farm) => (
            <Maincard key={farm.id} farm={farm} />
          ))
        ) : (
          <div>Loading items...</div>
        )}
      </div>
    </div>
  );
};

export default Mainhome;
