import { useNavigate } from "react-router-dom";
import HomeCss from "./css/Home.module.css";
import Nav from './components/CommunityNav';

function Home() {
  let navigate = useNavigate();
  return (
    <div className="flex h-screen">
      {/* 왼쪽 Nav 컴포넌트 */}
      <div className="w-1/4 bg-gray-100">
        <Nav />
      </div>

      {/* 오른쪽 텍스트 영역 */}
      <div className="w-3/4 relative p-4">
        <section>
          {/* 배경 박스 */}
          <div className="w-full h-48 bg-white rounded-2xl" />
          
          {/* 첫 번째 텍스트 (카테고리 정보) */}
          <div className="absolute left-8 top-16 text-[#1a1c16] text-4xl font-bold font-['Roboto'] leading-snug">
            %formCategory% 스마트팜에 입장하셨습니다.
          </div>

          {/* 두 번째 텍스트 (OWNER 정보) */}
          <div className="absolute left-8 top-32 text-[#1a1c16] text-3xl font-normal font-['Roboto'] leading-snug">
            OWNER<br/>%USERNAME% 님.
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
