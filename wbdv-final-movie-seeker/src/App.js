import SearchPage from "./components/movie-search/search-page"
import DetailPage from "./components/movie-detail/detail-page"
import Home from "./components/home";
import ProfilePage from "./components/User/profile-page";
import LoginPage from "./components/User/login-page";
import RegisterPage from "./components/User/register-page";
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
        <Route path="/profile/:userId" exact={true}>
            <ProfilePage/>
        </Route>
        <Route path="/login" exact={true}>
            <LoginPage/>
        </Route>
        <Route path="/register" exact={true}>
            <RegisterPage/>
        </Route>
        </BrowserRouter>
      </div>
  );
}

export default App;
