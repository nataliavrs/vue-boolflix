
var app = new Vue({
  el: '#app',
  data: {
    searchResults: [],
    userQuery: ""
  },
  mounted: function () {

  },
  methods: {
    searchBtn: function () {

      // FETCH DATA FROM API
      const movieInfo = "https://api.themoviedb.org/3/search/movie?api_key=149b8df650057fdf2402c5c032bf9560&language=en-US&query=" + this.userQuery + "&page=1&include_adult=false"

      axios.get(movieInfo)
      .then(movie => {

        this.searchResults = movie.data.results;

      });


    }
  },
});
