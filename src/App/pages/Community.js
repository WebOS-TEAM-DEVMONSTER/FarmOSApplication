import Nav from './components/CommunityNav';
import communityCss from './css/Community.module.css';
import Card from './components/Card';
import data from "../../data.js";
import { useState } from "react";
import "react";
import { Routes, useNavigate, Route } from 'react-router-dom';
import Detail from "./Detail.js";

function Community(props) {
  let navigate = useNavigate();
  return(
    <div>
      <Nav />
      <section>
        <div className={communityCss.wrapper}>
          {
            props.products.map((product, index) =>{
            return(
              <Card product = {product} index = {index}
              handleClick ={() => navigate(`/detail/${product.id}`)}
              /> 
            )})
          }
        </div>
      </section>
     
    </div>
  )
}

export default Community;