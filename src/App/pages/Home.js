import { useNavigate } from "react-router-dom";
import HomeCss from "./css/Home.module.css";
import Nav from './components/CommunityNav';

function Home() {
  return (
    <>
      <div className="flex w-screen h-screen bg-white">
        
        <Nav />

        <section className="flex-grow h-full p-10 bg-white flex flex-col items-end">
          <h1 className="w-full text-center text-[#1a1c16] text-7xl font-bold mb-10">스마트팜 상태 확인</h1>

          <div className="w-full flex flex-col items-end space-y-8 pr-10">
            <div className="w-full max-w-[75%]">
              %formCategory% 스마트팜에 입장하셨습니다.
            </div>
            <div className="w-full max-w-[75%]">
              OWNER<br/>%USERNAME% 님.
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Home;
