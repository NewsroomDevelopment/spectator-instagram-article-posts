import React, { useState, useEffect, useCallback } from 'react';
import Gallery from "react-photo-gallery";
import Tabletop from "tabletop";
import styled from 'styled-components';
import './App.css';


const Container = styled.div`
  width: 65%;
  margin: auto;
  @media (max-width: 800px) {
      width:90%;
  }
`;

const Title = styled.h1`
  padding-top: 2.5%;
  padding-bottom: 2.5%; 
  @media (max-width: 800px) {
    text-align:center;
    font-size:14px;
  }
`;

const Credits = styled.div`
  text-align: center;
  padding: 3%;
  @media (max-width: 800px) {
    font-size:12px;
  }
`;

function App() {

  const [data, setData] = useState([]);

  useEffect(() => {
    Tabletop.init({
      key: "17ZLB9Kbu4O9IF4g464NayCzDur4gv9jPlwQDIqEIwgo",
      simpleSheet: true
    })
      .then((data) => {
        data = data.map(i => {
          i["width"] = 1;
          i["height"] = 1;
          return i;
        })
        setData(data.reverse())
      })
      .catch((err) => console.warn(err));
  }, []);

  const openPhoto = useCallback((event, { photo }) => {
    window.open(photo.link, "_blank")
  }, []);

  return (
    <div>
      <Container>
        <Title> Spectator's Instagram Articles List </Title>
        {data.length > 0 && <Gallery photos={data} onClick={openPhoto} direction={"column"} columns={3} />}
      </Container>

      <Credits>
        Made with &hearts; by Spectator's Newsroom Development Team
      </Credits>
    </div>
  );
}

export default App;
