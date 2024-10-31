import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../css/Maincard.module.less';
const Maincard = ({ farm }) => {
  const navigate = useNavigate();

  return (
    <div
      className={styles.maincard}
      onClick={() => navigate(`/home/${farm.id}`)}
    >
      <div className={styles['farm-name']}>
        {farm.farmName} 스마트팜
      </div>
    </div>
  );
};

export default Maincard;
