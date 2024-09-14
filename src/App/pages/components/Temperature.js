import React from 'react';
import StatusCard from './StatusCard';

const Temperature = () => {
  return (
    <StatusCard
      title="온도"
      subtitle="현재 온도"
      content="65.7°C"
      warning="내부 온도가 높습니다. 내부 온도를 낮춰주세요."
    />
  );
};

export default Temperature;
