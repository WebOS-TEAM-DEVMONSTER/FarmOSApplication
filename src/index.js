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


// /* global ENACT_PACK_ISOMORPHIC */
// import {createRoot, hydrateRoot} from 'react-dom/client';

// import App from './App';
// import reportWebVitals from './reportWebVitals';


// import './index.css';
// import Community from './App/pages/Community';

// const appElement = (<App />);

// // In a browser environment, render instead of exporting
// if (typeof window !== 'undefined') {
// 	if (ENACT_PACK_ISOMORPHIC) {
// 		hydrateRoot(document.getElementById('root'), appElement);
// 	} else {
// 		createRoot(document.getElementById('root')).render(appElement);
// 	}
// }

// export default appElement;

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint.
// // Learn more: https://github.com/enactjs/cli/blob/master/docs/measuring-performance.md
// reportWebVitals();