import React from "react";
import { Alert } from 'antd';
import './Error.css'






const ErrorMessage = function (props) {


    

    return (
        <div className= {'page'}>
            <div className="film-card spinner">
            <div className="film-card__img-container">
      </div>
        <div className="film-card__info-container">
            <div className="genres genres_container">
        </div>
            <div className="film-card__descr">
            <Alert message={'err'} type="error" />
        </div>
            <div className="film-card__rating">
        
            </div>
        </div>
        </div>
    </div>
    )
}

export default ErrorMessage;