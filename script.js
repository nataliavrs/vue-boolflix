var app = new Vue({
  el: '#app',
  data: {

    // click more info window movie/tv
    clickedMoreInfo: {
      clickImg: "done",
      clickTitle: "done",
      clickOrigTitle: "done",
      clickLanguage: "",
      clickStars: "",
      clickGenres: "",
      clickCast: "",
      clickOverview: "done",
    },

    showWindow: false,
    // 

    indexMovie: "",

    // movies genres
    moviesGenres: [],

    // SEARCH INPUT
    userQuery: "",
    // search results
    moviesResults: [],
    showsResults: [],
    // FLAG IMGS AVAILABLE
    flagsExist: 'afarbgcncsdadeenesetfrgahihuitjakonlnoplptroruskslsvtrvi'
  },  
  mounted: function () {

    // // API CALLS TO SHOW DEFAULT RESULTS

    // // FETCH MOVIES FROM API
    // const movieInfo =
    // "https://api.themoviedb.org/3/search/movie?api_key=149b8df650057fdf2402c5c032bf9560&language=en-US&query="
    //  + "britney" + "&page=1&include_adult=false"

    // axios.get(movieInfo)
    // .then(movie => {

    //   for (var i = 0; i < movie.data.results.length; i++) {

    //     this.moviesResults.push(movie.data.results[i]);

    //   }

    // });

    // // FETCH TV SHOWS FROM API
    // const tvInfo = "https://api.themoviedb.org/3/search/tv?api_key=149b8df650057fdf2402c5c032bf9560&language=en-US&query="
    //  + "black" + "&page=1&include_adult=false"

    // axios.get(tvInfo)
    // .then(shows => {

    //   for (var i = 0; i < shows.data.results.length; i++) {

    //     this.showsResults.push(shows.data.results[i]);

    //   }

    // });

    this.fetchGenres();
    // console.log("mounted log", this.fetchGenres());

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
          // console.log(this.moviesResults[i]);

          this.fetchCast();          
              
        }
         
      });

      // this.fetchGenres();
            
      // FETCH TV SHOWS FROM API
      
      const tvInfo = "https://api.themoviedb.org/3/search/tv?api_key=149b8df650057fdf2402c5c032bf9560&language=en-US&query="
       + this.userQuery + "&page=1&include_adult=false"

      axios.get(tvInfo)
      .then(shows => {

        for (var i = 0; i < shows.data.results.length; i++) {

          this.showsResults.push(shows.data.results[i]);

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

          element.cast = [];
          var numberActors = 5;
        
          for (let i = 0; i < numberActors; i++) {
            
            element.cast.push(cast.data.cast[i].name);                                    

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

      // if (match.first_air_date && match.poster_path != null) {
      //   return "https://image.tmdb.org/t/p/" + "w342" + this.showsResults[index].poster_path
      // } else if (match.original_title && match.poster_path != null) {
      //   return "https://image.tmdb.org/t/p/" + "w342" + this.moviesResults[index].poster_path
      // } else {
      //   return "img/no-cover.png"
      // }

    },
    // OVERVIEW TOGGLE
    showInfo: function (index) {
                
      this.indexMovie = index;

      this.showInfo();
      
    },
    // FETCH GENRES LIST
    fetchGenres: function () {

      const genresList = "https://api.themoviedb.org/3/genre/movie/list?api_key=149b8df650057fdf2402c5c032bf9560&language=en-US"

      axios.get(genresList)
      .then(genres => {
       
        this.moviesGenres = genres.data;
       
      });
                                                                                        
    },
    // REPLACE GENRE ID WITH GENRE NAME
    getGenreName: function (genreId) {
            
      let genereTitle = "";
      
      this.moviesGenres.genres.forEach(element => {
        
        if (element.id == genreId) {
          // return element.name;
          genereTitle = element.name;
          // return 
        }            
      });

      return genereTitle

    },
    // NEW WINDOW CLICKED MOVIE/TV SHOW
    showInfoWindow: function (match, index) {

      this.showWindow = true;

      // WINDOW INFO
      this.clickedMoreInfo.clickImg = "https://image.tmdb.org/t/p/" + "w342" + match.poster_path;

      this.clickedMoreInfo.clickTitle = match.title;

      this.clickedMoreInfo.clickOrigTitle = match.original_title;
            
      this.clickedMoreInfo.clickOverview = this.moviesResults[index].overview;

      // clickedMoreInfo: {
      //   clickImg: "done",
      //   clickTitle: "",
      //   clickOrigTitle: "",
      //   clickLanguage: "",
      //   clickStars: "",
      //   clickGenres: "",
      //   clickCast: "",
      //   clickOverview: "done",
      // },
           
    },
    showImgWindow: function () {

      // if (this.showsResults[index].first_air_date && this.showsResults[index].poster_path != null) {
      //   return "https://image.tmdb.org/t/p/" + "w342" + this.showsResults[index].poster_path
      // } else if (this.moviesResults[index].original_title && this.moviesResults[index].poster_path != null) {
      //   return "https://image.tmdb.org/t/p/" + "w342" + this.moviesResults[index].poster_path
      // } else {
      //   return "img/no-cover.png"
      // }

      if (match.first_air_date && match.poster_path != null) {
        return "https://image.tmdb.org/t/p/" + "w342" + this.showsResults[index].poster_path
      } else if (match.original_title && match.poster_path != null) {
        return "https://image.tmdb.org/t/p/" + "w342" + this.moviesResults[index].poster_path
      } else {
        return "img/no-cover.png"
      }

    }
    //// END METHODS ////
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

