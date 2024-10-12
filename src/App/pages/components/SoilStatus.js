import React from 'react';
import StatusCard3 from './StatusCard3';

const SoilStatus = () => {
  return (
    <StatusCard3
      hum="32"
      ph="3"
      aa="33"
      el="55"
      warning="현재 토양상태는 매우 좋습니다."
    />
  );
};

export default SoilStatus;
