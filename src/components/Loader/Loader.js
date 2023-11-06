import React from "react";
import {Spin} from 'antd'
import './Loader.css'



const Loader = function () {

    return (
        <div className= {'page'}>
            <div className="film-card spinner">
            <div className="film-card__img-container">
      </div>
        <div className="film-card__info-container">
            <div className="genres genres_container">
        </div>
            <div className="film-card__descr">
            <Spin size = "large" />; 
        </div>
            <div className="film-card__rating">
        
            </div>
        </div>
        </div>
    </div>
    )
}






export default Loader