import CardCss from "../css/Card.module.less";

function Card(props) {
  return(
    <div className={CardCss.item} onClick = {() => {props.handleClick();}}>
      <div className={CardCss.header}>
        <div className={CardCss.profile} />
        <div className={CardCss.name}> {props.product.name}</div>
      </div>  
      <img className={CardCss.image} src={process.env.PUBLIC_URL +'/vegetable.jpg'} />
      <div className={CardCss.info}>
        <ul>
          <li><h1 className={CardCss.product_name}>{props.product.title}</h1></li>
          <li><p className={CardCss.product_price}>{props.product.price}</p></li>
          <li><p className={CardCss.product_detail}>{props.product.content}</p></li>
        </ul>
        
      </div>
    </div>
  )
}

export default Card;