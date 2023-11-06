import React from "react";
import { Rate } from 'antd';
import './Film-card.css';
import '../../fonts/Inter-Bold.ttf';
import image from '../../img/no-poster-avl.jpg'
import Loader from "../Loader/Loader";









const FilmCard = function (props) {
const el = props.data
const trimmed = props.trim
const {loading, genres} = props.stateData
const idx1 = el.genre_ids[0]
const idx2 = el.genre_ids[1]

let genreIdFirst = genres.filter(es => es.id === idx1)
let genreIdSecond = genres.filter(es => es.id === idx2)
let genreNameFirst = genreIdFirst.map(x => x.name).join()
let genreNameSecond = genreIdSecond.map(x => x.name).join()




const finalSrc = 'https://image.tmdb.org/t/p/w500' + el.poster_path
let className = "film-card__rating-digits"

if (el.vote_average.toFixed(1) > 0 && el.vote_average.toFixed(1) < 3) {
    className = 'color-from-0-3'
} else if (el.vote_average.toFixed(1) > 3 && el.vote_average.toFixed(1) < 5) {
    className = 'color-from-3-5'
} else if (el.vote_average.toFixed(1) > 5 && el.vote_average.toFixed(1) < 7) {
    className = 'color-from-5-7'
} else if (el.vote_average.toFixed(1) > 7) {
    className = 'color-from-7'
}
    
       
       if (loading) {
        <Loader/>
       } else {
        return (
            <div className= {'page'}>
                     <div className="film-card film-card_mod">
                 <div className="film-card__img-container">
                     <img className="film-card__img" src={el.poster_path === null ? image : finalSrc } alt="poster"/>
                 </div>
    
                 <div className="film-card__info-container">
                     <div className="film-card__title">{el.title}</div>
                     <div className={className}>{el.vote_average.toFixed(1)}
                     </div>
                     <div className="film-card__date">{el.release_date}</div>
                     <div className="genres genres_container" onCLick = {(e) => props.getGenres(e)}>
                         <span className="genres__genre">{genreNameFirst}</span>
                         <span className="genres__genre">{genreNameSecond}</span>
                     </div>
                     <div className="film-card__descr">
                         {trimmed}
                     </div>
                     <div className="film-card__rating">
                     <Rate 
                     count={10} 
                     allowHalf defaultValue={0} 
                     onChange={() => props.addRating(el.id)}                     
                     />
                     </div>
                 </div>
             </div>
                 </div>
           )
       }
    
    
        
    
}

 
export default FilmCard