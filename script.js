var app = new Vue({
  el: '#app',
  data: {
    // NEW WINDOW 
    showWindow: false,  
    indexMovie: "",
    // WINDOW ITEM INFO
    clickedMoreInfo: {
      clickImg: "",
      clickTitle: "",
      clickOrigTitle: "",
      clickCast: [],
      clickOverview: "",
    },    
    // MOVIES GENRES
    moviesGenres: [],
    // TV SHOWS GENRES
    tvGenres: [],
    // SEARCH USER INPUT
    userQuery: "",
    // search results
    moviesResults: [],
    showsResults: [],
    // FLAG IMGS AVAILABLE
    flagsExist: 'afarbgcncsdadeenesetfrgahihuitjakonlnoplptroruskslsvtrvi'
  },  
  mounted: function () {
    
    this.fetchGenres();

    // FETCH MOVIES FROM API
    const movieInfo =
    "https://api.themoviedb.org/3/search/movie?api_key=149b8df650057fdf2402c5c032bf9560&language=en-US&query="
     + "a" + "&page=1&include_adult=false"

    axios.get(movieInfo)
    .then(movie => {

      for (var i = 0; i < movie.data.results.length; i++) {

        this.moviesResults.push(movie.data.results[i]);
        this.moviesResults[i].show = false;            
        this.fetchCast();          
            
      }
       
    });
          
    // FETCH TV SHOWS FROM API
    
    const tvInfo = "https://api.themoviedb.org/3/search/tv?api_key=149b8df650057fdf2402c5c032bf9560&language=en-US&query="
     + "a" + "&page=1&include_adult=false"

    axios.get(tvInfo)
    .then(shows => {

      for (var i = 0; i < shows.data.results.length; i++) {

        this.showsResults.push(shows.data.results[i]);
        this.showsResults[i].show = false;   
        this.fetchCast();  

      }

    });

  },
  methods: {
    // SEARCH USER'S INPUT
    searchQuery: function () {

      // empty results on key pressed
      this.moviesResults = [];
      this.showsResults = [];

      // FETCH MOVIES FROM API
      const movieInfo =
      "https://api.themoviedb.org/3/search/movie?api_key=149b8df650057fdf2402c5c032bf9560&language=en-US&query="
       + this.userQuery + "&page=1&include_adult=false"

      axios.get(movieInfo)
      .then(movie => {

        for (var i = 0; i < movie.data.results.length; i++) {

          this.moviesResults.push(movie.data.results[i]);
          this.moviesResults[i].show = false;            
          this.fetchCast();          
              
        }
         
      });
            
      // FETCH TV SHOWS FROM API
      
      const tvInfo = "https://api.themoviedb.org/3/search/tv?api_key=149b8df650057fdf2402c5c032bf9560&language=en-US&query="
       + this.userQuery + "&page=1&include_adult=false"

      axios.get(tvInfo)
      .then(shows => {

        for (var i = 0; i < shows.data.results.length; i++) {

          this.showsResults.push(shows.data.results[i]);
          this.showsResults[i].show = false;   
          this.fetchCast();  

        }

      });

    },
    // FETCH ACTORS NAMES
    fetchCast: function () {

      this.moviesResults.forEach(element => {
        
        const creditsList = 
        "https://api.themoviedb.org/3/movie/" + element.id + "/credits?api_key=149b8df650057fdf2402c5c032bf9560&language=en-US";

        axios.get(creditsList)
        .then(cast => {
          
          if (cast.data.cast.length > 5) {

            element.cast = [];
            
            var numberActors = 5;

            for (let i = 0; i < numberActors; i++) {
            
              element.cast.push(cast.data.cast[i].name);                                    
  
            }
          } else {

            element.cast = [];
            
            for (let i = 0; i < cast.data.cast.length; i++) {
            
              element.cast.push(cast.data.cast[i].name);                                    
  
            }
          }
                                                                                                
      });

      });

      this.showsResults.forEach(element => {
        
        const creditsList = 
        "https://api.themoviedb.org/3/tv/" + element.id + "/credits?api_key=149b8df650057fdf2402c5c032bf9560&language=en-US";
        
        axios.get(creditsList)
        .then(cast => {
                    
          if (cast.data.cast.length > 5) {

            element.cast = [];

            var numberActors = 5;

            for (let i = 0; i < numberActors; i++) {
            
              element.cast.push(cast.data.cast[i].name);                                    
  
            }
          } else {

            element.cast = [];
            
            for (let i = 0; i < cast.data.cast.length; i++) {
            
              element.cast.push(cast.data.cast[i].name);                                    
  
            }
          }
        
          
                                                                                                
      });

      });
      
    },
    // FIND LANGUAGE FLAG
    findFlag: function (match) {

      if (this.flagsExist.includes(match.original_language)) {
        return  "img/flag-lang/" + match.original_language + ".png"
      } else {
        return  "img/flag-lang/world.png"
      }
      
    },
    // FIND MOVIE/SHOWS POSTER
    findPoster: function (match, index) {

      if (match.poster_path != null) {
        return "https://image.tmdb.org/t/p/" + "w342" + match.poster_path
      } else {
        return "img/no-cover.png"
      }
      
    },    
    // FETCH GENRES LIST
    fetchGenres: function () {

      // MOVIES GENRES LIST
      const genresList = "https://api.themoviedb.org/3/genre/movie/list?api_key=149b8df650057fdf2402c5c032bf9560&language=en-US"

      axios.get(genresList)
      .then(genres => {
       
        this.moviesGenres = genres.data;
               
      });
      
      // TV SHOWS GENRES LIST        
      const genresListTv = "https://api.themoviedb.org/3/genre/tv/list?api_key=149b8df650057fdf2402c5c032bf9560&language=en-US"

      axios.get(genresListTv)
      .then(genres => {
       
        this.tvGenres = genres.data;
               
      });
                                                                                        
    },
    // GET GENRE NAMES MOVIES
    getGenreName: function (genreId) {
      
      let genereTitle = "";
      
      this.moviesGenres.genres.forEach(element => {
        
        if (element.id == genreId) {

          genereTitle = element.name;

        }            
      });

      return genereTitle

    },
    // GET GENRE NAMES TV SHOWS
    getGenreNameTV: function (genreId) {
                      
      let genereTitleTv = "";
      
      this.tvGenres.genres.forEach(element => {
        
        if (element.id == genreId) {

          genereTitleTv = element.name;

        }            
      });

      return genereTitleTv
    
    },
    // NEW WINDOW CLICKED MOVIE/TV SHOW
    showInfoWindow: function (match, index) {

      // OPEN MOVIE/TV-SHOW INFO ON CLICK
      this.showWindow = true;

      // MOVIE/TV-SHOW INFO
      // img
      this.clickedMoreInfo.clickImg = "https://image.tmdb.org/t/p/" + "w342" + match.poster_path;
      // titles
      if (!match.title) {
        this.clickedMoreInfo.clickTitle = match.name;
        this.clickedMoreInfo.clickOrigTitle = match.original_name;
      } else {
        this.clickedMoreInfo.clickOrigTitle = match.original_title;
        this.clickedMoreInfo.clickTitle = match.title;
      }
      // overview
      this.clickedMoreInfo.clickOverview = match.overview;
      // cast
      this.clickedMoreInfo.clickCast = match.cast;
                
    },
    // FETCH IMAGE WHEN ITEM OPENED
    showImgWindow: function () {
    
      if (match.first_air_date && match.poster_path != null) {
        return "https://image.tmdb.org/t/p/" + "w342" + this.showsResults[index].poster_path
      } else if (match.original_title && match.poster_path != null) {
        return "https://image.tmdb.org/t/p/" + "w342" + this.moviesResults[index].poster_path
      } else {
        return "img/no-cover.png"
      }

    }
  },
  
});

// FUNCTION TO ENABLE AND DISABLE SCROLL OF BODY WHEN MOVIE/TV WINDOW IS OPENED

var body = document.getElementById("body");

function disableScrollBody () {  
  body.classList.add("noScroll");
}

function enableScrollBody () {
  body.classList.remove("noScroll");
}

