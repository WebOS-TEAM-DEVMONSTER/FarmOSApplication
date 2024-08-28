import CardCss from "../css/Card.module.css";
import data from "../../../data.js"
function Card(props) {
  return(
    <div className={CardCss.item} onClick = {() => {props.handleClick();}}>
      <div className={CardCss.header}>
        <div className={CardCss.profile} />
        <div className={CardCss.name}> {props.product.name}</div>
      </div>  
      <img className={CardCss.image} src={process.env.PUBLIC_URL +'/vegetable.jpg'} />
      <div className={CardCss.info}>
        <h1 className={CardCss.product_name}>{props.product.title}</h1>
        <p className={CardCss.product_price}>{props.product.price}</p>
        <p className={CardCss.product_detail}>{props.product.content}</p>
      </div>
    </div>
  )
}

export default Card;