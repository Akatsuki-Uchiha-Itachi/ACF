import { getFirestore, collection, addDoc, doc, setDoc } from "firebase/firestore";
import React, { useState, useEffect } from 'react';


function Firestore(props) {
    const db = getFirestore();
    const myCollection = collection(db, "anime");

    const [prevdata, setPrevData] = useState(false);
    const [data, setData] = useState(
        {
            imgurl: '',
            character_name: '',
            feats: '',
            description: '',
            anime_name: '',
            powers: '',
            stand_level: ''
        });
        function formatString(str) {
            // Trim the string to remove any leading or trailing spaces
            str = str.trim();
          
            // Replace all spaces with underscores except for the last space, if any
            str = str.replace(/(?!^)\s(?!$)/g, '_');
          
            // Capitalize the first letter of each word and make the rest lowercase
            str = str.replace(/\b\w/g, (c) => c.toUpperCase());
          
            return str;
          }
          

    useEffect(() => {
        const updateFirestore = async () => {
            if (Object.values(data).every(value => !!value && prevdata)) {
                console.log(data);
                console.log(formatString(data.character_name));
                
                setPrevData(false);
            }
        };
        updateFirestore();
    }, [data]);

    const handleForm = (e) => {
        e.preventDefault();
        setData({
            character_name: document.getElementById('charName').value,
            imgurl: document.getElementById('imgurl').value,
            feats: document.getElementById('feat').value,
            description: document.getElementById('desc').value,
            anime_name: document.getElementById('aniName').value,
            powers: document.getElementById('power').value,
            stand_level: document.getElementById('stand').value,
        });
        if (!prevdata) {
            setPrevData(true);
        }
    }
    return (
        <form className="container">
            <div className="mb-3">
                <label className="form-label" >character_name</label>
                <textarea className="form-control" id="charName" rows="1"></textarea>
            </div>
            <div className="mb-3">
                <label className="form-label" >imgurl</label>
                <textarea className="form-control" id="imgurl" rows="1"></textarea>
            </div>
            <div className="mb-3">
                <label className="form-label">feats</label>
                <textarea className="form-control" id="feat" rows="1"></textarea>
            </div>
            <div className="mb-3">
                <label className="form-label" >description</label>
                <textarea className="form-control" id="desc" rows="1" ></textarea>
            </div>
            <div className="mb-3">
                <label className="form-label" >anime_name</label>
                <textarea className="form-control" id="aniName" rows="1" ></textarea>
            </div>
            <div className="mb-3">
                <label className="form-label" >power</label>
                <textarea className="form-control" id="power" rows="1" ></textarea>
            </div>
            <div className="mb-3">
                <label className="form-label" >Stand level</label>
                <input className="form-control" id="stand" type="number" min="0" max="100" />
            </div>
            <button className="btn btn-primary" onClick={handleForm}>Submit</button>
        </form>
    );
}


export default Firestore;