// TODO:
// CreateUser/Register
// GetUserByCredential/Login
// UpdateUser
// DeleteUser


//const USER_URL = "https://movie-seeker.herokuapp.com/users";
const USER_URL = "http://localhost:8080/users";

export const register = (user) =>
    fetch(`${USER_URL}/register`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"
    })
    .then(
        response => {
            if (response.status >= 400)
                return {
                    username: ""
                }
            return response.json()
        }
    );

export const login = (user) =>
    fetch(`${USER_URL}/login`, {
        method: 'POST',
        body: JSON.stringify(user),
        credentials: "include",
        headers: {
            'content-type': 'application/json'
        }
    })
    .then(response => {
        if (response.status >= 400)
            return {
                username: ""
            }
        return response.json()
    });

export const getCurrentUser = () =>
    fetch(`${USER_URL}/profile`, {
        credentials: "include"
    })
        .then(response =>
        {
            let currentUer = response.json()
            console.log("get current user from server: " + currentUer)
            return currentUer
        });

export const getOtherUser = (username) =>
    fetch(`${USER_URL}/profile/${username}`, {
      credentials: "include"
    })
    .then(response =>
    {
      let other = response.json()
      console.log("get other user from server: " + other)
      return other
    });

export const logout = () =>
    fetch(`${USER_URL}/logout`, {
        credentials: "include"
    })
    .then(response => response.json());

export const updateUser = (user) =>
    fetch(`${USER_URL}`, {
        method: 'PUT',
        body: JSON.stringify(user),
        credentials: "include",
        headers: {
            'content-type': 'application/json'
        }
    })
    .then(response => response.json());

export const deleteUser = (user) =>
    fetch(`${USER_URL}`, {
        method: 'DELETE',
        credentials: "include",
        body: JSON.stringify(user),
          headers: {
            'content-type': 'application/json'
          }
    })
    .then(response => response.json());

const UserService = {
  register,
  login,
  logout,
  updateUser,
  deleteUser,
  getCurrentUser,
  getOtherUser
};

export default UserService;