import React from 'react';
import StatusCard2 from './StatusCard2';

const Humidity = () => {
  return (
    <StatusCard2
      buttontext="습도 조절"
      nowstate="현재 습도"
      nownum="65.7"
      title="습도"
      warning="내부 습도가 높습니다 내부 습도를 낮춰주세요."
    />
  );
};

export default Humidity;
