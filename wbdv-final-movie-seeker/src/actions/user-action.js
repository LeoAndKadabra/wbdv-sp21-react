import UserService from "../services/user-service";

const getUserByCredential = (user, dispatch) => { // Use this for login
    UserService.login(user)
        .then(user => {
            dispatch({
                type: "FIND_USER",
                currentUser: user
            })
        })
}

const updateUser = (user, dispatch) => { // Use this for user update
    UserService.updateUser(user)
        .then(status => dispatch({
            type: "UPDATE_USER",
            currentUser: user
        }))
}

const clearCurrentUser = (user, dispatch) => // User this for logout
    UserService.logout()
    dispatch({
        type: "DELETE_USER"
    })

const deleteUser = (user, dispatch) => // Use this for delete user
    UserService.deleteUser(user)
        .then(status => dispatch({
            type: "DELETE_USER"
        }))

const UserActions = {
    getUserByCredential,
    updateUser,
    clearCurrentUser,
    deleteUser
}

export default UserActions