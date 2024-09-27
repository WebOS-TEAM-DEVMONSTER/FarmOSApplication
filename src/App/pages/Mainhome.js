import Maincard from './components/Maincard';
import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';

const Mainhome = () => {
  const [items, setItems] = useState(['고구마', '배추', '%item%']);

  return (
    <div className="w-full h-screen flex justify-center items-center bg-white">
      <div className="flex flex-col items-center mr-10">
        
        <div className="w-32 h-32 bg-green-400 rounded-full flex justify-center items-center mb-4">
          <FaUserCircle size={100} color="white" />
        </div>
        
       
        <div className="text-[#1a1c16] text-[45px] font-normal font-['Roboto'] leading-tight text-center">
          %USERNAME%님 {/*user api 가져오기*/}
        </div>
        <div className="text-[#1a1c16] text-[45px] font-normal font-['Roboto'] leading-tight text-center">
          스마트팜
        </div>
      </div>

      
      <div className="flex flex-col gap-4">
        {items.map((item, index) => (
          <Maincard key={index} title={item} />   
        ))}
      </div>
    </div>
  );
};

export default Mainhome;
