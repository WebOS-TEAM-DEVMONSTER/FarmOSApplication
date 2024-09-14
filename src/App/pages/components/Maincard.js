import React from 'react';

const Maincard = ({ title }) => (
  <div className="w-[883px] h-[154px] rounded-xl bg-[#f3f7e1] shadow p-4 flex items-center">
    <div className="text-[#1a1c16] text-[45px] font-medium font-['Roboto'] leading-normal tracking-tight">
      {title} 스마트팜
    </div>
  </div>
);

export default Maincard;
