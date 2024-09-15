import Nav from './components/CommunityNav';
import Card from './components/Card';
import UserDetail from './components/UserDetail';
import { useNavigate } from 'react-router-dom';
import UserProfileCss from './css/UserProfile.module.less';


function MyDetail(props) {
  let navigate = useNavigate();
  const myProducts = props.products.filter((product) => product.nickname === "kimgguggury")
  return(
    <div>
      <Nav />
      <div style={{ display: "flex", justifyContent: "center", margin: "0 0 0 600px"}}>
        <UserDetail id = {myProducts[0].id} products={props.products} onUpScore={props.onUpScore} showButtons={false} showCss={false}/>
      </div>
      <section>
        <div className={UserProfileCss.wrapper}>
          {
            myProducts.map((product, index) =>{
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

export default MyDetail;