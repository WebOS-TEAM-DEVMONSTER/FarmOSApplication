import CardCss from "../css/Card.module.less";

function Card(props) {
  return(
    <div className={CardCss.item}>
      <div className={CardCss.header} >
        <div className={CardCss.profile} onClick = {() => {props.userDetailPage();}} />
        <div className={CardCss.name}> {props.product.name}</div>
      </div>  
      <div onClick = {() => {props.handleClick();}}>
        <img className={CardCss.image} src={process.env.PUBLIC_URL +'/vegetable.jpg'} />
        <div className={CardCss.info}>
          <ul>
            <li><h1 className={CardCss.product_name}>{props.product.title}</h1></li>
            <li><p className={CardCss.product_price}>{props.product.price}</p></li>
            <li><p className={CardCss.product_detail}>{props.product.content}</p></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Card;