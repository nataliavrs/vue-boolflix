var app = new Vue({
  el: '#app',
  data: {
    // actor test
    testname: [],
    // genres
    allGenres: [],
    // show overview test
    show: '',
    // SEARCH
    moviesResults: [],
    showsResults: [],
    userQuery: "",
    flagsExist: 'afarbgcncsdadeenesetfrgahihuitjakonlnoplptroruskslsvtrvi'
  },
  mounted: function () {
    // FETCH MOVIES FROM API
    const movieInfo =
    "https://api.themoviedb.org/3/search/movie?api_key=149b8df650057fdf2402c5c032bf9560&language=en-US&query="
     + "britney" + "&page=1&include_adult=true"

    axios.get(movieInfo)
    .then(movie => {

      for (var i = 0; i < movie.data.results.length; i++) {

        this.moviesResults.push(movie.data.results[i]);

      }

    });

    // FETCH TV SHOWS FROM API
    const tvInfo = "https://api.themoviedb.org/3/search/tv?api_key=149b8df650057fdf2402c5c032bf9560&language=en-US&query="
     + "black" + "&page=1&include_adult=true"

    axios.get(tvInfo)
    .then(shows => {

      for (var i = 0; i < shows.data.results.length; i++) {

        this.showsResults.push(shows.data.results[i]);

      }

    });

  },
  methods: {
    // SEARCH USER'S INPUT
    searchQuery: function () {

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

        }

      });

      // FETCH TV SHOWS FROM API

      this.showsResults = [];

      const tvInfo = "https://api.themoviedb.org/3/search/tv?api_key=149b8df650057fdf2402c5c032bf9560&language=en-US&query="
       + this.userQuery + "&page=1&include_adult=false"

      axios.get(tvInfo)
      .then(shows => {

        for (var i = 0; i < shows.data.results.length; i++) {

          this.showsResults.push(shows.data.results[i]);

        }

      });



    },
    // FIND LANGUAGE FLAG
    findFlag: function (lang) {

      if (this.flagsExist.includes(this.moviesResults[lang].original_language)) {
        return  "img/flag-lang/" + this.moviesResults[lang].original_language + ".png"
      } else {
        return  "img/flag-lang/world.png"
      }

    },
    // FIND MOVIE/SHOWS POSTER
    findPoster: function (match, index) {

      if (match.first_air_date && match.poster_path != null) {
        return "https://image.tmdb.org/t/p/" + "w342" + this.showsResults[index].poster_path
      } else if (match.original_title && match.poster_path != null) {
        return "https://image.tmdb.org/t/p/" + "w342" + this.moviesResults[index].poster_path
      } else {
        return "img/no-cover.png"
      }

    },
    // SMALL IMAGE
    findBackDrop: function (index) {

      return "https://image.tmdb.org/t/p/" + "w780" + this.moviesResults[index].backdrop_path

    },
    // OVERVIEW TOGGLE
    showOverview: function () {

      if (this.show == '') {
        this.show = 'show-info';
      } else {
        this.show = '';
      }

    },
    // GET CAST LIST
    getCast: function (match, index) {

      // FETCH CAST LIST FROM API
      const castList =
      "https://api.themoviedb.org/3/movie/"
      + match.id +
      "/credits?api_key=149b8df650057fdf2402c5c032bf9560&language=en-US"

      axios.get(castList)
      .then(list => {

        this.testname = list.data.cast
        console.log(list.data.cast);
        // console.log(list.data.cast[0].name);
        // this.testname = list.data.cast[0].name;

      });


    }


  },
});
