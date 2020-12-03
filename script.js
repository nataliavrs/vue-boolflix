var app = new Vue({
  el: '#app',
  data: {
    // SEARCH
    searchResults: [],
    userQuery: "",
    flagsExist: 'afarbgcncsdadeenesetfrgahihuitjakonlnoplptroruskskslsvtrvi'
  },
  mounted: function () {
  },
  methods: {
    // SEARCH INPUT
    searchQuery: function () {

      // FETCH MOVIES FROM API
      const movieInfo =
      "https://api.themoviedb.org/3/search/movie?api_key=149b8df650057fdf2402c5c032bf9560&language=en-US&query="
       + this.userQuery + "&page=1&include_adult=false"

      axios.get(movieInfo)
      .then(movie => {

        for (var i = 0; i < movie.data.results.length; i++) {

          this.searchResults.push(movie.data.results[i]);

        }

      });

      // FETCH TV SERIES FROM API
      const tvInfo = "https://api.themoviedb.org/3/search/tv?api_key=149b8df650057fdf2402c5c032bf9560&language=en-US&query=" + this.userQuery + "&page=1&include_adult=false"

      axios.get(tvInfo)
      .then(series => {

        for (var i = 0; i < series.data.results.length; i++) {

          this.searchResults.push(series.data.results[i]);

        }

      });

    },
    // FIND FLAG
    findFlag: function (lang) {

      if (this.flagsExist.includes(this.searchResults[lang].original_language)) {
        return  "img/flag-lang/" + this.searchResults[lang].original_language + ".png"
      } else {
        return  "img/flag-lang/world.png"
      }

    },

  },
});
