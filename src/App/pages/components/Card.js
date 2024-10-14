import CardCss from "../css/Card.module.less";

function Card({ product, userDetailPage, handleClick }) {
  const { title, price, content, farm, saleStatus, user } = product;

  return (
    <div className={CardCss.item}>
      <div className={CardCss.header}>
        {/* 유저 프로필 클릭 시 상세 페이지로 이동 */}
        <div
          className={CardCss.profile}
          onClick={() => {
            userDetailPage && userDetailPage();
          }}
        />
        {/* 유저 이름 표시 */}
        <div className={CardCss.name}>
          {user ? user.username : 'Unknown User'}
        </div>
      </div>
      <div onClick={handleClick}> {/* 카드 클릭 시 상세 페이지로 이동 */}
        <img
          className={CardCss.image}
          src={process.env.PUBLIC_URL + '/vegetable.jpg'} // 이미지 없을 경우 기본 이미지 사용
          alt="Product"
        />
        <div className={CardCss.info}>
          <ul>
            <li>
              <h1 className={CardCss.product_name}>{title}</h1> {/* 제품 제목 */}
            </li>
            <li>
              <p className={CardCss.product_price}>{price.toLocaleString()} 원</p> {/* 가격 */}
            </li>
            <li>
              <p className={CardCss.product_detail}>{content}</p> {/* 제품 설명 */}
            </li>
            <li>
              <p className={CardCss.product_farm}>농장: {farm ? farm.farmName : 'Unknown Farm'}</p> {/* 농장 이름 */}
            </li>
            <li>
              {/* 판매 상태에 따라 다르게 표시 */}
              <p className={CardCss.product_status}>상태: {saleStatus === 'ON_SALE' ? 'ON_SALE' : 'NOT_SALE'}</p> {/* 판매 상태 */}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Card;
