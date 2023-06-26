import React, { useState } from 'react';
import './utils';
import { mdata, formatString ,fetchData, setDocInFirestore } from './utils';

export default function Dashboard() {
  const label =
    ['Character Name',
      'Anime Name',
      'Feats',
      'Powers',
      'Imgurl',
      'Description'
    ];
  
  const [data,setData] = useState(mdata)
  
  const [index, setIndex] = useState(0);
  
  const [btnTxt, setBtnTxt] = useState('next');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (index < label.length - 1) {
      setIndex(index + 1);
    }
    else {
      setBtnTxt('Submit');
      setDocInFirestore(data);
      console.log(data);
    }
  }
  const handleChange = (e) => {
    const { id, value } = e.target;
    setData({
      ...data,
      [label[id].toLowerCase().replace(' ', '_')]: value
    })
  }

  const handleUpdateSearch = async (e) => {
    e.preventDefault();
    console.log()
    const name = document.getElementById('cname').value;
    console.log("name: " + name);
    const result = await fetchData(name);
    setData(result);
    console.log(data);

    {/*const name = document.getElementById('cname').value;
    console.log("name: " + name)
    const result = await fetchData(name);
    setData(result);
  console.log(data);*/}
  }
  const handleUpdateSubmit = (e) => {
    e.preventDefault();
  }
  return (
    <div className='container'>
      <div className="row">
        <div className="col-md-4">
          <h1 className='text-white'>ADD</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="form" className="form-label text-white">{label[index]}</label>
              <input type="text" className="form-control"
                id={index}
                value={data[label[index].toLowerCase().replace(' ', '_')]}
                onChange={handleChange} />
            </div>
            <button type="submit" className="btn btn-primary">{btnTxt}</button>
          </form>
        </div>
        <div className="col-md-4">
          <h1 className="text-white">UPDATE</h1>
          <form onSubmit={handleUpdateSubmit}>
            <div className="mb-3">
              <label htmlFor="form" className="form-label text-white">Search Character</label>
              <input type="text" className="form-control" id='cname'
                onChange={handleUpdateSearch} />
            </div>
          </form>
        </div>
      </div>
      <div className='container mb-3 p-3 rounded'>
        <img className={`img-fluid mx-auto d-block img-thumbnail ${data.imgurl === "" ? "d-none" : "d-block"}`} src={data.imgurl} alt="character image" />
        <div className={`row mt-2 d-flex justify-content-between align-items-center ${data.textColor}`}>
          <p className={`col-md-3 ${data.character_name === "" ? "d-none" : "d-block"}`} ><strong>Name: </strong>{data.character_name}</p>
          <p className={`col-md-3 ${data.feats === "" ? "d-none" : "d-block"}`}><strong>Feats: </strong>{data.feats}</p>
          <p className={`col-md-3 ${data.anime_name === "" ? "d-none" : "d-block"}`}><strong>Anime name: </strong>{data.anime_name}</p>
          <p className={`col-md-3 ${data.powers === "" ? "d-none" : "d-block"}`}><strong>Powers: </strong> {data.powers}</p>
          <p className={`${data.description === "" ? "d-none" : "d-block"}`}><strong>Description: </strong>{data.description}</p>
        </div>
      </div>
    </div>
  )
}
