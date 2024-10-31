import Nav from "./components/CommunityNav";
import createCss from "./css/Create.module.less";
import axios from "axios";
import { useState, useEffect } from "react";
import { Scroller } from '@enact/moonstone/Scroller';
import { useNavigate } from "react-router-dom";

function Create(props) {
  const [farms, setFarms] = useState([]);
  const [selectedFarmId, setSelectedFarmId] = useState("");
  const accessToken = window.localStorage.getItem('accessToken');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFarms = async () => {
      try {
        console.log('Access Token:', accessToken);
        const response = await axios.get("http://52.63.12.126/api/v1/farms/my", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log('Farms data:', response.data);
        setFarms(response.data);
      } catch (error) {
        console.error("Failed to fetch farms", error);
        if (error.response && error.response.status === 403) {
          console.error('403 Forbidden: 인증 또는 권한 문제');
        }
      }
    };

    fetchFarms();
  }, [accessToken]);

  const handleFarmChange = (e) => {
    setSelectedFarmId(e.target.value);
  };

  return (
    <div className={createCss.container}>
      <div className={createCss.navWrapper}>
        <Nav />
      </div>

      <Scroller className={createCss.scroller} verticalScrollbar="visible">
        <form
          style={{ display: "flex", justifyContent: "center" }}
          onSubmit={async (event) => {
            event.preventDefault();
            const title = event.target.title.value;
            const price = event.target.price.value;
            const content = event.target.content.value;
            const farmId = selectedFarmId;

            const postData = {
              title: title,
              price: price,
              content: content,
              farmId: farmId,
            };

            let header = {
              accept: 'application/hal+json',
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            };

            try {
              const response = await axios.post('http://52.63.12.126/api/v1/posts', postData, {
                headers: header,
              });
              console.log('Post created successfully:', response.data);
              navigate('/community');
            } catch (error) {
              console.error('There was an error creating the post!', error);
            }
          }}
        >
          <div className={createCss.formContent}>
            <h1>게시글 작성하기</h1>
            <input className={createCss.title} name="title" placeholder="제목" />
            <input className={createCss.price} name="price" placeholder="가격" />
            <textarea className={createCss.content} name="content" placeholder="내용" />

            <div>
              <label htmlFor="farm-select">농장을 선택하세요:</label>
              <select
                id="farm-select"
                onChange={handleFarmChange}
                value={selectedFarmId}
              >
                <option value="" disabled>
                  농장 선택
                </option>
                {farms.map((farm) => (
                  <option key={farm.id} value={farm.id}>
                    {farm.farmName}
                  </option>
                ))}
              </select>
            </div>
            <section>
              <button>게시글 등록</button>
            </section>
          </div>
        </form>
      </Scroller>
    </div>
  );
}

export default Create;
