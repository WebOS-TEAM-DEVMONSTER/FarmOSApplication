import { useParams,useNavigate,Link } from "react-router-dom";
import Nav from './components/CommunityNav';
import DetailCss from './css/Detail.module.less';
import { useState } from "react";
import Tap from './components/Tap';

function Detail(props) {
  let {id} = useParams();
  const [comment,setComment] = useState(null);
  const [showTap, setShowTap] = useState(null);
  const handleComment = function (e) {
    setComment(e.target.value);
    console.log(comment)
  }
  const toggleTap = () => {
    setShowTap(!showTap);
  }

  let navigate = useNavigate();
  return(
    <>
      <Nav />
      <div style={{ display: "flex", justifyContent: "center"}}>
        <div className={DetailCss.detail_container}>
          <div className={DetailCss.detail_wrapper}>
            <div className={DetailCss.detail_header}>
              <div className={DetailCss.profile} />
              <h1>{props.products[id].name}</h1>
              <span>
                <button onClick={toggleTap}>&#8942;</button>
                {showTap && <Tap />}
              </span>
            </div>
           
              <div className={DetailCss.detail_img}>
                <img src={process.env.PUBLIC_URL +'/vegetable.jpg'}></img>
              </div>
              <div className={DetailCss.detail_title}>
                <h1>{props.products[id].title}</h1>
              </div>
              <div className={DetailCss.detail_price} >
                <p>{props.products[id].price}원</p>
              </div>
              <div className={DetailCss.detail_info}>
                <p>{props.products[id].content}</p>
              </div>
            
          </div>
          <form>
            <div className={DetailCss.inputBox}>
              <input className ={DetailCss.detail_comment}  onChange={handleComment} value={comment} placeholder="댓글입력"/>
              <button>댓글 등록</button>
            </div>
          </form>
          <p style={{margin:"50px 0 0 0"}}>댓글</p>
          <hr style={{margin:"10px 0 0 0"}} />
        </div>
      </div>
      
    </>
  )
}

export default Detail;