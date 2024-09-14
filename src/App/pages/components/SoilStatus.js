import React from 'react';
import StatusCard from './StatusCard';

const SoilStatus = () => {
  return (
    <StatusCard
      title="토양 상태"
      subtitle="토양 수분: 30%, PH 농도: 7.0"
      content="유기물 함량: 2.5%, 전기 전도도: 1.2%"
      warning="토양 수분이 부족합니다. 물을 충분히 주세요."
    />
  );
};

export default SoilStatus;
