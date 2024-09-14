import React from 'react';
import StatusCard from './StatusCard';

const Humidity = () => {
  return (
    <StatusCard
      title="습도"
      subtitle="현재 습도"
      content="45%"
      warning="내부 습도가 높습니다. 습도를 조절해주세요."
    />
  );
};

export default Humidity;
