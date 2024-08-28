/* global ENACT_PACK_ISOMORPHIC */
import {createRoot, hydrateRoot} from 'react-dom/client';

import {useState, useEffect} from 'react-hooks';
import { Routes,Route,Link, useNavigate, BrowserRouter } from 'react-router-dom';

import App from './App';
import reportWebVitals from './reportWebVitals';


import Detail from "./App/pages/Detail"
import data from "./data"
import Login from "./App/pages/Login";
import Home from './App/pages/Home';
import Signup from './App/pages/Signup';
import Create from './App/pages/Create';

import './index.css';

function AppElement() {
	const [products,setProducts] = useState(data);
	const [nextId, setNextId] = useState(7);
	let navigate = useNavigate();
	return (
		<>
			<div> 
			<BrowserRouter>
				<Routes>
					<Route path="/" element ={<Login />} />
					<Route path="/signup" element = {<Signup/>} />
					<Route path="/home" element = {<Home />} />
					<Route path="/community" element= {<Community products = {products}/>} />
					<Route path="/detail/:id" element={<Detail  products = {products} />} />
					<Route path="/create" element={<Create onCreate={(_title, _price, _content) => {
						const newProducts =  [...products];
						newProducts.push({id: nextId, title:_title, price: _price, content: _content});
						setProducts(newProducts);
						navigate(`/detail/${nextId}`)
						setNextId(nextId+1);
					
						}}/>} />
					</Routes>
				</BrowserRouter>     
			</div>
			<div>
				<App/>
			</div>
		</>
		
		
		
	);
} 

	


// In a browser environment, render instead of exporting
if (typeof window !== 'undefined') {
	if (ENACT_PACK_ISOMORPHIC) {
		hydrateRoot(document.getElementById('root'), AppElement);
	} else {
		createRoot(document.getElementById('root')).render(AppElement);
	}
}

export default AppElement;

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint.
// Learn more: https://github.com/enactjs/cli/blob/master/docs/measuring-performance.md
reportWebVitals();
