// TODO:
// CreateUser/Register
// GetUserByCredential/Login
// UpdateUser
// DeleteUser

const USER_URL = "http://localhost:8080/users";

export const register = (user) =>
    fetch(`${USER_URL}/register`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json'
        }
    })
    .then(
        response => response.json()
    );

export const login = (user) =>
    fetch(`${USER_URL}/login`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(response => response.json());

export const logout = () =>
    fetch(`${USER_URL}/logout`)
    .then(response => response.json());

export const updateUser = (user) =>
    fetch(`${USER_URL}`, {
      method: 'PUT',
      body: JSON.stringify(user),
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(response => response.json());

export const deleteUser = (user) =>
    fetch(`${USER_URL}`, {
      method: 'DELETE',
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
  deleteUser
};

export default UserService;