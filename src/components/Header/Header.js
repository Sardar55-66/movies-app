import React from "react";
import './Header.css'



const Header = function (props) {
    const {rate, search} = props.stateData

    let searchClass = 'header__search'
    let rateClass = 'header__rated'
    let active = ' active'

    if (rate && !search) {
        rateClass += active
    }

    if (search && !rate) {
        searchClass += active
    }

    


    
    return <div className="header header_mod">
        <span 
        onClick = {props.getMovieInfo}
        className= {searchClass}
        >Search</span>

        <span 
        onClick = {props.getRatedMovies}
        className={rateClass}
        >Rated</span>
    </div>

}

export default Header