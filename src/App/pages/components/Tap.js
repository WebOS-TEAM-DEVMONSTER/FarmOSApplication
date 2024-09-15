import TapCss from "../css/Tap.module.less";
import { useNavigate, useParams } from "react-router-dom";

function Tap() {
  const navigate = useNavigate();
  const {id} = useParams();
  return (
    <div className={TapCss.tap_container}>
      <ul>
        <li onClick={ () => {navigate(`/update/${id}`)}}>수정하기</li>
        <li>삭제하기</li>
      </ul>
    </div>
  );
}

export default Tap;
