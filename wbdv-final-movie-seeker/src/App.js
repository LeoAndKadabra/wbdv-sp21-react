import SearchPage from "./components/movie-search/search-page"
import DetailPage from "./components/movie-detail/detail-page"
import Home from "./components/home";
import {BrowserRouter, Route} from "react-router-dom";
import React from 'react'

function App() {
  return (
      <div className="container">
        <BrowserRouter>
          <Route path="/" exact={true}>
            <Home/>
          </Route>
          <Route path={["/search", "/search/:title"]}
                 exact={true}>
            <SearchPage/>
          </Route>
          <Route path="/details/:imdbID" exact={true}>
            <DetailPage/>
          </Route>
        </BrowserRouter>
      </div>
  );
}

export default App;
