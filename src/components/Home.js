import React from 'react';
import { getFirestore, collection, doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import Char from './Char';
import {mdata,fetchData} from './utils'
import { async } from '@firebase/util';

function Home(props) {
  const [dataA, setDataA] = useState(mdata);
  const [dataB, setDataB] = useState(mdata);

  const formatString = (str) => {
    const words = str.toLowerCase().split(' ');
    const formattedWords = words.map(word => {
      const alphanumeric = word.replace(/[^0-9a-zA-Z]/g, '');
      const firstChar = alphanumeric.charAt(0).toUpperCase();
      const rest = alphanumeric.slice(1);
      return `${firstChar}${rest}`;
    });
    const formattedString = formattedWords.join('_');
    const trimmedString = formattedString.replace(/[\s_]+$/, '');
    return trimmedString;
  };

  const [a, setA] = useState("");
  const [b, setB] = useState("");

  const handleFight = (e) => {
    e.preventDefault();
    let standLevelShouldNotBeEmpty = !(dataA.stand_level === "" || dataB.stand_level === "");
    if (dataA.stand_level > dataB.stand_level && standLevelShouldNotBeEmpty) {
      setA('bg-success');
      console.log('A is' + a);
    }
    else if (dataA.stand_level < dataB.stand_level && standLevelShouldNotBeEmpty) {
      setB('bg-success');
      console.log('B is' + b);
    }
    else if (dataA.stand_level === dataB.stand_level && standLevelShouldNotBeEmpty) {
      setA('bg-success');
      setB('bg-success');
      console.log('both is red');
    }
  }

  const handleCharA = async(e) => {
    e.preventDefault();
    setA('bg-white');
    setB('bg-white');
    const charA = document.getElementById('charA').value;
    const result = await fetchData(charA);
    setDataA(result);
  };

  const handleCharB = async (e) => {
    e.preventDefault();
    setA('bg-white');
    setB('bg-white');
    const charB = document.getElementById('charB').value;
    const result = await fetchData(charB);
    setDataA(result);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    event.target.reset();
    document.activeElement.blur();
  };



  useEffect(() => {
    console.log("dataA: ", dataA);
    console.log("dataB: ", dataB);
  }, [dataA, dataB]);
  return (<>
    <div className="container my-3" >
      <div className="row" >
        <div className={`col-md-5 `}  >
          <div className={`container mb-3 ${dataA === mdata ? "" : "shadow"} p-3  rounded ${a}`} id="A">
            <form className="d-flex mb-3" onSubmit={handleSubmit}>
              <input className="form-control me-2" id="charA" onChange={handleCharA} type="search" placeholder="Type One Piece character's only" aria-label="Search" />
            </form>
            <Char imgurl={dataA.imgurl} character_name={dataA.character_name} feats={dataA.feats} description={dataA.description} anime_name={dataA.anime_name} powers={dataA.powers} textColor={a === 'bg-success' ? "text-white" : "text-blue"} />
          </div>
        </div>
        <div className="col-md-2 mb-3 d-flex align-items-center flex-column justify-content-center">
          <button className="btn bg-transparent" onClick={handleFight}>
            <img className="img-fluid mx-auto d-block w-50" src={props.vs} alt="VS" />
          </button>
        </div>
        <div className={`col-md-5 mb-3`}>
          <div className={`container mb-3 ${dataB === mdata ? "" : "shadow"} p-3 mb-5 rounded ${b} `} id="B">
            <form className="d-flex mb-3" onSubmit={handleSubmit}>
              <input className="form-control me-2" id="charB" onChange={handleCharB} type="search" placeholder="Type One Piece character's only" aria-label="Search" />
            </form>
            <Char imgurl={dataB.imgurl} character_name={dataB.character_name} feats={dataB.feats} description={dataB.description} anime_name={dataB.anime_name} powers={dataB.powers} textColor={b === 'bg-success' ? "text-white" : "text-blue"} />
          </div>
        </div>
      </div>
    </div>
  </>
  );
};

export default Home;
