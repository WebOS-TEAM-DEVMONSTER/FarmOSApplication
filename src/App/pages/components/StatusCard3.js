import React from 'react';

const SoilStatus = ({ hum, ph, aa, el, warning }) => {
  return (
    <div className="w-full max-w-[60vw] h-auto md:h-[50vh] bg-[#f3f5e9] rounded-xl shadow p-6 m-4">
      
      {/* 제목 */}
      <div className="text-center text-[#1a1c16] text-4xl font-bold mb-6">
        토양상태
      </div>
      
      {/* 상태 정보들을 담은 영역 */}
      <div className="flex justify-between">
        
        {/* 왼쪽 상태 정보 */}
        <div className="text-[#1a1c16] text-xl leading-relaxed">
          <ul>
            <li>토양 수분 : {hum}%</li>
            <li>PH농도 : {ph}</li>
            <li>유기물 함량: {aa}%</li>
            <li>전기 전도도 : {el}%</li>
          </ul>
        </div>

        {/* 오른쪽 상태 메시지 */}
        <div className="text-[#1a1c16] text-xl leading-relaxed">
          <div className="flex items-start mb-2">
            <input type="checkbox" checked className="mr-2" />
            <div>{warning}</div> {/* warning - 현재 토양 상태는 매우 좋습니다. */}
          </div>
        </div>

      </div>
    </div>
  );
};

export default SoilStatus;
