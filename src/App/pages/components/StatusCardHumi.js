import React, { useContext } from 'react';
import { GlobalContext } from '../../../global_provider'; // GlobalContext 가져오기
import styles from '../css/Statuscard2.module.less';

const StatusCardHumi = ({ buttontext, makestate, makenum, nowstate, nownum, title, warning }) => {
  const { humidity, setHumidity } = useContext(GlobalContext); // 전역 변수 사용 예시

  return (
    <div className={styles.card}>
      {/* 가로로 중앙 정렬 */}
      <div className={styles.container}>
        {/* 왼쪽 영역 */}
        <div className={styles['left-section']}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
          <div className={styles['button-text']}>{buttontext}</div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {/* 가운데 영역 */}
        <div className={styles['center-section']}>
          <div className={styles.state}>{nowstate}</div>
          <div className={styles.number}>{humidity}</div> {/* 전역 상태 값 표시 */}
          <div className={styles.state}>{makestate}</div>
          <div className={styles.number}>{makenum}</div>
        </div>

        {/* 오른쪽 영역 */}
        <div className={styles['right-section']}>
          <div className={styles.title}>{title}</div>
          <div className={styles.warning}>
            <input type="checkbox" checked />
            <div>{warning}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusCardHumi;
