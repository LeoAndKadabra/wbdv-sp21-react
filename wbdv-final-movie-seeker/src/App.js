import {SearchPage} from "./components/movie-search/search-page.jsx"
import DetailPage from "./components/movie-detail/detail-page"
import Home from "./components/home";
import ProfilePage from "./components/User/profile-page";
import LoginPage from "./components/User/login-page";
import SignupPage from "./components/User/signup-page";
import {BrowserRouter, Route} from "react-router-dom";
import React from 'react'
import OthersProfilePage from "./components/User/others_profile_page";

const App = () => {
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
        <Route path={["/profile/:userId"]} exact={true}>
            <OthersProfilePage/>
        </Route>
          <Route path="/profile" exact={true}>
            <ProfilePage/>
          </Route>
        <Route path="/login" exact={true}>
            <LoginPage/>
        </Route>
        <Route path="/signup" exact={true}>
          <SignupPage/>
        </Route>
        <Route path="/register" exact={true}>
            <SignupPage/>
        </Route>
        </BrowserRouter>
      </div>
  );
}

export default App;
