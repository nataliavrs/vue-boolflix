var app = new Vue({
  el: '#app',
  data: {
    // SEARCH
    searchResults: [],
    userQuery: "",
    // LANGUAGES
    // flagLang: "img/flag-lang/" + findFlag() + ".png"

    // VOTED STARS
    voted: false,

  },
  mounted: function () {

  },
  methods: {
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
    findFlag: function () {

      this.searchResults.forEach((element) => {

        element.original_language =
        "img/flag-lang/" + "en" + ".png";

      });


      console.log(this.searchResults.original_language);

      // return

      // console.log(this.searchResults[0].original_title);
    },
    // 🌎
  },
});
