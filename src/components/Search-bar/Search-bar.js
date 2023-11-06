import React from "react";
import './Search-bar.css'


const SearchBar = function (props) {


        return (
            <div className="search-bar search-bar_mod">
                <input 
                onChange = {props.valueOfInput}
                className="search-bar__input"
                 placeholder="Type to search..."
                 />
            </div>
        )
    

    
}

export default SearchBar