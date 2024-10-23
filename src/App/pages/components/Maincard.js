import React from 'react';
import { useNavigate } from 'react-router-dom';

const Maincard = ({ farm }) => {
  const navigate = useNavigate();

  return (
    <div
      className="w-[883px] h-[154px] rounded-xl bg-[#f3f7e1] shadow p-4 flex items-center cursor-pointer"
      onClick={() => navigate(`/home/${farm.id}`)}
    >
      <div className="text-[#1a1c16] text-[45px] font-medium font-['Roboto'] leading-normal tracking-tight">
        {farm.farmName} 스마트팜
      </div>
    </div>
  );
};

export default Maincard;
