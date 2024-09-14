import TapCss from "../css/Tap.module.less";

function Tap() {
  return (
    <div className={TapCss.tap_container}>
      <ul>
        <li>수정하기</li>
        <li>삭제하기</li>
      </ul>
    </div>
  );
}

export default Tap;
