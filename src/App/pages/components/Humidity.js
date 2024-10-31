import React from 'react';
import StatusCard2 from './StatusCard2';

const Humidity = (hum) => {

  var warn = "";

  if(hum > 30){ // Todo: 기준 및 텍스트 수정
    warn = "내부 습도가 높습니다 내부 습도를 낮춰주세요."
  } else if(hum > 15){
    warn = "내부 습도가 적당합니다."
  } else {
    warn = "내부. 습도가 낮습니다 내부 습도를 높여주세요"
  }

  return (
    <StatusCard2
      buttontext="습도 조절"
      nowstate="현재 습도"
      nownum={hum}
      title="습도"
      warning={warn}
    />
  );
};

export default Humidity;
