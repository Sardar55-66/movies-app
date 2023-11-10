import React, { Component } from "react";
import './App.css';
import Header from '../../components/Header/Header';
import SearchBar from "../Search-bar/Search-bar";
import FilmCard from "../Film-card/Film-card";
import Loader from "../Loader/Loader";
import { Alert } from "antd";
import Pag from "../Pagination/Pagination";
// var debounce = require('lodash.debounce');







export default class App extends Component {


    constructor (props) {
        super(props)


        this.state = {
            movies : [],
            loading : true,
            error : false,
            errorMessage : null,
            isLoaded : false,
            movieTitle : null,
            apiOn : false,
            nofilm : false,
            noRateFilm: false,
            rate: false,
            search : false,
            genres: null,
            pag: false
        }
        
    }


    

    options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZmE4ODkzZjRiZjM0OTFmZDE1MGNjY2ZiYzc0YzA5YSIsInN1YiI6IjY1MzMxNjg3ZTBlYzUxMDEzODA3NzI5MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VNQoHU9dV9iNixJFHq_PXmFS83Y3LWePzwGAdVsN-j8'
        }
      }

      componentDidUpdate () {
        return this.getMovieInfo
      }

    getMovieInfo = (e) => {


        



        this.setState(() => {
            return {
                movies,
                rate: false,
                search: true,
                loading: true,
            }
        })

        const {movies,search} = this.state

        if (e.target.value) {
            fetch(`https://api.themoviedb.org/3/search/movie?query=${e.target.value}&include_adult=false&language=en-US&page=1`, this.options)
        .then(response => response.json())
        .then((res) => {
            let moviesList = res.results
        this.setState(() => {
                return {
                    movies: moviesList,
                    movieTitle : e.target.value,
                    apiOn: true,
                    nofilm: moviesList.length === 0? true : false,
                    loading: false,
                    pag: true,
                    }
            }) 
            
         return movies
            })
        .catch(err => this.setState((state) => {
                return  {
                    error: true,
                    errorMessage : err
            }
     }))
        }
        if (movies) {
            this.setState(() => {
                return {
                    loading: false,
                    isLoaded: true
                }
            })
        }
        
    }



    componentDidMount () {
        this.getGenres()
    }

    

    changePage = (page) => {

        const {movieTitle} = this.state

        fetch(`https://api.themoviedb.org/3/search/movie?query=${movieTitle}&include_adult=false&language=en-US&page=${page}`, this.options)
        .then(response => response.json())
        .then((res) => {
            this.setState((state) => {
                return {
                    movies : res.results,
                    }
            })
            })
        .catch(err => this.setState((state) => {
                return  {
                    error: true,
                    errorMessage : err
            }
     }))
    }
    

    overviewTrim = (str = '', limit) => {
       
        const regexp = /./gi
        const arr = str.match(regexp)
        
        if (arr != null && arr.length > 130 ) {
            if (arr[limit] === ' ') {
                arr.splice(limit)
               } else {
                let id = arr.indexOf(' ', limit)
                arr.splice(id)
               }
        } else {
            return arr
        }
    
        return arr.join('') + '...'
        
    }

    addRating = (id) => {

        const {movies} = this.state
        let movie = movies.filter(el => el.id === id)
        movie = JSON.stringify(movie)

        localStorage.setItem(id, movie.trim())

    }

    getGenres = () => {
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZmE4ODkzZjRiZjM0OTFmZDE1MGNjY2ZiYzc0YzA5YSIsInN1YiI6IjY1MzMxNjg3ZTBlYzUxMDEzODA3NzI5MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VNQoHU9dV9iNixJFHq_PXmFS83Y3LWePzwGAdVsN-j8'
            }
          };
          
          fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
            .then(response => response.json())
            .then(response => this.setState( {
                    genres: response.genres
                }
            ))
            .catch(err => console.error(err));
    }


   getRatedMovies = () => {
    const {movies,rate} = this.state


    
    let keys = Object.keys(localStorage)

    keys = keys.map(el => JSON.parse(el))

let arr = []



movies.filter((el) => {
    for (let key of keys) {
        if (el.id === key) {
            arr.push(el)
        } 
    }
})




    this.setState(() => {
        return {
            rate: true,
            search: false,
            loading: false,
            movies: arr
        }
    }
    )
    localStorage.clear()



            
   }



    render () {
        
        const {movies, rate, loading, apiOn, error, errorMessage, isLoaded, nofilm, search, pag} = this.state
        

            let arr = []
        arr.length = movies.length
        arr.fill(1)

            return (
                <div>
                    <Header 
                    getRatedMovies = {this.getRatedMovies}
                    getMovieInfo = {this.getMovieInfo}
                    stateData = {this.state}
                    />
                   
                    {error ?  <Alert message= {errorMessage.message} type="error" /> : !rate ? <SearchBar valueOfInput = {this.getMovieInfo}  stateData = {this.state}/> : null}
                    
                        <div className="page1">
                            
                        {nofilm ? <Alert message = 'sorry, nofilm was found..' /> : loading && apiOn ? arr.map(() => <Loader />)  :movies.map((el, id) =>
                             <FilmCard 
                             key = {id} 
                             data = {el} 
                             trim = {this.overviewTrim(el.overview, 130)} 
                             stateData = {this.state}
                             addRating = {() => this.addRating(el.id)}
                             />
                             )
                             }

                            
                            {isLoaded && !rate && pag ? <Pag curent = {1} page = {this.changePage}/> :  search && movies && rate ? <Alert message = 'sorry. no film found'/> :null}
                            
                        </div>
                </div>
                )
        
        
    }
}