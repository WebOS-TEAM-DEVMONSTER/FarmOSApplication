import navStyle from "../css/Nav.module.less";
import { Link ,NavLink } from 'react-router-dom';


function CommunityNav() {
  return (
    <>
      <nav className={navStyle.nav}>
        <ul className={navStyle.nav_wrapper}>
          <li>
            <NavLink className={navStyle.active} to="/community">&#8962;</NavLink>
            <NavLink className={navStyle.active} to="/community">홈</NavLink>
          </li>
          <li>
            <NavLink className={`${navStyle.active} ${navStyle.small_text}`}>&#9829;</NavLink>
            <NavLink className={`${navStyle.active} ${navStyle.small_text}`}>온습도 조절, 토양 상태확인</NavLink>
          </li>
          <li>
            <NavLink className={navStyle.active}>&#9829;</NavLink>
            <NavLink className={navStyle.active}>건강</NavLink>
          </li>
          <li>
            <NavLink className={navStyle.active}>&#9829;</NavLink>
            <NavLink className={navStyle.active}>CCTV</NavLink>
          </li>
          <p>커뮤니티</p>
          <li>
          <NavLink className={navStyle.active} to="/community">&#9829;</NavLink>
          <NavLink className={navStyle.active} to="/community">커뮤니티 홈</NavLink>
          </li>
          <li>
          <NavLink className={navStyle.active} to="/myDetail">&#9829;</NavLink>
          <NavLink className={navStyle.active} to="/myDetail">내 게시글</NavLink>
          </li>
          <li>
          <NavLink className={navStyle.active} to="/create">&#9829;</NavLink>
          <NavLink className={navStyle.active} to="/create">게시글 등록</NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default CommunityNav;
