var app = new Vue({
  el: '#app',
  data: {
    // SEARCH
    searchResults: [],
    userQuery: "",
    // FLAGS AVAILABLE
    flagsExist: ['af', 'ar','bg','cn','cs','da','de','en','es','et','fr','ga','hi','hu','it','ja','ko','nl','no','pl','pt','ro','ru','sk','sk','sl','sv','tr','vi']
  },
  mounted: function () {
  },
  methods: {
    // SEARCH INPUT
    searchBtn: function () {

      // FETCH DATA FROM API
      const movieInfo =
      "https://api.themoviedb.org/3/search/movie?api_key=149b8df650057fdf2402c5c032bf9560&language=en-US&query="
       + this.userQuery + "&page=2&include_adult=true"

      axios.get(movieInfo)
      .then(movie => {

        this.searchResults = movie.data.results;

      });

    },
    // FIND FLAG
    findFlag: function (lang) {

      if (this.flagsExist.includes(this.searchResults[lang].original_language)) {
        return  "img/flag-lang/" + this.searchResults[lang].original_language + ".png"
      } else {
        return  "img/flag-lang/" + "world" + ".png"
      }

    },

  },
});
