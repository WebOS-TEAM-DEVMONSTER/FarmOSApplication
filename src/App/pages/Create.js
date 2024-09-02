import Nav from "./components/CommunityNav";
import "react";
import createCss from "./css/Create.module.less";
import "react-router-dom";

function Create (props) {
  
  return(
    <>
      <Nav />
      <form style={{display :"flex", justifyContent : "center" } }
        onSubmit={event => {
          const title = event.target.title.value;
          const price = event.target.price.value;
          const content = event.target.content.value;
          props.onCreate(title,price,content);
        }}
      >
        <div className={createCss.container}>
          <h1>게시글 작성하기</h1>
          <input className={createCss.title} name="title" placeholder="제목"/>
          <input className={createCss.price} name="price" placeholder="가격"/>
          <textarea className={createCss.content} name="content" placeholder="내용"/>
          
          <section>
            <button>게시글 등록</button>
          </section>
        </div>
      </form>
    </>
  )
}

export default Create;