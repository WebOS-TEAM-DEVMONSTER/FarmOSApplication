import React from 'react';
import StatusCard2 from './StatusCard2';

const Temperature = () => {
  return (
    <StatusCard2
      buttontext="온도 조절"
      nowstate="현재 온도"
      nownum="65.7"
      title="온도"
      warning="내부 온도가 높습니다 내부 온도를 낮추세오."
    
    />
  );
};

export default Temperature;
