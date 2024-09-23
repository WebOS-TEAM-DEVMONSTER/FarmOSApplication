import Nav from './components/CommunityNav';
import communityCss from './css/Community.module.less';
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
      <form className = {communityCss.header}>
        <div className={communityCss.searchWrapper}>
          <input className={communityCss.searchBar}/>
          <button>A</button>
        </div>
     
      </form>
      <section>
        <div className={communityCss.wrapper}>
          {
            props.products.map((product, index) =>{
            return(
              <Card product = {product} index = {index}
              userDetailPage ={() => navigate(`/userDetail/${product.id}`)}
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