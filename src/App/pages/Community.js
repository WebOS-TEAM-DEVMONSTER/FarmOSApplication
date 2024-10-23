import Nav from './components/CommunityNav';
import communityCss from './css/Community.module.less';
import Card from './components/Card';
import { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { GlobalContext } from '../../global_provider';

function Community() {
  const [products, setProducts] = useState([]); // 서버에서 받아온 데이터를 저장하는 상태
  const [loading, setLoading] = useState(true); // 로딩 상태 관리
  const { accessToken } = useContext(GlobalContext); // GlobalContext에서 accessToken 가져오기
  //const accessToken = Cookies.get('accessToken'); // 쿠키에서 accessToken 가져오기
  
  let navigate = useNavigate();

  // 서버에서 데이터 불러오기
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          'http://52.63.12.126/api/v1/posts',
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              accept: 'application/hal+json',
            },
            params: {
              page: 0,
              size: 10,
              key: 'CREATED_AT',
              direction: 'ASC',
              viewFilter: 'VIEW_ON_SALE', // on sale 상태의 상품만 가져오기
            }
          }
        );
        console.log('Posts data:', response.data); // 받아온 데이터 확인
        setProducts(response.data); // 데이터를 상태로 저장
        setLoading(false); // 데이터가 로드된 후 로딩 상태를 해제
      } catch (error) {
        console.error('Failed to fetch posts', error);
        setLoading(false); // 에러 발생 시 로딩 상태 해제
      }
    };

    fetchPosts();
  }, [accessToken]);

  // 서버에서 상품 상태를 업데이트하는 함수
  const updateProductStatus = async (productId, newStatus) => {
    try {
      const response = await axios.put(
        `http://52.63.12.126/api/v1/posts/${productId}/status`,
        { status: newStatus },
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'accept': 'application/hal+json',
          }
        }
      );

      console.log('상태 업데이트 성공:', response.data);

      // 서버에서 상태가 변경된 후, 클라이언트 측 상태도 업데이트
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === productId ? { ...product, saleStatus: newStatus } : product
        )
      );
    } catch (error) {
      console.error('상태 업데이트 실패:', error.response ? error.response.data : error.message);
    }
  };

  if (loading) {
    return <p>Loading posts...</p>; // 로딩 중일 때 표시
  }

  return (
    <div>
      <Nav />
      <form className={communityCss.header}>
        <div className={communityCss.searchWrapper}>
          <input className={communityCss.searchBar} />
          <button>A</button>
        </div>
      </form>
      <section>
        <div className={communityCss.wrapper}>
          {
            products.length > 0 ? (
              products.map((product, index) => {
                return (
                  <Card
                    key={product.id}
                    product={product}
                    index={index}
                    userDetailPage={() => navigate(`/userDetail/${product.user.id}`)}
                    handleClick={() => {
                      // 상품 상세 페이지로 이동
                      navigate(`/detail/${product.id}`);

                      // 상태를 ON_SALE -> NOT_SALE로 변경하는 서버 요청
                      updateProductStatus(product.id, 'NOT_SALE');
                    }}
                  />
                );
              })
            ) : (
              <p>No posts available.</p> // 게시글이 없을 때 표시
            )
          }
        </div>
      </section>
    </div>
  );
}

export default Community;
