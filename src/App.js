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

const Title = styled.p`
  text-align:center;
  color:#666;
  font-size:1em;
  @media (max-width: 800px) {
    font-size:12px;
  }
`;

const Credits = styled.div`
  text-align: center;
  padding: 3%;
  @media (max-width: 800px) {
    font-size:12px;
  }
`;

const Logo = styled.img`  
  height:5vw;
  width:5vw;
  border-radius:50%;
  z-index:1;
  @media (max-width: 800px) {
    height:5vh;
    width:5vh;
  }
`;

const Intro = styled.div`
  padding-top:1%;
  display:flex;
  align-items:center;
  justify-content:center;
  :before {
    z-index:0;
    content: '';
    position: absolute;
    left: 0;
    border-top: 1px solid #e9e9e9;
    width: 100%;
    transform: translateY(-50%);
  }
  @media (max-width: 800px) {
    background-image: linear-gradient(to bottom, white 50%, #f5f5f5 50%);
  }
`;

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}


function App() {

  const [data, setData] = useState([]);
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

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
      <Intro>
        <a target="_blank" href="https://www.columbiaspectator.com/"><Logo src="https://cloudfront-us-east-1.images.arcpublishing.com/spectator/3PTKAMPG6JGXPEYC6L63DZY7MI.png" /></a>
      </Intro>
      <Container>
        <Title> Tap Post for Article </Title>
        {data.length > 0 && <Gallery photos={data} onClick={openPhoto} direction={"column"} columns={windowDimensions.width > 800 ? 3 : 2} />}
      </Container>

      <Credits>
        Made with &hearts; by Spectator's Newsroom Development Team
      </Credits>
    </div>
  );
}

export default App;
