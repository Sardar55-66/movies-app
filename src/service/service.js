





  
//   fetch('https://api.themoviedb.org/3/authentication', options)
//     .then(response => response.json())
//     .then(response => console.log(response))
//     .catch(err => console.error(err));




export default class ApiService {


    options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZmE4ODkzZjRiZjM0OTFmZDE1MGNjY2ZiYzc0YzA5YSIsInN1YiI6IjY1MzMxNjg3ZTBlYzUxMDEzODA3NzI5MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VNQoHU9dV9iNixJFHq_PXmFS83Y3LWePzwGAdVsN-j8'
        }
      };

    async getResource (url) {
      let res = await fetch(url)
      if (!res.ok) {
        throw new Error(`error ${res.Error}`)
      }
    return res.json()
    }
  
    async getMovies (url) {
      let res = await this.getResource(`https://api.themoviedb.org/3/search/movie/${url}`, this.options)
      return res
    }
  
    // getPerson (id) {
    //   return this.getResource(`https://swapi.dev/api/people/${id}`)
    // }
  
  
    // async getAllPlanet () {
    //   let res = await this.getResource('https://swapi.dev/api/planets')
    //   return res.results
    // }
  
    // getPlanet (id) {
    //   return this.getResource(`https://swapi.dev/api/planets/${id}`)
    // }
  
    // async getAllStarships () {
    //   let res = await this.getResource('https://swapi.dev/api/starships')
    //   return res.results
    // }
  
    // getStarship (id) {
    //   return this.getResource(`https://swapi.dev/api/starships/${id}`)
    // }
  }
  