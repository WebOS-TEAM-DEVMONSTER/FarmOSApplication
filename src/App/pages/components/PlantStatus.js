import React from 'react';
import StatusCard from './StatusCard';

const PlantStatus = (url) => {
  return (
    <StatusCard
      title="식물 상태"
      subtitle="현재 식물 상태는 양호"
      content="식물 상태를 지속적으로 확인해주세요."
    />
  );
};


//식물 상태
//0~37까지 텍스트로 변환
//아웃풋 : 질병 명(38개 중 하나)
//

export default PlantStatus;
