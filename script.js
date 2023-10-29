const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=b6464a49c6869173d0b4dac0977d1c37&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=b6464a49c6869173d0b4dac0977d1c37&query="'

const main = document.getElementById('main')
const form = document.getElementById('form');
const search = document.getElementById('search')
const home = document.getElementById('home')

//get initil movies
getMovies(API_URL);

async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()
   
    console.log(data.results)
        showMovies(data.results)
    
}

function showMovies(movies){
    main.innerHTML = ''
    
    if(movies.length === 0){
        const error = document.createElement('h2')
        error.innerHTML = `<h2>NOT FOUND the searched movie</h2>`
        
        main.appendChild(error)
    }else{
    movies.forEach(movie => {
        const { title, poster_path, vote_average, overview } = movie

         const movieEl = document.createElement('div')
        movieEl.classList.add('movie')
        movieEl.innerHTML = `
        <img src="${IMG_PATH + poster_path}" alt="${title}">
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getClassByRate(vote_average)}">${vote_average}</span>

        </div>
        <div class="overview">
            <h3>Overview</h3>
            ${overview}
        </div>
        `
    
        main.appendChild(movieEl)
    });
}
}

function getClassByRate(vote){
    if(vote >= 8){
        return "green"
    }else if(vote >= 5){
        return 'orange'
    }else{
        return 'red'
    }
}

form.addEventListener('submit', (e) =>{
    e.preventDefault()
    home.style.visibility = "visible"
    const searchTerm = search.value
    if(searchTerm && searchTerm !== ''){
        getMovies(SEARCH_API + searchTerm)

        search.value = ''
    }else{
        window.location.reload()
    }
})

home.addEventListener('click', () => {
    getMovies(API_URL);
    home.style.visibility = 'hidden'
})