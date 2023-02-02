# **AMDB** - _Another movie database_ 🎥

Movie database app made with [React.js](https://reactjs.org/). Part of course submission for JSBE at _ECUtbildning_ 2022.

Preview on Netlify: [anothermoviedatabase.netlify.app](https://anothermoviedatabase.netlify.app/)

Using data from [themoviedb.org/documentation/api](https://www.themoviedb.org/documentation/api).

---

## 💿 Running the app locally:

Start with cloning this repo on your local machine:

```sh
$ git clone https://github.com/simon-off/another-movie-database.git
$ cd another-movie-database
```

Then run this to install all necessary dependencies:

```sh
$ npm install
```

Then you need to provide your own [TMDB API Key](https://www.themoviedb.org/documentation/api):

```py
1. Rename the "sample.env" file to: ".env.local"
2. Add your own api key where it says: "YourKeyHere"
```

Then simply start your local app instance by running!

```sh
$ npm start
```

---

## Process

The design is **heavily** inspired by [IMDb](https://imdb.com/) and [JustWatch](https://www.justwatch.com/). It consists of 2 pages: Home and Movie. The latter is where you go when you click on a specific movie in either one of the carousels or in the search results.

One of the biggest struggles with this app was the carousel. I looks deceptively simple! It took quite some finagling to get the css and react to play nice. I use media queries in the css to set a custom property `--columns` to different values depending on screen width. I then get the value of this in my `movieListSection` component. With this value I can calculate the necessary things in order to scroll to the right card when the user clicks on of the two buttons (left and right). I do this by getting the id of the target card and using the `.scrollIntoView()` method on it. It feels a tad bit too involved but works quite well and you can still scroll horizontally like normal if you prefer!

I use a couple of custom hooks to help with some utility functions in the app:

- [useLocalStorage.jsx](./src/hooks/useLocalStorage.jsx) is a simple useState hook that makes sure the data is fetched on load (if present) and saved to local storage whenever it's updated.
- [useFetch.jsx](./src/hooks/useFetch.jsx) is a cookie cutter fetch function that returns state variables for **data, loading and error**.
- [useSearchFetch.jsx](./src/hooks/useSearchFetch.jsx) is the same as useFetch except that it also takes in a query string that gets concatenated to the url and the fetch is called again whenever the value of the query string changes.

Otherwise there's not that much to say. A pretty standard movie app made that helped me learn a lot about the ins and outs of React. Coming from vanilla JavaScript the declarative programming style in react took some "unlearning" of vanilla js in order to get up and running. But once you wrap your head around state and the connection between components it's a whole lotta fun! 🤓

---

## Built With

    Vite | React | React Router | Sass

## Built by

_**[Simon](https://github.com/simon-off/)**_
