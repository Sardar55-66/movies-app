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
            movieId: 0,
            ratedMovieList: []
        }

        this.getRatedMovies = this.getRatedMovies.bind(this)
        this.addRating = this.addRating.bind(this)
    }


    

    options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZmE4ODkzZjRiZjM0OTFmZDE1MGNjY2ZiYzc0YzA5YSIsInN1YiI6IjY1MzMxNjg3ZTBlYzUxMDEzODA3NzI5MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VNQoHU9dV9iNixJFHq_PXmFS83Y3LWePzwGAdVsN-j8'
        }
      }


    getMovieInfo = (e) => {


        const {movies} = this.state


        this.setState(() => {
            return {
                rate: false,
                search: true,
                loading: true,
            }
        })

        if (e.target.value) {
            fetch(`https://api.themoviedb.org/3/search/movie?query=${e.target.value}&include_adult=false&language=en-US&page=1`, this.options)
        .then(response => response.json())
        .then((res) => {
            let movies = res.results
        this.setState(() => {
                return {
                    movies,
                    movieTitle : e.target.value,
                    apiOn: true,
                    nofilm: movies.length === 0? true : false
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


    async guestSession () {

        // создание гостевой сессии
        const guestSessionParams = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZmE4ODkzZjRiZjM0OTFmZDE1MGNjY2ZiYzc0YzA5YSIsInN1YiI6IjY1MzMxNjg3ZTBlYzUxMDEzODA3NzI5MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VNQoHU9dV9iNixJFHq_PXmFS83Y3LWePzwGAdVsN-j8'
            }
          };

          let res = await fetch('https://api.themoviedb.org/3/authentication/guest_session/new', guestSessionParams)
          let finalRes = await res.json();

          const {guest_session_id: sessionId} = await finalRes
        

          localStorage.setItem('guestSession', sessionId)



        // полуение жанров
        
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZmE4ODkzZjRiZjM0OTFmZDE1MGNjY2ZiYzc0YzA5YSIsInN1YiI6IjY1MzMxNjg3ZTBlYzUxMDEzODA3NzI5MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VNQoHU9dV9iNixJFHq_PXmFS83Y3LWePzwGAdVsN-j8'
        }
      };
      
      fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
        .then(response => response.json())
        .then(res => {
            this.setState(() => {
                return {
                    genres: res.genres
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

    componentDidMount () {
        this.guestSession()
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
    

    overviewTrim = (str, limit) => {
       
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

    async addRating (id) {


        localStorage.setItem('movieId', id)


        

        try {

          const addRatingParams = {
            method: 'POST',
            headers: {
              accept: 'application/json',
              'Content-Type': 'application/json;charset=utf-8',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZmE4ODkzZjRiZjM0OTFmZDE1MGNjY2ZiYzc0YzA5YSIsInN1YiI6IjY1MzMxNjg3ZTBlYzUxMDEzODA3NzI5MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VNQoHU9dV9iNixJFHq_PXmFS83Y3LWePzwGAdVsN-j8'
            },
            body: `{"value":8}`
          };
          
          let res = await fetch(`https://api.themoviedb.org/3/movie/${id}/rating`, addRatingParams)
          let finalRes = await res.json()
          return finalRes         
          
        } catch (err) {
            return <Alert message = {err.message}/>
        }
        
    }


   getRatedMovies () {


    this.setState(() => {
        return {
            rate: true,
            search: false,
            loading: true
        }
    })


    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZmE4ODkzZjRiZjM0OTFmZDE1MGNjY2ZiYzc0YzA5YSIsInN1YiI6IjY1MzMxNjg3ZTBlYzUxMDEzODA3NzI5MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VNQoHU9dV9iNixJFHq_PXmFS83Y3LWePzwGAdVsN-j8'
        }
      };
    

      let sessionId = localStorage.getItem('guestSession')
      
                fetch(`https://api.themoviedb.org/3/guest_session/${sessionId}/rated/movies`, options)
            .then(response => response.json())
            .then((res) => {
                let ratedMovies = res.results
            this.setState(() => {
                    return {
                        ratedMovieList: ratedMovies.length === 0 ? [] : ratedMovies,
                        isLoaded : true,
                        apiOn : true,
                        noRateFilm: ratedMovies.length === 0? true : false
                        }
                }) 
             return ratedMovies
                })
            
   }



    render () {
        
        


        const {movies, rate, loading, apiOn, error, errorMessage, isLoaded, nofilm, noRateFilm, ratedMovieList, search} = this.state
        let arr = []
        arr.length = movies.length
        arr.fill(1)



        if (rate) {
            return (
                <div>
                <Header 
                getRatedMovies = {this.getRatedMovies}
                getMovieInfo = {this.getMovieInfo}
                stateData = {this.state}
                />
                    <div className="page1">
                        
                    {noRateFilm ? <Alert message = 'sorry, nofilm was found..' /> : loading && apiOn ? arr.map(el => <Loader />)  :  ratedMovieList.map((el, id) =>
                         <FilmCard 
                         key = {id} 
                         data = {el} 
                         trim = {this.overviewTrim(el.overview, 130)} 
                         stateData = {this.state}
                         addRating = {() => this.addRating(el.id)}
                         getGenres = {this.getGenres}
                         />)}
                        
                        {isLoaded && ratedMovieList.length !== 0 ? <Pag curent = {1} page = {this.changePage}/> :''}
                        
                    </div>
            </div>
            )
        } else return (
        <div>
            <Header 
            getRatedMovies = {this.getRatedMovies}
            getMovieInfo = {this.getMovieInfo}
            stateData = {this.state}
            />
           
            {error ?  <Alert message= {errorMessage.message} type="error" /> : <SearchBar valueOfInput = {this.getMovieInfo}  stateData = {this.state}/>}
            
                <div className="page1">
                    
                {nofilm ? <Alert message = 'sorry, nofilm was found..' /> : loading && apiOn ? arr.map(el => <Loader />)  :  movies.map((el, id) =>
                     <FilmCard 
                     key = {id} 
                     data = {el} 
                     trim = {this.overviewTrim(el.overview, 130)} 
                     stateData = {this.state}
                     addRating = {() => this.addRating(el.id)}
                     getGenres = {this.getGenres}
                     />)}
                    
                    {isLoaded ? <Pag curent = {1} page = {this.changePage}/> :  search && movies ? <Alert message = 'sorry. no film found'/> :null}
                    
                </div>
        </div>
        )
        
    }
}