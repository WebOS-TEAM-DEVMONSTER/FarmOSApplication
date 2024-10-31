import React from 'react';
import StatusCard2 from './StatusCard2';
import StatusCardTemp from './StatusCardTemp';

const Temperature = (temp) => {

  var goalTemp = 25;
  var warn = "";


  if(temp > 30){ // Todo: 기준 및 텍스트 수정
    warn = "내부 습도가 높습니다 내부 습도를 낮춰주세요."
  } else if(temp > 15){
    warn = "내부 습도가 적당합니다."
  } else {
    warn = "내부. 습도가 낮습니다 내부 습도를 높여주세요"
  }


  return (
    <StatusCardTemp
      buttontext="온도 조절"
      nowstate="현재 온도"
      makestate = "바꿀 온도"
      makenum = {goalTemp}
      title="온도"
      warning="내부 온도가 높습니다 내부 온도를 낮추세오."
    
    />
  );
};

export default Temperature;
