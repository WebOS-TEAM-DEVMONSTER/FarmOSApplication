import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Nav from './components/CommunityNav';
import styles from './css/Home.module.less'; // CSS 모듈 import

function Test() {
 

  return (
    <div className={styles.container}>
      <h>hello!</h>
    </div>
  );
}

export default Test;
