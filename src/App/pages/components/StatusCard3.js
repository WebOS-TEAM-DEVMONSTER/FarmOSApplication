import React, { useContext } from 'react';

import styles from '../css/Statuscard3.module.less'; // CSS 모듈 import
import { GlobalContext } from '../../../global_provider'; // GlobalContext 가져오기

const StatusCard3 = ({  warning }) => {
  const {ecOfSoil,setEcOfSoil, phOfSoil,setPhOfSoil,moistureOfSoil,setMoistureOfSoil, } = useContext(GlobalContext); // 전역 변수 사용 예시

  return (
    <div className={styles.card}>
      {/* 제목 */}
      <div className={styles.title}>토양상태</div>

      {/* 상태 정보들을 담은 영역 */}
      <div className={styles.content}>
        {/* 왼쪽 상태 정보 */}
        <div className={styles.info}>
          <ul>
            <li>토양 수분 : {moistureOfSoil}%</li>
            <li>PH농도 : {phOfSoil}</li>
            <li>전기 전도도 : {ecOfSoil}%</li>
          </ul>
        </div>

        {/* 오른쪽 상태 메시지 */}
        <div className={styles.warning}>
          <input type="checkbox" checked />
          <div>{warning}</div> {/* 경고 메시지 */}
        </div>
      </div>
    </div>
  );
};

export default StatusCard3;
