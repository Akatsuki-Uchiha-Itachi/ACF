import React from 'react'
import { useState } from 'react'

export default function CharA(props) {
    const [showMore, setShowMore] = useState(false);
    const handleMoreClick = (e) => {
        e.preventDefault();
        setShowMore(!showMore);
    }
    return (
        <div className={`container`}>
                <img className={`img-fluid mx-auto d-block img-thumbnail ${props.imgurl === ""?"d-none":"d-block"}`} src={props.imgurl} alt="character image" />
                <div className={`row mt-2 d-flex justify-content-between align-items-center ${props.textColor}`}>
                    {props.character_name && (<p className={`col-md-3`} ><strong>Name: </strong>{props.character_name}</p>)}
                    <p className={`col-md-3 ${props.feats === ""?"d-none":"d-block"}`}><strong>Feats: </strong>{props.feats}</p>
                    <p className={`col-md-3 ${props.anime_name === ""?"d-none":"d-block"}`}><strong>Anime name: </strong>{props.anime_name}</p>
                    <p className={`col-md-3 ${props.powers === ""?"d-none":"d-block"}`}><strong>Powers: </strong> {props.powers}</p>
                    {showMore && (<p><strong>Description: </strong>{props.description}</p>)}
                    <button className={`btn btn-link ${props.textColor} ${props.description === ""?"d-none":"d-block"}`} onClick={handleMoreClick}>{showMore ===true?"less":"more"}</button>
                </div>
            </div>
    );
}
