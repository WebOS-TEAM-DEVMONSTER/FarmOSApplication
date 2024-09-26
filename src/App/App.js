import {useState} from 'react';
import {BrowserRouter, Routes, Route, useNavigate} from 'react-router-dom';
import Community from "./pages/Community";
import Detail from "./pages/Detail";
import data from "../data";
import Login from "./pages/Login";
import Farmsystem from "./pages/Farmsystem";
import Home from './pages/Home';
import Signup from './pages/Signup';
import Create from './pages/Create';
import Update from './pages/Update'
import UserProfile from './pages/UserProfile';
import MyDetail from './pages/MyDetail';
import Chatting from './pages/Chatting';
import React from 'react';

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
        const updatedProduct = {id:_id, name: products[_id].name , title:_title, price:_price, content:_content}
        for(let i = 0; i < newProducts.length;i++){
            if(newProducts[i].id === _id){
                newProducts[i] = updatedProduct;
                break;
            }
        }
        setProducts(newProducts);
        navigate(`/detail/${_id}`);
    }

    const onUpScore = (_id)=> {
        const newProducts = [...products];
        for(let i = 0; i < newProducts.length; i++) {
            if(newProducts[i].id === _id){
                newProducts[i].score += 1;
                break;
            }
        }
        setProducts(newProducts);
    }

    return (
        <div>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/" element={<Home />} />
                <Route path="/community" element={<Community products={products} />} />
                <Route path="/detail/:id" element={<Detail products={products} />} />
                <Route path="/create" element={<Create onCreate={handleCreate} />} />
                <Route path="/update/:id" element={<Update onUpdate={onUpdate} products = {products}/>} />
                <Route path="/userDetail/:id"  element={<UserProfile products={products} onUpScore={onUpScore}/>} />
                <Route path="/myDetail" element={<MyDetail products = {products}/>} />
                <Route path="/chatting" element={<Chatting />} />
                <Route path="/farmsystem" element={<Farmsystem />} />
            </Routes>
        </div>
    );
}

function Root() {
    return (
        <BrowserRouter>
            <App />
        </BrowserRouter>
    );
}

export default Root;
