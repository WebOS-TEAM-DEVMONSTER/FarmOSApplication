import React from 'react';
import styles from '../css/Statuscard.module.less'; // CSS 모듈 import

const StatusCard = ({ title, subtitle, content, warning }) => {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>{title}</h2>
      <h3 className={styles.subtitle}>{subtitle}</h3>
      <p className={styles.content}>{content}</p>
      {warning && <p className={styles.warning}>{warning}</p>}
    </div>
  );
};

export default StatusCard;
