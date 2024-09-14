import React from 'react';
import StatusCard from './StatusCard';

const PlantStatus = () => {
  return (
    <StatusCard
      title="식물 상태"
      subtitle="현재 식물 상태는 양호"
      content="식물 상태를 지속적으로 확인해주세요."
    />
  );
};

export default PlantStatus;
