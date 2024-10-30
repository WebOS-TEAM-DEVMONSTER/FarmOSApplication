import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom'; // useLocation import
import axios from 'axios';
import navStyle from '../css/Nav.module.less';

function CommunityNav() {
  const [farms, setFarms] = useState([]); // 모든 농장 목록
  const [selectedFarmId, setSelectedFarmId] = useState(null); // 선택된 농장 ID 저장
  const accessToken = window.localStorage.getItem('accessToken'); // localStorage에서 accessToken 가져오기

  const location = useLocation(); // 현재 경로 가져오기

  // 농장 목록을 API로부터 불러오기
  useEffect(() => {
    const fetchFarms = async () => {
      if (!accessToken) return;

      try {
        const response = await axios.get('http://52.63.12.126/api/v1/farms/my', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            accept: 'application/hal+json',
          },
        });
        setFarms(response.data || []); // 농장 목록 저장
      } catch (error) {
        console.error('Error fetching farms:', error);
      }
    };

    fetchFarms();
  }, [accessToken]);

  // 현재 경로가 특정 농장의 페이지인지 확인하고, 해당 농장 ID를 추출
  useEffect(() => {
    const pathParts = location.pathname.split('/');
    if (pathParts[1] === 'home' || pathParts[1] === 'farmsystem') {
      setSelectedFarmId(pathParts[2]); // 선택된 농장 ID 설정
    } else {
      setSelectedFarmId(null); // 선택되지 않은 경우 초기화
    }
  }, [location]);

  return (
    <nav className={navStyle.nav}>
      <ul className={navStyle.nav_wrapper}>
        {/* 메인 홈 링크 */}
        <li>
          <NavLink className={navStyle.active} to="/mainhome">&#8962;</NavLink>
          <NavLink className={navStyle.active} to="/mainhome">메인 홈</NavLink>
        </li>

        {/* 선택된 스마트팜의 링크만 표시 */}
        {selectedFarmId && (
          <>
            <li>
              <NavLink
                className={`${navStyle.active} ${navStyle.small_text}`}
                to={`/home/${selectedFarmId}`}
              >
                &#9829; {farms.find(farm => farm.id === selectedFarmId)?.farmName} 홈
              </NavLink>
            </li>
            <li>
              <NavLink
                className={`${navStyle.active} ${navStyle.small_text}`}
                to={`/farmsystem/${selectedFarmId}`}
              >
                &#9829; {farms.find(farm => farm.id === selectedFarmId)?.farmName} 상태관리
              </NavLink>
            </li>
          </>
        )}

        <li>
          <NavLink className={navStyle.active} to="/test">&#9829;</NavLink>
          <NavLink className={navStyle.active} to="/test">테스트</NavLink>
        </li>
        

        {/* 커뮤니티 링크 */}
        <p>커뮤니티</p>
        <li>
          <NavLink className={navStyle.active} to="/community">&#9829;</NavLink>
          <NavLink className={navStyle.active} to="/community">커뮤니티 홈</NavLink>
        </li>

        {/* 게시글 등록 링크 */}
        <li>
          <NavLink className={navStyle.active} to="/create">&#9829;</NavLink>
          <NavLink className={navStyle.active} to="/create">게시글 등록</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default CommunityNav;
