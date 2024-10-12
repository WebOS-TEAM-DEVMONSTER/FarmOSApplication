import React from 'react';

const StatusCard2 = ({ buttontext, nowstate, nownum, title, warning }) => {
  return (
    <div className="w-full max-w-[60vw] h-auto md:h-[50vh] bg-[#f3f5e9] rounded-xl shadow p-6 m-4">
      
      {/* 가로로 중앙 정렬 */}
      <div className="flex items-center justify-center h-full">
        
        {/* 왼쪽 영역 */}
        <div className="flex flex-col items-center justify-center mx-8">
          {/* 화살표 위 */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-10 h-10 mb-4">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
          <div className="text-[#1a1c16] text-3xl">{buttontext}</div>  {/* 온도 조절 - buttontext */}
          {/* 화살표 아래 */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-10 h-10 mt-4">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {/* 가운데 영역 */}
        <div className="flex flex-col items-center mx-8">
          <div className="text-[#1a1c16] text-4xl mb-4">{nowstate}</div>  {/* 현재 온도 - nowstate */}
          <div className="text-[#4a5930] text-8xl font-bold">{nownum}</div>  {/* 65.7 - nownum */}
        </div>

        {/* 오른쪽 영역 */}
        <div className="flex flex-col items-start mx-8">
          <div className="text-[#1a1c16] text-3xl font-bold mb-4">{title}</div>  {/* 온도 - title */}
          <div className="flex items-start text-2xl">
            <input type="checkbox" checked className="mr-4 w-6 h-6" />
            <div>
              {warning}  {/* 내부 온도가 높습니다 내부 온도를 낮춰주세요 - warning */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusCard2;
