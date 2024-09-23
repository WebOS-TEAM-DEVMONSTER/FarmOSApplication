//setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api/v1', {
      target: 'http://52.63.12.126',
      changeOrigin: true,
    }),
  );
  
//     app.use(
//     createProxyMiddleware('/경로2', {
//       target: '원하는 주소',
//       changeOrigin: true,
//     }),
//   );

  
  
};
