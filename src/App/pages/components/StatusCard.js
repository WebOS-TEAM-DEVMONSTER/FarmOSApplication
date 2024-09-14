import React from 'react';

const StatusCard = ({ title, subtitle, content, warning }) => {
  return (
    <div className="w-full max-w-[60vw] h-auto md:h-[50vh] bg-[#f3f5e9] rounded-xl shadow p-6 m-4">
      <h2 className="text-[#1a1c16] text-6xl font-bold mb-4">{title}</h2>
      <h3 className="text-[#1a1c16] text-5xl font-normal mb-2">{subtitle}</h3>
      <p className="text-[#1a1c16] text-3xl font-normal mb-4">{content}</p>
      {warning && <p className="text-[#ff0000] text-3xl">{warning}</p>}
    </div>
  );
};

export default StatusCard;
