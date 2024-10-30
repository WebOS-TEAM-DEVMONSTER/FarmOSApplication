import { useState } from 'react';
import { HashRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Community from './pages/Community';
import Detail from './pages/Detail';
import data from '../data';
import Login from './pages/Login';
import Farmsystem from './pages/Farmsystem';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Create from './pages/Create';
import Update from './pages/Update';
import UserProfile from './pages/UserProfile';
import MyDetail from './pages/MyDetail';
import Chatting from './pages/Chatting';
import Mainhome from './pages/Mainhome';
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // 다음 렌더링에서 폴백 UI를 표시하도록 상태를 업데이트합니다.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // 오류 정보와 에러를 로그로 출력합니다.
    console.error('Uncaught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // 에러가 발생했을 때 보여줄 폴백 UI
      return <h1>Something went wrong. Please try again later.</h1>;
    }

    // 정상일 경우 자식 컴포넌트를 렌더링합니다.
    return this.props.children;
  }
}

function App() {
  const [products, setProducts] = useState(data);
  const [nextId, setNextId] = useState(7);
  const navigate = useNavigate();

  const handleCreate = (_title, _price, _content) => {
    const newProducts = [...products];
    newProducts.push({ id: nextId, title: _title, price: _price, content: _content });
    setProducts(newProducts);
    navigate(`/detail/${nextId}`);
    setNextId(nextId + 1);
  };

  const onUpdate = (_title, _price, _content, _id) => {
    const newProducts = [...products];
    const updatedProduct = { id: _id, name: products[_id].name, title: _title, price: _price, content: _content };
    for (let i = 0; i < newProducts.length; i++) {
      if (newProducts[i].id === _id) {
        newProducts[i] = updatedProduct;
        break;
      }
    }
    setProducts(newProducts);
    navigate(`/detail/${_id}`);
  };

  const onUpScore = (_id) => {
    const newProducts = [...products];
    for (let i = 0; i < newProducts.length; i++) {
      if (newProducts[i].id === _id) {
        newProducts[i].score += 1;
        break;
      }
    }
    setProducts(newProducts);
  };

  const onFarm = (_id) => {
    navigate(`/home/${_id}`);
  };

  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/test" element={<Test />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home/:id" element={<Home />} />
        <Route path="/community" element={<Community products={products} />} />
        <Route path="/detail/:id" element={<Detail products={products} />} />
        <Route path="/create" element={<Create onCreate={handleCreate} />} />
        <Route path="/update/:id" element={<Update onUpdate={onUpdate} products={products} />} />
        <Route path="/userDetail/:id" element={<UserProfile products={products} onUpScore={onUpScore} />} />
        <Route path="/myDetail" element={<MyDetail products={products} />} />
        <Route path="/chatting" element={<Chatting />} />
        <Route path="/farmsystem/:id" element={<Farmsystem />} />
        <Route path="/mainhome" element={<Mainhome onCreate={onFarm} />} />
        <Route path="*" element={<h1>404 - 페이지를 찾을 수 없습니다.</h1>} />
      </Routes>
    </div>
  );
}

//수정한 부분
// INDEX.JS 에서 APP.JS 를 인식하도록 EXCUTE를 APP.JS로 수정

// function Root() {
//   return (
//     <HashRouter>
//         <App />
//     </HashRouter>
//   );
// }

export default App;
