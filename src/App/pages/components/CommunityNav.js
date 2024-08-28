import navStyle from "../css/Nav.module.css";
import { Link ,NavLink } from 'react-router-dom';


function CommunityNav() {
  return (
    <>
      <nav className={navStyle.nav}>
        <ul className={navStyle.nav_wrapper}>
          <li>
            <NavLink className={navStyle.active} to="/community">&#9829;</NavLink>
            <NavLink className={navStyle.active} to="/community">홈</NavLink>
          </li>
          <li>
            <NavLink className={navStyle.active}>&#9829;</NavLink>
            <NavLink className={navStyle.active}>내 게시글</NavLink>
          </li>
          <li>
            <NavLink className={navStyle.active} to="/create">&#9829;</NavLink>
            <NavLink className={navStyle.active} to="/create">게시글 등록</NavLink>
          </li>
          <li>
            <NavLink className={navStyle.active}>&#9829;</NavLink>
            <NavLink className={navStyle.active}>검색</NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default CommunityNav;
