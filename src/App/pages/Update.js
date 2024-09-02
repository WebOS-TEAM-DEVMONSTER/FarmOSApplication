import Nav from "./components/CommunityNav";
import updateCss from "./css/Update.module.less";
import "react-router-dom";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";


function Update (props) { 
  const {id} = useParams();
  const productId = Number(id);
  const [title,setTitle] = useState(props.products[productId].title);
  const [price,setPrice] = useState(props.products[productId].price);
  const [content,setContent] = useState(props.products[productId].content)
  
  return(
    <>
      <Nav />
      <form style={{display :"flex", justifyContent : "center"}} 
      onSubmit={()=>{
        props.onUpdate(title,price,content,productId);   
      }}
      >
        <div className={updateCss.container}>
          <h1>게시글 수정하기</h1>
          <input className={updateCss.title} name="title" value={title}  placeholder="제목"
            onChange={event => setTitle(event.target.value)}
          />
          <input className={updateCss.price} name="price" value={price} placeholder="가격"
            onChange={event => setPrice(event.target.value)}
          />
          <textarea className={updateCss.content} name="content"  value ={content} placeholder="내용"
            onChange={event => setContent(event.target.value)}
          />
          
          <section>
            <button >게시글 수정</button>
          </section>
        </div>
      </form>
    </>
  )
}

export default Update;