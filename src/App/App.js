import {useState} from 'react';
import {BrowserRouter, Routes, Route, useNavigate} from 'react-router-dom';
import Community from "./pages/Community";
import Detail from "./pages/Detail";
import data from "../data";
import Login from "./pages/Login";
import Home from './pages/Home';
import Signup from './pages/Signup';
import Create from './pages/Create';

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

    return (
        <div>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/home" element={<Home />} />
                <Route path="/community" element={<Community products={products} />} />
                <Route path="/detail/:id" element={<Detail products={products} />} />
                <Route path="/create" element={<Create onCreate={handleCreate} />} />
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
