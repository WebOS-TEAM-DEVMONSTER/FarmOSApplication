import Nav from './components/CommunityNav';
import UserDetail from './components/UserDetail';
import UserProfileCss from './css/UserProfile.module.less';
import { useNavigate } from 'react-router-dom';
import Card from './components/Card';

function UserProfile(props) {
  const navigate = useNavigate();
  return (
    <>
      <Nav />
      <div style={{ display: "flex", justifyContent: "center"}}>
        <UserDetail />
      </div>
      <section>
        <div className={UserProfileCss.wrapper}>
          {
            props.products.map((product, index) =>{
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