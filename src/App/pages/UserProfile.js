import Nav from './components/CommunityNav';
import UserDetail from './components/UserDetail';
import UserProfileCss from './css/UserProfile.module.less';
import { useNavigate,useParams } from 'react-router-dom';
import Card from './components/Card';

function UserProfile(props) {
  const navigate = useNavigate();
  let {id} = useParams();
  const productId = Number(id);
  const user = props.products.filter((product) =>{
      return product.name === props.products[productId].name;
    }
  )
  console.log(user);
  return (
    <>
      <Nav />
      <div style={{ display: "flex", justifyContent: "center"}}>
        <UserDetail id={productId} products={props.products} onUpScore={props.onUpScore} showButtons = {true} showCss={true}/>
      </div>
      <section>
        <div className={UserProfileCss.wrapper}>
          {
            user.map((product, index) =>{
            return(
              <Card product = {product} index = {index}
              handleClick ={() => navigate(`/detail/${product.id}`)}
              /> 
            )})
          }
        </div>
      </section>
    </>
  )
}

export default UserProfile;