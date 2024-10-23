import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import navStyle from '../css/Nav.module.less';

function CommunityNav() {
  const [farms, setFarms] = useState([]); // 농장 목록 저장
  const accessToken = Cookies.get('accessToken');

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
        setFarms(response.data || []);
      } catch (error) {
        console.error('Error fetching farms:', error);
      }
    };

    fetchFarms();
  }, [accessToken]);

  return (
    <nav className={navStyle.nav}>
      <ul className={navStyle.nav_wrapper}>
        {/* 메인 홈 링크 */}
        <li>
          <NavLink className={navStyle.active} to="/mainhome">&#8962;</NavLink>
          <NavLink className={navStyle.active} to="/mainhome">메인 홈</NavLink>
        </li>

        {/* 동적으로 생성된 농장 링크 */}
        {farms.map((farm) => (
          <li key={farm.id}>
            <NavLink className={`${navStyle.active} ${navStyle.small_text}`}to={`/home/${farm.id}`}>&#9829;</NavLink>
            <NavLink className={`${navStyle.active} ${navStyle.small_text}`}to={`/home/${farm.id}`}>
              {farm.farmName} 홈
            </NavLink>
          </li>
        ))}

        {farms.map((farm) => (
          <li key={`status-${farm.id}`}>
            <NavLink className={`${navStyle.active} ${navStyle.small_text}`}to={`/farmsystem/${farm.id}`}>&#9829;</NavLink>
            <NavLink className={`${navStyle.active} ${navStyle.small_text}`}to={`/farmsystem/${farm.id}`}>
              {farm.farmName} 상태관리
            </NavLink>
            
          </li>
        ))}

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
