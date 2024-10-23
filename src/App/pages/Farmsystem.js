import Nav from './components/CommunityNav';
import Temperature from './components/Temperature';
import StatusCard2 from './components/StatusCard2';
import Humidity from './components/Humidity';
import SoilStatus from './components/SoilStatus';
import PlantStatus from './components/PlantStatus';
import { useParams } from 'react-router-dom';

const Farmsystem = () => {
  const { id } = useParams();
  return (
    <>
      <div className="flex w-full h-full">
        
          <Nav />
        </div>

        
        <section className="flex-grow h-full p-10 bg-white flex flex-col items-end">
          <h1 className="w-full text-center text-[#1a1c16] text-7xl font-bold mb-10">스마트팜 상태 확인</h1>

          
          <div className="w-full flex flex-col items-end space-y-8 pr-10">
            <div className="w-full max-w-[75%]">
              <Temperature />
            </div>
            <div className="w-full max-w-[75%]">
              <Humidity />
            </div>
            <div className="w-full max-w-[75%]">
              <SoilStatus />
            </div>
            <div className="w-full max-w-[75%]">
              <PlantStatus />
            </div>
          </div>
        </section>
      
    </>
  );
};

export default Farmsystem;
