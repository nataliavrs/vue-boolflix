var app = new Vue({
  el: '#app',
  data: {
    // SEARCH
    searchResults: [],
    userQuery: "",
    // LANGUAGES
    flagLang: "img/flag-lang/" + "test" + ".png"

    // VOTED STARS
    // voted: false,

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
    // FING FLAG
    findFlag: function () {

      this.searchResults.forEach((element) => {

        // element.original_language =
        // "img/flag-lang/" + element.original_language + ".png";

        console.log(element.original_language);

      });

      // 🌎
    },

  },
});
