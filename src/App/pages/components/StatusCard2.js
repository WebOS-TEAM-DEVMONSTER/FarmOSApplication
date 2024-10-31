import React from 'react';
import styles from '../css/Statuscard2.module.less'; // CSS 모듈 import

const StatusCard2 = ({ buttontext,makestate, makenum, nowstate, nownum, title, warning }) => {
  return (
    <div className={styles.card}>
      {/* 가로로 중앙 정렬 */}
      <div className={styles.container}>
        
        {/* 왼쪽 영역 */}
        <div className={styles['left-section']}>
          {/* 화살표 위 */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
          <div className={styles['button-text']}>{buttontext}</div> {/* 온도 조절 */}
          {/* 화살표 아래 */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {/* 가운데 영역 */}
        <div className={styles['center-section']}>
          <div className={styles.state}>{nowstate}</div> {/* 현재 상태 */}
          <div className={styles.number}>{nownum}</div> {/* 숫자 표시 */}
          <div className={styles.state}>{makestate}</div> {/* 바꾸는 상태 */}
          <div className={styles.number}>{makenum}</div> {/* 바꾸는 숫자 표시 */}
        </div>

        {/* 오른쪽 영역 */}
        <div className={styles['right-section']}>
          <div className={styles.title}>{title}</div> {/* 제목 */}
          <div className={styles.warning}>
            <input type="checkbox" checked />
            <div>{warning}</div> {/* 경고 메시지 */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusCard2;
