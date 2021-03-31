import React, { useState, useEffect, useCallback } from 'react';
import Gallery from "react-photo-gallery";
import Tabletop from "tabletop";
import logo from './logo.svg'
import './App.css';

function App() {

  const [data, setData] = useState([]);
  console.log(data)
  useEffect(() => {
    Tabletop.init({
      key: "17ZLB9Kbu4O9IF4g464NayCzDur4gv9jPlwQDIqEIwgo",
      simpleSheet: true
    })
      .then((data) => setData(data))
      .catch((err) => console.warn(err));
  }, []);

  const openPhoto = useCallback((event, { photo }) => {
    window.open(photo.link, "_blank")
  }, []);
  
  return (
    <div style={{width:"60%", margin: "auto"}}>
      <Gallery photos={data} onClick={openPhoto} />
      </div>
  );
}

export default App;
