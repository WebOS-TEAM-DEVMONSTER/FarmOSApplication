import React from 'react';
import ReactDOM from 'react-dom/client'; // createRoot 사용
import { HashRouter } from 'react-router-dom';
import App from './App'; // App 컴포넌트 임포트

// 기존 ReactDOM.render 대신 createRoot 사용
const container = document.getElementById('root'); // root 요소 찾기
const root = ReactDOM.createRoot(container); // createRoot로 렌더링 초기화

root.render(
	<HashRouter>
      <App />
  </HashRouter>
);
